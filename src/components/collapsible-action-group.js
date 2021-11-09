import { html } from 'lit-element';
import { nothing } from 'lit-html';

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
  }

  updated(changed) {
    if (changed.has('width')) {
      if (this.isBelowTabletContainer) {
        this.resetActions();
      }
    }
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
      ${this.getLoaderIcon}
      <section class="action-buttons primary">
        ${this.renderPrimaryActions}
      </section>
      <section class="action-buttons secondary">
        ${this.renderSecondaryActions}
      </section>
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
      <div class="dropdown-group">
        <button
          class="ia-button ${this.primaryColor} down-arrow"
          @click=${this.toggleDropdown}
        >
          ${this.dropdownArrow}
        </button>

        <ul class="dropdown-content ${this.dropdownState}">
          ${this.getPrimaryItems}
        </ul>
      </div>
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
      data-id="${action.id}"
      class="ia-button ${action.className} ${initialButton ? 'initial' : ''}"
      href="${action.url}"
      target=${action.target}
      @click=${this.clickHandler}
      data-event-click-tracking="${action.analyticsEvent.category}|${action
        .analyticsEvent.action}"
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

    return html`<button
      data-id="${action.id}"
      class="ia-button ${action.className} ${initialButton ? 'initial' : ''}"
      data-event-click-tracking="${action.analyticsEvent.category}|${action
        .analyticsEvent.action}"
      @click=${this.clickHandler}
    >
      ${action.text}
    </button>`;
  }

  /**
   * Click handler to emit custom event on action click
   */
  clickHandler(e) {
    this.dropdownState = 'close';
    this.dropdownArrow = dropdownClosed;

    const eventName = e?.currentTarget?.dataset?.id;
    const event = e?.currentTarget?.dataset?.eventClickTracking;

    if (eventName === undefined || event === undefined) return;

    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          event,
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
    return html`<img class="action-loader" alt="" src="${this.loaderIcon}" />`;
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
