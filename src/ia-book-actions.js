import { html, css, LitElement } from 'lit-element';

import './components/collapsible-action-group.js';
import './components/text-group.js';
import './components/info-icon.js';

import {
  analyticsCategories,
  analyticsActions,
} from './core/config/analytics-event-and-category.js';
import GetLendingActions from './core/services/get-lending-actions.js';
import { mobileContainerWidth } from './core/config/constants.js';

export class IABookActions extends LitElement {
  static get properties() {
    return {
      userid: { type: String },
      identifier: { type: String },
      lendingStatus: { type: Object },
      width: { type: Number },
      BWBPurchaseInfo: { type: String },
    };
  }

  constructor() {
    super();
    this.userid = '@neeraj-archive';
    this.identifier = '';
    this.lendingStatus = {};
    this.width = 800;
    this.BWBPurchaseInfo = '';
    this.actions = {};
    this.lendingOptions = [];
    this.analyticsCategories = analyticsCategories;
    this.analyticsActions = analyticsActions;
    this.primaryTitle = 'Join waitlist for 14 day borrow';
    this.primaryColor = 'danger';

    this.primaryActions = [
      {
        text: 'Return now',
        callback: this.handleReturnIt,
        className: 'ia-button danger 12',
        analyticsEvent: {
          category: this.analyticsCategories.borrow,
          action: this.analyticsActions.doneBorrowing,
        },
      },
      {
        text: 'Borrow for 14 days',
        callback: 'self.handleReturnIt',
        className: 'ia-button primary 13',
        analyticsEvent: {
          category: this.analyticsCategories.borrow,
          action: this.analyticsActions.doneBorrowing,
        },
      },
    ];

    this.primaryActions = []; // reset for testing
    this.secondaryActions = [
      {
        text: 'Purchase',
        title: 'Purchase',
        url:
          'https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863',
        target: '_blank',
        className: 'ia-button purchase dark',
        analyticsEvent: {
          category: this.analyticsCategories.purchase,
          action: this.analyticsActions.purchase,
        },
      },
      {
        text: 'Admin Access',
        title: 'Admin Access',
        url:
          'https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863',
        target: '_blank',
        className: 'ia-button danger dark',
        analyticsEvent: {
          category: this.analyticsCategories.purchase,
          action: this.analyticsActions.purchase,
        },
      },
    ];
    this.secondaryActions = []; // reset for testing
  }

  firstUpdated() {
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        this.width = entry.contentBoxSize
          ? entry.contentBoxSize[0].inlineSize
          : entry.contentRect.width;
      }
    });
    resizeObserver.observe(this.shadowRoot.querySelector('.lending-wrapper'));

    this.setupLendingToolbarActions();
  }

  async setupLendingToolbarActions() {
    this.lendingOptions = new GetLendingActions(this.lendingStatus, this.width);
    const actions = this.lendingOptions.getCurrentLendingToolbar();

    this.primaryTitle = actions.primaryTitle;
    this.primaryActions = actions.primaryActions.filter(action => {
      return action != null;
    });
    this.primaryColor = actions.primaryColor;
    this.secondaryActions = actions.secondaryActions;
  }

  get infoIconClass() {
    return this.width < mobileContainerWidth ? 'mobile' : 'desktop';
  }

  get textGroupClass() {
    return this.width >= mobileContainerWidth ? 'visible' : 'hidden';
  }

  render() {
    return html`
      <section class="lending-wrapper">
        <collapsible-action-group
          .primaryColor=${this.primaryColor}
          .primaryActions=${this.primaryActions}
          .secondaryActions=${this.secondaryActions}
          .width=${this.width}
        >
        </collapsible-action-group>

        <text-group .class=${this.textGroupClass} texts="${this.primaryTitle}">
        </text-group>

        <info-icon .class=${this.infoIconClass}></info-icon>
      </section>
    `;
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
