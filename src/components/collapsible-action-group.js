import { html, css, LitElement } from 'lit-element';

import '../components/text-group';

import buttonBaseStyle from '../assets/styles/ia-button';
import CollapsibleActionGroupStyle from '../assets/styles/collapsible-action-group';

import { URLHelper } from '../core/config/url-helper';
import { tabletContainerWidth } from '../core/config/constants';

export class CollapsibleActionGroup extends LitElement {
  static get properties() {
    return {
      actions: {
        type: Object,
        converter(value) {
            return JSON.parse(value)
        },
      },
      open: { type: Boolean },
      width: { type: Number },
    };
  }

  constructor() {
    super();
    this.actions = [];
    this.title = '';
    this.width = 0;
    this.open = false;
    this.baseHost = 'archive.org';
  }

  render() {
    return html`
      <section class="action-buttons">
        ${this.renderDropdownActions}
      </section>
    `;
  }

  get renderDropdownActions() {
    if (!this.actions) return;

    // console.log(this.width)
    // console.log('this.actions', this.actions)
    const actionButtons = this.actions.actions;
    const buttonClassName = actionButtons[0].className;

    if (this.isBelowTabletContainer) {
      this.actions.actions.push(this.renderPurchaseButton());
    }

    // if we single action button, let's just not show dropdown list
    if (actionButtons.length === 1) {
      return html`
        <button class="ia-button ${buttonClassName}" @click="${this.bookAction}">${actionButtons[0].text}</button>`;
    }

    return html`
      <button class="ia-button ${buttonClassName}" @click="${this.bookAction}">${actionButtons[0].text}</button>
      <div class="dropdown">
        <button
          class="ia-button ${buttonClassName} down-arrow"
          @click=${this.toggleDropdown}>
          + <i class="fa fa-caret-down"></i>
        </button>
        <ul class="dropdown-content ${this.menuClass}">
          ${this.dropdownItems}
        </ul>
      </div>
    `;
  }

  renderPurchaseButton() {
    return {
      text: 'Purchase',
      title: 'Purchase',
      url: 'https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863',
      target: '_blank',
      className: 'ia-button purchase dark',
      analyticsEvent: {
        category: 'this.analyticsCategories.purchase',
        action: 'this.analyticsActions.purchase'
      }
    };
  }

  get dropdownItems() {
    if (!this.actions) return nothing;

    if (!Array.isArray(this.actions)) {
      return this.dropdownSection(this.actions.actions);
    }
  }

  dropdownSection(submenu) {
    return submenu.map(item => (
      html`
        <li>${item.url ? this.linkButton(item) : this.dropdownText(item)}</li>
      `
    ));
  }

  linkButton(link) {
    return html`
      <a
        class=${link.className}
        href="${URLHelper.formatUrl(this.baseHost, link.url)}"
        @click=${this.trackClick}
        data-event-click-tracking="${link.analyticsEvent.category}|${link.analyticsEvent.action}"
        target=${link.target}
      >
        ${link.title}
      </a>
    `;
  }

  dropdownText(item) {
    return html`
      <button 
        class="${item.className}"
        @click=${this.bookAction}
      >${item.text}</button>`;
  }

  get menuClass() {
    return this.open ? ' visible-dropdown' : ' hidden';
  }

  bookAction(e) {
    console.log(e)
  }

  toggleDropdown() {
    this.open = true;
  }

  get isBelowTabletContainer() {
    return this.width <= tabletContainerWidth;
  }

  get externalButtonClass() {
    return this.width >= tabletContainerWidth ? ' visible' : ' hidden';
  }


  static get styles() {
    return [buttonBaseStyle, CollapsibleActionGroupStyle];
  }
}

window.customElements.define('collapsible-action-group', CollapsibleActionGroup);
