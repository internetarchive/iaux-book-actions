import { html, css, LitElement } from 'lit-element';
import { nothing } from 'lit-html';

import buttonBaseStyle from '../assets/styles/ia-button.js';
import { tabletContainerWidth } from '../core/config/constants.js';
import {
  dropdownOpened,
  dropdownClosed,
} from '../assets/data/dropdown-arrow.js';

export class CollapsibleActionGroup extends LitElement {
  static get properties() {
    return {
      primaryActions: { type: Array },
      secondaryActions: { type: Array },
      primaryColor: { type: String },
      open: { type: Boolean },
      width: { type: Number },
      hasAdminAccess: { type: Boolean },
      dropdownArrow: { type: String },
    };
  }

  constructor() {
    super();
    this.primaryActions = [];
    this.secondaryActions = [];
    this.primaryColor = '';
    this.title = '';
    this.width = 0;
    this.open = false;
    this.hasAdminAccess = false;
    this.initialButton = false;
    this.loaderIcon = 'https://archive.org/upload/images/tree/loading.gif';
    this.dropdownArrow = dropdownClosed;
  }

  updated(changed) {
    if (changed.has('width')) {
      if (this.isBelowTabletContainer) {
        this.resetActions();
      }
    }
  }

  resetActions() {
    // concat primaryActions and secondaryActions to draw in dropdown list
    if (this.primaryActions.length) {
      this.primaryActions = this.primaryActions.concat(this.secondaryActions);

      if (this.hasAdminAccess) {
        this.changeActionButtonOrder();
      }

      this.primaryColor = this.primaryActions[0].className;

      // remove secondaryActions
      this.secondaryActions = [];
    }
  }

  changeActionButtonOrder() {
    const toIndex = 0;
    const fromIndex = this.primaryActions.length - 2;

    const element = this.primaryActions[fromIndex];
    this.primaryActions.splice(fromIndex, 1);
    this.primaryActions.splice(toIndex, 0, element);
  }

  render() {
    return html`
      <section class="action-buttons primary">
        ${this.getLoaderIcon} ${this.renderPrimaryActions}
      </section>
      <section class="action-buttons secondary">
        ${this.renderSecondaryActions}
      </section>
    `;
  }

  get renderPrimaryActions() {
    if (this.primaryActions.length === 0) return nothing;

    if (!this.primaryColor) {
      this.primaryColor = this.primaryActions[0].className;
    }

    // If its single action, let just not show dropdown list
    if (this.primaryActions.length === 1) {
      return this.initialActionTemplate;
    }

    return html`
      ${this.initialActionTemplate}
      <div class="dropdown">
        <button
          class="ia-button ${this.primaryColor} down-arrow"
          @click=${this.toggleDropdown}
        >
          ${this.dropdownArrow}
        </button>
        <ul class="dropdown-content ${this.menuClass}">
          ${this.getPrimaryItems}
        </ul>
      </div>
    `;
  }

  get renderSecondaryActions() {
    if (this.secondaryActions.length === 0) return nothing;

    return this.secondaryActions.map(action =>
      CollapsibleActionGroup.renderActionLink(action)
    );
  }

  static renderActionLink(action, initialButton = false) {
    return html`<a
      class="ia-button ${action.className} ${initialButton ? 'initial' : ''}"
      href="${action.url}"
      target=${action.target}
      data-event-click-tracking="${action.analyticsEvent.category}|${action
        .analyticsEvent.action}"
    >
      ${action.text}
    </a>`;
  }

  static renderActionButton(action, initialButton = false) {
    if (action.url)
      return CollapsibleActionGroup.renderActionLink(action, initialButton);

    return html`<button
      class="ia-button ${action.className}  ${initialButton ? 'initial' : ''}"
      data-event-click-tracking="${action.analyticsEvent.category}|${action
        .analyticsEvent.action}"
      @click=${action.callback}
    >
      ${action.text}
    </button>`;
  }

  get initialActionTemplate() {
    this.initialButton = false;
    if (this.primaryActions.length > 1) {
      this.initialButton = true;
    }

    return CollapsibleActionGroup.renderActionButton(
      this.primaryActions[0],
      this.initialButton
    );
  }

  get getPrimaryItems() {
    return this.primaryActions
      .slice(1)
      .map(
        action =>
          html`<li>
            ${CollapsibleActionGroup.renderActionButton(
              action,
              this.initialButton
            )}
          </li>`
      );
  }

  get getLoaderIcon() {
    return html`<img
      class="action-loader close"
      alt=""
      src="${this.loaderIcon}"
    />`;
  }

  get menuClass() {
    return this.open ? 'open' : 'close';
  }

  get isBelowTabletContainer() {
    return this.width <= tabletContainerWidth;
  }

  toggleDropdown() {
    this.open = this.open !== true;

    if (this.primaryColor === 'dark') {
      this.primaryColor = this.primaryActions[0].className;
      this.dropdownArrow = dropdownClosed;
    } else {
      this.primaryColor = 'dark';
      this.dropdownArrow = dropdownOpened;
    }
  }

  static get styles() {
    const CollapsibleActionGroupStyle = css`
      .dropdown,
      .action-buttons {
        display: inline-block;
      }
      .action-buttons .ia-button {
        display: initial;
        height: 3rem;
      }
      .primary {
        position: relative;
      }
      .primary .initial {
        border-right: 0;
        border-radius: 0.4rem 0 0 0.4rem;
      }
      .secondary .ia-button {
        margin: 0 3px;
      }
      .dropdown-content {
        position: absolute;
        min-width: 14rem;
        margin: 0;
        padding: 0;
        left: 0;
        background: #2d2d2d;
        border-radius: 0.4rem;
        border: 1px solid var(--primaryCTABorder);
      }
      .dropdown-content li {
        color: var(--primaryBGColor);
        list-style: none;
        height: 3rem;
      }
      .dropdown-content .ia-button {
        background: none;
        border: none;
        box-sizing: border-box;
        display: block;
        width: 100%;
        text-align: left;
      }
      .dropdown-content li .ia-button:hover {
        background: var(--primaryTextColor);
        color: rgb(45, 45, 45);
      }
      .down-arrow {
        border-left: 0;
        border-radius: 0px 0.4rem 0.4rem 0px;
        width: 20px;
        padding: 0.6rem 0.3rem;
        margin-left: -4px;
      }
      .action-loader {
        vertical-align: middle;
      }
      .close {
        display: none;
      }
      .open {
        display: block;
        z-index: 2;
        border-top: 0;
      }
      .visible {
        display: inline-block;
      }
      .btn:hover,
      .dropdown:hover .btn {
        background-color: var(--primaryTextColor);
      }
      .ia-button {
        min-height: initial;
      }
      a {
        text-decoration: none;
      }
    `;
    return [buttonBaseStyle, CollapsibleActionGroupStyle];
  }
}

window.customElements.define(
  'collapsible-action-group',
  CollapsibleActionGroup
);
