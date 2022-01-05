import { html } from 'lit-element';
import { nothing } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

import ActionsHandler from '../core/services/actions-handler/actions-handler.js';

import buttonBaseStyle from '../assets/styles/ia-button.js';
import CollapsibleActionGroupStyle from '../assets/styles/collapsible-action-group.js';

import { tabletContainerWidth } from '../core/config/constants.js';
import { purchaseIcon } from '../assets/data/purchase.js';
import {
  dropdownOpened,
  dropdownClosed,
} from '../assets/data/dropdown-arrow.js';

export class CollapsibleActionGroup extends ActionsHandler {
  static get properties() {
    return {
      userid: { type: String },
      identifier: { type: String },
      primaryActions: { type: Array },
      secondaryActions: { type: Array },
      primaryColor: { type: String },
      dropdownState: { type: String },
      width: { type: Number },
      hasAdminAccess: { type: Boolean },
      dropdownArrow: { type: String },
      disabled: { type: Boolean },
      borrowType: { type: String },
      consecutiveLoanCounts: { type: Number },
    };
  }

  constructor() {
    super();
    this.userid = '';
    this.identifier = '';
    this.primaryActions = [];
    this.secondaryActions = [];
    this.primaryColor = '';
    this.dropdownState = 'close';
    this.width = 0;
    this.hasAdminAccess = false;
    this.dropdownArrow = dropdownClosed;
    this.initialButton = false;
    this.title = '';
    this.loaderIcon = 'https://archive.org/upload/images/tree/loading.gif';
    this.disabled = false;
    this.borrowType = ''; // (browsed|borrowed)
    this.consecutiveLoanCounts = 0;
  }

  updated(changed) {
    if (changed.has('width')) {
      if (this.isBelowTabletContainer) {
        this.resetActions();
      }
    }

    // this is execute to fetch loan token
    if (changed.has('borrowType')) {
      this.emitFetchLoanToken();
    }
  }

  /* emit custom event to fetch loan token */
  emitFetchLoanToken() {
    this.dispatchEvent(
      new CustomEvent('enableBookAccess', {
        detail: {
          event: {
            category: `${this.borrowType}BookAccess`, // browsedBookAccess
            action: `consecutiveLoanCounts-${this.consecutiveLoanCounts}`, // consecutiveLoanCounts-1|2|3...
          },
          borrowType: this.borrowType,
        },
      })
    );
  }

  /**
   * merge primaryActions and secondaryActions into dropdown
   */
  resetActions() {
    // concat primaryActions and secondaryActions to draw in dropdown list
    if (this.primaryActions.length) {
      this.primaryActions = this.primaryActions.concat(this.secondaryActions);

      this.primaryColor = this.primaryActions[0].className;

      if (this.hasAdminAccess) {
        this.sortActionButtonOrder();
      }

      // remove secondaryActions
      this.secondaryActions = [];
    }
  }

  /**
   * re-sort primaryActions action list to show dropdown-only/mobile mode
   */
  sortActionButtonOrder() {
    let fromIndex = 1;
    const toIndex = 0;
    if (this.secondaryActions.length === 2) {
      fromIndex = 2;
    }

    fromIndex = this.primaryActions.length - fromIndex;

    const element = this.primaryActions[fromIndex];
    const current = this.primaryActions;

    current.splice(fromIndex, 1);
    current.splice(toIndex, 0, element);

    this.primaryActions = current;
  }

  render() {
    return html`
      <div
        class="${classMap({
          actiongroup: true,
          disabled: this.disabled,
        })}"
      >
        ${this.getLoaderIcon}
        <section class="action-buttons primary">
          ${this.renderPrimaryActions}
        </section>
        <section class="action-buttons secondary">
          ${this.renderSecondaryActions}
        </section>
      </div>
    `;
  }

  get renderPrimaryActions() {
    if (this.primaryActions.length === 0) return nothing;

    if (this.dropdownState === 'close') {
      this.primaryColor = this.primaryActions[0].className;
    }

    // If its single action, let just not show dropdown list
    if (this.primaryActions.length === 1) {
      return this.initialActionTemplate;
    }

    return html`
      ${this.initialActionTemplate}
      <button
        class="ia-button ${this.primaryColor} down-arrow"
        @click=${this.toggleDropdown}
      >
        ${this.dropdownArrow}
      </button>

      <ul class="dropdown-content ${this.dropdownState}">
        ${this.getPrimaryItems}
      </ul>
    `;
  }

  get renderSecondaryActions() {
    if (!this.secondaryActions.length) return nothing;

    return this.secondaryActions.map(action => this.renderActionLink(action));
  }

  /**
   * Render action as a link for secondary actions like admin, purchase, printdisability links.
   * @param { Object } action
   * @param { Boolean } initialButton
   * @returns { HTMLElement }
   */
  renderActionLink(action, initialButton = false) {
    return html`<a
      class="ia-button ${action.className} ${initialButton ? 'initial' : ''}"
      href="${action.url}"
      target=${action.target}
      @click=${() => {
        this.clickHandler(action.id, action.analyticsEvent);
      }}
    >
      ${action.id === 'purchaseBook' ? purchaseIcon : ''} ${action.text}
      <small>${action.subText}</small>
    </a>`;
  }

  /**
   * Render action as a button for primary actions like browse, borrow, join waitlist etc...
   * @param { Object } action
   * @param { Boolean } initialButton
   * @returns { HTMLElement }
   */
  renderActionButton(action, initialButton = false) {
    if (action.url) return this.renderActionLink(action, initialButton);
    const { analyticsEvent } = action;
    return html`<button
      class="ia-button ${action.className} ${initialButton ? 'initial' : ''}"
      @click=${() => {
        this.clickHandler(action.id, analyticsEvent);
      }}
    >
      ${action.text}
    </button>`;
  }

  /**
   * Click handler to emit custom event on action click
   * @param { string } eventName
   * @param { object } gaEvent
   *   @param { string } gaEvent.category
   *   @param { string } gaEvent.action
   */
  clickHandler(eventName, gaEvent) {
    this.dropdownState = 'close';
    this.dropdownArrow = dropdownClosed;

    if (!gaEvent || !eventName) return;
    const { category, action } = gaEvent;
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          event: { category, action },
        },
      })
    );
  }

  /**
   * get first primary action to render just before dropdown button
   * @returns { HTMLElement }
   */
  get initialActionTemplate() {
    this.initialButton = false;
    if (this.primaryActions.length > 1) {
      this.initialButton = true;
    }

    return this.renderActionButton(this.primaryActions[0], this.initialButton);
  }

  get getPrimaryItems() {
    return this.primaryActions
      .slice(1)
      .map(
        action =>
          html`<li>${this.renderActionButton(action, this.initialButton)}</li>`
      );
  }

  /**
   * get loader icon when task is in-progress
   * @returns { HTMLElement }
   */
  get getLoaderIcon() {
    return html`<img
      class="${classMap({
        actionloader: true,
        disabled: this.disabled,
      })}"
      alt=""
      src="${this.loaderIcon}"
    />`;
  }

  /**
   * check if device is below tablet
   * @returns { Boolean }
   */
  get isBelowTabletContainer() {
    return this.width <= tabletContainerWidth;
  }

  /**
   * toggle dropdown and its icon state
   */
  toggleDropdown() {
    if (this.dropdownState === 'open') {
      this.dropdownState = 'close';
      this.dropdownArrow = dropdownClosed;
      this.primaryColor = this.primaryActions[0].className;
    } else {
      this.dropdownState = 'open';
      this.dropdownArrow = dropdownOpened;
      this.primaryColor = 'dark';
    }
  }

  static get styles() {
    return [buttonBaseStyle, CollapsibleActionGroupStyle];
  }
}

window.customElements.define(
  'collapsible-action-group',
  CollapsibleActionGroup
);
