import { html, css, LitElement } from 'lit-element';
import buttonBaseStyle from '../assets/ia-button';
import lendingActionButtonsStyle from '../assets/styles/lending-action-buttons';
import '../components/text-group';

import { lendingStatus } from '../core/services/lending-get-status-service';
import { mobileContainerWidth, tabletContainerWidth } from './constants';

// import {} from './menu-items';
import MenuItems from './menu-items';


export class LendingActionButtons extends LitElement {
  static get properties() {
    return {
      menuItems: { type: Object },
      open: { type: Boolean },
      width: { type: Number },
    };
  }

  constructor() {
    super();
    this.menuItems = [];
    this.open = false;
    // this.width = 0;
    this.baseHost = 'archive.org';
    this.config = {};
    this.containerWidth = '.one';
    this.title = '';
    // this.getActionButtons();
  }

  firstUpdated() {
    this.getActionButtons();
    // console.log(this.width)
  }

  async getActionButtons() {
    const menu = new MenuItems(lendingStatus);
    this.menuItems = menu.items;
    if (menu.title) {
      this.title = menu.title;
    } else {
      this.title = this.menuItems.title;
    }

    if (this.isBelowTabletContainer) {
      // console.log('small1')
      // this.menuItems.actions.push(menu.purchaseButton);
    }

    console.log('this.menuItems.actions', this.menuItems.actions)
  }

  get dropdownItems() {
    if (!this.menuItems) return nothing;

    // if (!Array.isArray(this.menuItems)) {
      return this.dropdownSection(this.menuItems.actions);
    // }
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
        href="${LendingActionButtons.formatUrl(link.url)}"
        @click=${this.trackClick}
        data-event-click-tracking="${link.analyticsEvent.category}|${link.analyticsEvent.action}"
        target=${link.target}
      >
        ${link.title}
      </a>
    `;
  }

  static formatUrl(url) {
    return (/^https?:/.test(url) ? url : `${this.baseHost}${url}`);
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

  get renderDropdownActions() {
    if (!this.menuItems.actions) return;

    const actionButtons = this.menuItems.actions;
    const buttonClassName = actionButtons[0].className;
    const callback = actionButtons[0].callback;
    // callback();
    // console.log(callback)

    // if we single action button, let just not show dropdown list
    if (actionButtons.length === 1) {
      return html`
        <button class="ia-button ${buttonClassName}" @click="${this.bookAction}" bookAction>${actionButtons[0].text}</button>`;
    }

    return html`
      <button class="ia-button ${buttonClassName}" @click="${this.bookAction}">${actionButtons[0].text}</button>
      <div class="dropdown">
        <button
          class="ia-button ${buttonClassName} down-arrow"
          @click=${this.toggleDropdown}>
          +
          <i class="fa fa-caret-down"></i>
        </button>
        <ul class="dropdown-content ${this.menuClass}">
          ${this.dropdownItems}
        </ul>
      </div>
    `;
  }

  render() {
    return html`
      <div class="action-buttons">
        ${this.renderDropdownActions}
        ${this.renderPurchaseButton1}
      </div>
      <text-group
        texts='${this.title}'
        width=${this.width}
      >
      </text-group>
    `;
  }

  get renderPurchaseButton() {
    if (this.width <= tabletContainerWidth) return;

    return html`
      <a
        class="bwb-purchase ia-button dark${this.externalButtonClass}"
        href="https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863"
        title="Purchase from Better World Books"
        target="_blank"
        data-event-click-tracking="BookReaderHeader|BWBPurchase"
      >
        Purchase
      </a>
    `;
  }

  // get renderAdminAcessButton() {
  //   return html`
  //     <a
  //       class="admin-access ia-button cancel${this.externalButtonClass}"
  //       href="https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863"
  //       title="Purchase from Better World Books"
  //       target="_blank"
  //       data-event-click-tracking="BookReaderHeader|AdminAccess"
  //     >
  //       Admin Access
  //     </a>
  //   `;
  // }

  static get styles() {
    return [buttonBaseStyle, lendingActionButtonsStyle];
  }
}

window.customElements.define('lending-action-buttons', LendingActionButtons);
