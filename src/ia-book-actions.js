import { html, css, LitElement } from 'lit-element';

import './components/collapsible-action-group.js';
import './components/text-group.js';
import './components/info-icon.js';

import {
  analyticsCategories,
  analyticsActions,
} from './core/config/analytics-event-and-category.js';

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
    this.lendingOptions = {};
    this.analyticsCategories = analyticsCategories;
    this.analyticsActions = analyticsActions;
    this.primaryTitle = 'Join waitlist for 14 day borrow';
    this.primaryColor = 'danger';

    // intentional
    // this.primaryActions = [
    //   html`<ia-book-1-day-borrow
    //     texts='Borrow for 1 day'
    //     cssClass='primary'
    //     bookId='this.bookId'
    //   ></ia-book-1-day-borrow>`,
    //   html`<ia-book-14-days-borrow
    //     texts='Borrow for 14 days'
    //     cssClass='primary'
    //     bookId='this.bookId'
    //   ></ia-book-14-days-borrow>`,
    // ],
    this.primaryActions = [
      {
        text: 'Return now',
        callback: 'self.handleReturnIt',
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

    // this.primaryActions = []; // reset for testing
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
    // this.secondaryActions = []; // reset for testing
  }

  firstUpdated() {
    // intentional
    // var resizeObserver = new ResizeObserver( entries => {
    //   for (let entry of entries) {
    //     this.width = entry.contentBoxSize ? entry.contentBoxSize[0].inlineSize : entry.contentRect.width;
    //   }
    // });
    // resizeObserver.observe(this.shadowRoot.querySelector('.lending-wrapper'));
    // intentional
    // if (!lendingStatus) return;
    // console.log('s1s', )
    // get lending bar buttons and dropdown
    // try {
    //   this.lendingOptions = new LendingActionGroup(lendingStatus, this.width);
    //   // console.log(this.lendingOptions)
    //   var data = this.lendingOptions.getActions();
    //   this.primaryTitle = data.primaryTitle;
    //   this.primaryActions = data.primaryActions;
    //   this.primaryColor = data.primaryColor;
    //   this.secondaryActions = data.secondaryActions;
    // } catch (error) {
    //   console.error();
    // }
    // // this.actions = this.lendingOptions.actions;
    // this.title = this.lendingOptions.title ?? this.actions.title;
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
        <text-group texts="${this.primaryTitle}" .width=${this.width}>
        </text-group>
        <info-icon .width=${this.width}></info-icon>
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
