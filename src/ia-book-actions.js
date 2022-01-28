/* eslint-disable camelcase */
import { html, css, LitElement } from 'lit-element';

import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import { ModalConfig } from '@internetarchive/modal-manager';

import './components/collapsible-action-group.js';
import './components/book-title-bar.js';
import './components/text-group.js';
import './components/info-icon.js';

import GetLendingActions from './core/services/get-lending-actions.js';
import getRealTimeLendingStatus from './core/services/get-realtime-lending-status.js';

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
      disableActionGroup: { type: Boolean },
      modalConfig: { type: Object },
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
    this.disableActionGroup = false;
    this.modalConfig = {};
    this.realtimeInternal = 0; // store intervalID
  }

  disconnectedCallback() {
    this.disconnectResizeObserver();
  }

  firstUpdated() {
    if (!this.sharedObserver) {
      this.sharedObserver = new SharedResizeObserver();
      this.setupResizeObserver();
    }

    if (!Object.keys(this.modalConfig).length) {
      this.modalConfig = new ModalConfig();
      this.modalConfig.headerColor = '#d9534f';
    }
    this.setupLendingToolbarActions();

    // fetch latest lending status after an internal
    if (
      !this.lendingStatus.user_has_browsed &&
      !this.lendingStatus.user_has_borrowed
    ) {
      this.realtimeInternal = setInterval(() => {
        const latestLendingStatus = getRealTimeLendingStatus(
          'naturalhistoryof00unse_4'
        );
        console.log(latestLendingStatus);
        if (latestLendingStatus) this.lendingStatus = latestLendingStatus;
      }, 30000); // 60000 ms = 1 min
    }
  }

  updated(changed) {
    if (changed.has('lendingStatus') || changed.has('bwbPurchaseUrl')) {
      this.setupLendingToolbarActions();
      this.update();
    }

    if (changed.has('sharedObserver')) {
      this.disconnectResizeObserver();
      this.setupResizeObserver();
    }
  }

  browseHasExpired() {
    const currStatus = { ...this.lendingStatus, browsingExpired: true };
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

    this.borrowType = actions.borrowType;
    if (this.borrowType === 'browsed') {
      // start timer for browsed.
      // when browse is completed, we shows browse-again button
      this.startBrowseTimer();
    }
  }

  render() {
    return html`
      <section class="lending-wrapper">
        ${this.barType === 'title' ? this.bookTitleBar : this.bookActionBar}
      </section>
    `;
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
        .borrowType=${this.borrowType}
        ?hasAdminAccess=${this.hasAdminAccess}
        ?disabled=${this.disableActionGroup}
        @lendingActionError=${this.handleLendingActionError}
      >
      </collapsible-action-group>
      ${this.textGroupTemplate} ${this.infoIconTemplate}
    `;
  }

  /*
   * handle lending errors occure on different operation like
   * browse book, borrow book, borrowed book token etc...
   */
  handleLendingActionError(e) {
    // toggle activity loader
    this.disableActionGroup = !this.disableActionGroup;

    const context = e?.detail?.context;
    const errorMsg = e?.detail?.data?.error;

    if (errorMsg) this.showErrorModal(context, errorMsg);

    // update action bar state if book is not available to browse or borrow.
    if (errorMsg && errorMsg.match(/not available to borrow/gm)) {
      let currStatus = this.lendingStatus;
      if (context === 'browse_book') {
        currStatus = {
          ...this.lendingStatus,
          available_to_browse: false,
        };
      } else if (context === 'borrow_book') {
        currStatus = {
          ...this.lendingStatus,
          available_to_borrow: false,
        };
      }
      this.lendingStatus = currStatus;
    }
  }

  /* show error message if something went wrong */
  async showErrorModal(context, errorMsg) {
    // add modal-manager in DOM to show alert message
    this.modal = document.createElement('modal-manager');
    this.modal.id = 'action-bar-modal';
    await document.body.appendChild(this.modal);

    // fallback if <modal-manager> is not found!
    if (!this.modal) {
      alert(errorMsg);
      return;
    }

    this.disableActionGroup = false;
    this.modalConfig.title = 'Lending error';
    this.modalConfig.message = errorMsg;

    this.modal.showModal({
      config: this.modalConfig,
    });
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
