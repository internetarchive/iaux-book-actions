import { html, css, LitElement } from 'lit-element';

import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';

import './components/collapsible-action-group.js';
import './components/text-group.js';
import './components/info-icon.js';

import GetLendingActions from './core/services/get-lending-actions.js';
import { mobileContainerWidth } from './core/config/constants.js';

export default class IABookActions extends LitElement {
  static get properties() {
    return {
      userid: { type: String },
      identifier: { type: String },
      lendingStatus: { type: Object },
      width: { type: Number },
      bwbPurchaseUrl: { type: String },
      sharedObserver: { attribute: false },
    };
  }

  constructor() {
    super();
    this.userid = '';
    this.identifier = '';
    this.lendingStatus = {};
    this.primaryActions = [];
    this.primaryTitle = '';
    this.primaryColor = 'primary';
    this.secondaryActions = [];
    this.width = 0;
    this.bwbPurchaseUrl = '';
    this.lendingOptions = [];
    this.sharedObserver = undefined;
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
    if (changed.has('lendingStatus') || changed.has('bwbPurchaseUrl')) {
      this.setupLendingToolbarActions();
      this.update();
    }

    if (changed.has('sharedObserver')) {
      this.disconnectResizeObserver();
      this.setupResizeObserver();
    }
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
  }

  render() {
    return html`
      <section class="lending-wrapper">
        <collapsible-action-group
          .userid=${this.userid}
          .identifier=${this.identifier}
          .primaryColor=${this.primaryColor}
          .primaryActions=${this.primaryActions}
          .secondaryActions=${this.secondaryActions}
          .width=${this.width}
          .hasAdminAccess=${this.hasAdminAccess}
        >
        </collapsible-action-group>
        ${this.textGroupTemplate} ${this.infoIconTemplate}
      </section>
    `;
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
      texts="${this.primaryTitle}"
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
        background: var(--secondaryBGColor);
        color: var(--primaryTextColor);
      }
      .lending-wrapper {
        width: 100%;
        margin: 0 auto;
        padding: 10px 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }
    `;
  }
}

window.customElements.define('ia-book-actions', IABookActions);
