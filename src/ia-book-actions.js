/* eslint-disable */
import { html, css, LitElement } from 'lit-element';

import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';

import './components/collapsible-action-group.js';
import './components/book-title-bar.js';
import './components/text-group.js';
import './components/info-icon.js';
import './components/show-dialog.js';

import GetLendingActions from './core/services/get-lending-actions.js';
import ArchiveOrgTokenPoller from './core/services/archive-token-poller.js';

import { mobileContainerWidth } from './core/config/constants.js';

export default class IABookActions extends LitElement {
  static get properties() {
    return {
      userid: { type: String },
      identifier: { type: String },
      bookTitle: { type: String },
      lendingStatus: { type: Object },
      width: { type: Number },
      bwbPurchaseUrl: { type: String },
      barType: { type: String },
      sharedObserver: { attribute: false },
      dialogVisible: { type: Boolean },
      dialogBody: { type: String },
      disable: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.userid = '';
    this.identifier = '';
    this.bookTitle = '';
    this.lendingStatus = {};
    this.width = 0;
    this.bwbPurchaseUrl = '';
    this.barType = 'action'; // 'title'|'action'
    this.sharedObserver = undefined;
    this.primaryActions = [];
    this.primaryTitle = '';
    this.primaryColor = 'primary';
    this.secondaryActions = [];
    this.lendingOptions = {};
    this.dialogVisible = false;
    this.dialogBody = 'There was an error';
    this.disable = false;
  }

  disconnectedCallback() {
    this.disconnectResizeObserver();
  }

  firstUpdated() {
    if (!this.sharedObserver) {
      this.sharedObserver = new SharedResizeObserver();
      this.setupResizeObserver();
    }
    this.setupLendingToolbarActions();
  }

  updated(changed) {
    console.log(changed);
    if (changed.has('lendingStatus') || changed.has('bwbPurchaseUrl')) {
      this.setupLendingToolbarActions();
      this.update();
    }

    if (changed.has('sharedObserver')) {
      this.disconnectResizeObserver();
      this.setupResizeObserver();
    }

    if (changed.has('dialogVisible')) {
      // this.update();
      // this.performUpdate()
    }
  }

  browseHasExpired() {
    const browsingExpired = true;
    const currStatus = { ...this.lendingStatus, browsingExpired };
    this.lendingStatus = currStatus;
  }

  startBrowseTimer() {
    const {
      browsingExpired,
      user_has_browsed,
      secondsLeftOnLoan,
    } = this.lendingStatus;
    if (!user_has_browsed || browsingExpired) {
      return;
    }

    const timeLeft = secondsLeftOnLoan * 1000;
    setTimeout(() => {
      this.browseHasExpired();
    }, timeLeft);
  }

  /** SharedObserver resize handler */
  handleResize(entry) {
    // if you are observing multiple targets,
    // you can distinguish them through `entry.target`
    const { target } = entry;
    if (target !== this.shadowRoot.host) return;

    const { contentRect } = entry;
    // configure your view, ie:

    this.width = Math.round(contentRect.width);
  }

  /** Removes observer */
  disconnectResizeObserver() {
    this.sharedObserver?.removeObserver({
      handler: this,
      target: this.shadowRoot.host,
    });
  }

  // observe the shadowRoot's viewport and
  // make this component the handler of changes
  setupResizeObserver() {
    if (!this.shadowRoot) return;
    this.sharedObserver?.addObserver({
      handler: this,
      target: this.shadowRoot.host,
    });
  }
  /** End SharedObserver resize handler */

  async setupLendingToolbarActions() {
    this.lendingOptions = new GetLendingActions(
      this.userid,
      this.identifier,
      this.lendingStatus,
      this.bwbPurchaseUrl
    );
    const actions = this.lendingOptions.getCurrentLendingActions();

    if (!actions) return;

    this.primaryTitle = actions.primaryTitle;
    this.primaryActions = actions.primaryActions.filter(action => {
      return action != null;
    });
    this.primaryColor = actions.primaryColor;
    this.secondaryActions = actions.secondaryActions.filter(action => {
      return action != null;
    });

    if (
      this.lendingStatus.user_has_browsed &&
      !this.lendingStatus.browseHasExpired
    ) {
      this.startBrowseTimer();

      // token poller start from here...
      const tokenPoller = new ArchiveOrgTokenPoller(
        this.identifier,
        this.lendingStatus
      );
      tokenPoller.init();
      return;
    }
  }

  render() {
    return html`
      <section class="lending-wrapper">
        ${this.barType === 'title' ? this.bookTitleBar : this.bookActionBar}
      </section>

      <show-dialog
        ?opened="${this.dialogVisible}"
        body=${this.dialogBody}
        @dialog.close="${() => this.closeDialog()}"
      ></show-dialog>
    `;
  }

  closeDialog() {
    this.dialogVisible = false;
  }

  get bookTitleBar() {
    return html`<book-title-bar
      .identifier=${this.identifier}
      .bookTitle=${this.bookTitle}
    ></book-title-bar>`;
  }

  get bookActionBar() {
    return html`
      <collapsible-action-group
        .userid=${this.userid}
        .identifier=${this.identifier}
        .primaryColor=${this.primaryColor}
        .primaryActions=${this.primaryActions}
        .secondaryActions=${this.secondaryActions}
        .width=${this.width}
        .hasAdminAccess=${this.hasAdminAccess}
        .disabled=${this.disable}
        @toggle-loader=${this.toggleLoader}
      >
      </collapsible-action-group>
      ${this.textGroupTemplate} ${this.infoIconTemplate}
    `;
  }

  toggleLoader(e) {
    // if activity loader is disabled and action is browse or borrow,
    // just change the lendingStatus to update action buttons
    if (this.disable && ['browse_book', 'borrow_book'].includes(e.detail)) {
      console.log('lendingStatus is changed to redraw action-buttons');
      const currStatus = { ...this.lendingStatus, available_to_browse: false };
      this.lendingStatus = currStatus;
    }

    console.log(e.detail.data.error);
    this.disable = !this.disable;
    this.dialogVisible = true;
    if (e.detail) {
      this.dialogBody = e.detail.data.error;
    }
  }

  get iconClass() {
    return this.width <= mobileContainerWidth ? 'mobile' : 'desktop';
  }

  get textClass() {
    return this.width >= mobileContainerWidth ? 'visible' : 'hidden';
  }

  get infoIconTemplate() {
    return html`<info-icon iconClass=${this.iconClass}></info-icon>`;
  }

  get textGroupTemplate() {
    return html`<text-group
      textClass=${this.textClass}
      texts=${this.primaryTitle}
    >
    </text-group>`;
  }

  get hasAdminAccess() {
    return !this.lendingStatus.userHasBorrowed && this.lendingStatus.isAdmin;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background: var(--primaryBGColor, #000);
        color: var(--primaryTextColor, #fff);
      }
      .lending-wrapper {
        width: 100%;
        margin: 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }
    `;
  }
}

window.customElements.define('ia-book-actions', IABookActions);
