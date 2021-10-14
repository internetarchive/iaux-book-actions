import { html, css, LitElement } from 'lit-element';

import ResizeObserver from 'resize-observer-polyfill';

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
  }

  firstUpdated() {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.width = entry.contentRect ? entry.contentRect.width : '';
      }
    });
    resizeObserver.observe(this.shadowRoot.querySelector('.lending-wrapper'));

    this.setupLendingToolbarActions();
  }

  updated(changed) {
    if (changed.has('lendingStatus') || changed.has('bwbPurchaseUrl')) {
      this.setupLendingToolbarActions();
      this.update();
    }
  }

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
        background: var(--primaryBGColor);
        color: var(--primaryTextColor);
      }
      .lending-wrapper {
        width: 100%;
        margin: 0 auto;
        padding: 10px 0;
      }
    `;
  }
}

window.customElements.define('ia-book-actions', IABookActions);
