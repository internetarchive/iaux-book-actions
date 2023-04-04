import { html } from 'lit';
import { nothing } from 'lit/html.js';
import { classMap } from 'lit/directives/class-map.js';

import ActionsHandler from '../core/services/actions-handler/actions-handler.js';

import buttonBaseStyle from '../assets/styles/ia-button.js';
import CollapsibleActionGroupStyle from '../assets/styles/collapsible-action-group.js';

import { tabletContainerWidth } from '../core/config/constants.js';
import { purchaseIcon } from '../assets/data/purchase.js';
import {
  analyticsCategories,
  analyticsActions,
} from '../core/config/analytics-event-and-category.js';
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
      returnUrl: { type: String },
      autoRenew: { type: Boolean },
      autoReturn: { type: Boolean },
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
    this.returnUrl = '';
    this.autoRenew = false;
    this.autoReturn = false;
  }

  updated(changed) {
    if (
      (changed.has('width') || changed.has('disabled')) &&
      this.isBelowTabletContainer
    ) {
      this.resetActions();
    }

    if (changed.has('autoRenew') && this.autoRenew === true) {
      this.dispatchLoanEvent('autoRenew');
    }

    if (changed.has('autoReturn') && this.autoReturn === true) {
      this.dispatchLoanEvent('autoReturn');
    }
  }

  /**
   * dispatch event when book is auto renewed / returned
   * listen these events in action-handler.js
   * @see ActionsHandler
   *
   * @param {string} event - autoRenew|autoReturn
   * @memberof CollapsibleActionGroup
   */
  dispatchLoanEvent(event) {
    const category = analyticsCategories.browse;
    const action =
      event === 'autoRenew'
        ? analyticsActions.browseAutoRenew
        : analyticsActions.browseAutoReturn;

    // listen in action-handler.js to execute ajax call on petabox.
    this.dispatchEvent(
      new CustomEvent(event, {
        detail: {
          event: { category, action },
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
   * Render action as a link for secondary actions like admin, printdisability links.
   * @param { Object } action
   * @param { Boolean } initialButton
   * @returns { HTMLElement }
   */
  renderActionLink(action, initialButton = false) {
    return html`<span class="${this.getDeviceType} ${action.className}">
      <a
        class="ia-button ${action.className} ${initialButton ? 'initial' : ''}"
        href="${action.url}"
        target=${action.target}
        @click=${() => {
          this.clickHandler(action.id, action.analyticsEvent);
        }}
      >
        ${action.id === 'purchaseBook' ? purchaseIcon : ''} ${action.text}
        <small>${action.subText}</small>
      </a>
    </span>`;
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
   * Dispatches click events when patron clicks on action buttons
   * @param { string } eventName - actions like 'browseBook', 'borrowBook' etc...
   * @param { object } gaEvent - contains analytics event action and category
   *   @param { string } gaEvent.category
   *   @param { string } gaEvent.action
   *
   * @fires CollapsibleActionGroup#{eventName} - (will be browseBook, borrowBook etc...)
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
   * get device type as per container width
   * @returns { String } mobile | desktop
   */
  get getDeviceType() {
    return this.isBelowTabletContainer ? 'mobile' : 'desktop';
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
