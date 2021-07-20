import { html, css, LitElement } from 'lit-element';
import { nothing } from 'lit-html';

import buttonBaseStyle from '../assets/styles/ia-button.js';
import { tabletContainerWidth } from '../core/config/constants.js';

import './book-action-type/ia-action-button.js';
import './book-action-type/ia-action-link.js';

// intentional
// import '../components/book-actions/ia-book-admin-view.js';
// import '../components/book-actions/ia-book-1-day-borrow.js';
// import '../components/book-actions/ia-book-14-days-borrow.js';

export class CollapsibleActionGroup extends LitElement {
  static get properties() {
    return {
      primaryActions: { type: Object },
      primaryColor: { type: String },
      secondaryActions: { type: Object },
      open: { type: Boolean },
      width: { type: Number },
    };
  }

  constructor() {
    super();
    this.primaryActions = [];
    this.primaryColor = '';
    this.secondaryActions = [];
    this.title = '';
    this.width = 0;
    this.open = false;
  }

  resetActions() {
    // remove secondary buttons
    if (this.isBelowTabletContainer) {
      this.secondaryActions = [];
    }
  }

  render() {
    this.resetActions();

    return html`
      <section class="action-buttons primary">
        ${this.renderPrimaryActions}
      </section>
      <section class="action-buttons secondary">
        ${this.renderSecontoryActions}
      </section>
    `;
  }

  get renderPrimaryActions() {
    if (!this.primaryActions.length) return nothing;

    // if we single action button, let's just not show dropdown list
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
          + <i class="fa fa-caret-down"></i>
        </button>
        <ul class="dropdown-content ${this.menuClass}">
          ${this.getPrimaryItems}
        </ul>
      </div>
    `;
  }

  get renderSecontoryActions() {
    if (Array.isArray(this.secondaryActions)) {
      return this.secondaryActions.map(
        action => html`<ia-action-link .action=${action}></ia-action-link>`
      );
    }
    return nothing;
  }

  get initialActionTemplate() {
    return html`<ia-action-button
      .action=${this.primaryActions[0]}
    ></ia-action-button>`;
  }

  get getPrimaryItems() {
    if (Array.isArray(this.primaryActions)) {
      return this.primaryActions.map(
        action =>
          html`<li><ia-action-button .action=${action}></ia-action-button></li>`
      );
    }
    return nothing;
  }

  get menuClass() {
    return this.open ? ' visible-dropdown' : ' hidden';
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
      .dropdown-content {
        position: absolute;
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
      .dropdown-content li a1 {
        display: block;
        padding: 6px 8px;
        color: #fff;
        text-decoration: none;
      }
      .dropdown-content .ia-button {
        width: 100%;
        text-align: initial;
        background: none;
        border: none;
        box-sizing: border-box;
      }
      .dropdown-content li .ia-button:hover {
        background: var(--primaryTextColor);
        color: rgb(45, 45, 45);
      }
      .down-arrow {
        margin-left: -0.9rem;
        padding: 0.6rem;
        border-radius: 0 0.4rem 0.4rem 0;
      }
      .hidden {
        display: none;
      }
      .visible {
        display: inline-block;
      }
      .visible-dropdown {
        display: block;
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
