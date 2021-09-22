import { html, css, LitElement } from 'lit-element';
import { nothing } from 'lit-html';

import buttonBaseStyle from '../assets/styles/ia-button.js';
import { tabletContainerWidth } from '../core/config/constants.js';

export class CollapsibleActionGroup extends LitElement {
  static get properties() {
    return {
      primaryActions: { type: Array },
      secondaryActions: { type: Array },
      primaryColor: { type: String },
      open: { type: Boolean },
      width: { type: Number },
      isAdminAccess: { type: Boolean },
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
    this.isAdminAccess = false;
  }

  updated(changed) {
    if (changed.has('width')) {
      if (this.isBelowTabletContainer) {
        this.resetActions();
      }
    }
  }

  resetActions() {
    const [tempSecondaryActions] = [];

    // concat primaryActions and secondaryActions to draw in dropdown list
    if (this.primaryActions.length !== 0) {
      if (this.isAdminAccess && this.secondaryActions.length > 1) {
        // if yes, make admin button at top and drop with dropdown
        /* eslint prefer-destructuring: "off" */
        const temp = this.secondaryActions[0];
        tempSecondaryActions[0] = this.secondaryActions[1];
        tempSecondaryActions[1] = temp;
        this.primaryColor = 'danger';
        this.primaryActions = tempSecondaryActions.concat(this.primaryActions);
      } else {
        // else, drop with dropdown
        this.primaryActions = this.primaryActions.concat(this.secondaryActions);
      }

      // remove secondaryActions
      this.secondaryActions = [];
    }
  }

  render() {
    return html`
      <section
        class="action-buttons primary ${this.isBelowTabletContainer
          ? 'extra-space'
          : ''}"
      >
        ${this.renderPrimaryActions}
      </section>
      <section class="action-buttons secondary">
        ${this.renderSecondaryActions}
      </section>
    `;
  }

  get renderPrimaryActions() {
    if (this.primaryActions.length === 0) return nothing;

    // If its single action, let just not show dropdown list
    if (this.primaryActions.length === 1) {
      return this.initialActionTemplate;
    }

    // TODO - wrap dropdown button with ia-icons
    return html`
      ${this.initialActionTemplate}
      <div class="dropdown">
        <button
          class="ia-button ${this.primaryColor} down-arrow"
          @click=${this.toggleDropdown}
        >
          + <i class="fa fa-caret-down"></i>
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

  static renderActionLink(action) {
    return html`<a
      class="ia-button ${action.className}"
      href="${action.url}"
      target=${action.target}
      data-event-click-tracking="${action.analyticsEvent.category}|${action
        .analyticsEvent.action}"
    >
      ${action.text}
    </a>`;
  }

  static renderActionButton(action) {
    if (action.url !== undefined)
      return CollapsibleActionGroup.renderActionLink(action);

    return html`<button
      class="ia-button ${action.className}"
      data-event-click-tracking="${action.analyticsEvent.category}|${action
        .analyticsEvent.action}"
      @click=${action.callback}
    >
      ${action.text}
    </button>`;
  }

  get initialActionTemplate() {
    return CollapsibleActionGroup.renderActionButton(this.primaryActions[0]);
  }

  get getPrimaryItems() {
    return this.primaryActions.map(
      action =>
        html`<li>${CollapsibleActionGroup.renderActionButton(action)}</li>`
    );
  }

  get menuClass() {
    return this.open ? 'open' : 'close';
  }

  get isBelowTabletContainer() {
    return this.width <= tabletContainerWidth;
  }

  toggleDropdown() {
    this.open = this.open !== true;
  }

  static get styles() {
    const CollapsibleActionGroupStyle = css`
      .dropdown,
      .action-buttons {
        display: inline-block;
      }
      .secondary .ia-button {
        margin-left: 5px;
      }
      .dropdown {
        position: absolute;
        margin-left: -3px;
      }
      .dropdown-content {
        min-width: 14rem;
        margin: 0 0 0 -13rem;
        padding: 0;
        background: #2d2d2d;
        border-radius: 0.4rem;
        border: 1px solid var(--primaryCTABorder);
      }
      .dropdown-content li {
        color: var(--primaryBGColor);
        list-style: none;
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
        padding: 0.6rem;
        border-radius: 0 0.4rem 0.4rem 0;
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
      .extra-space {
        margin-right: 15px;
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
