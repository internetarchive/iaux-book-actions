import { html, css, LitElement } from 'lit-element';

export class InfoIcon extends LitElement {
  static get properties() {
    return {
      iconClass: { type: String },
    };
  }

  constructor() {
    super();
    this.iconClass = '';
  }

  // TODO- fetch info-icon using ia-icon 
  render() {
    return html`
      <a
        class="more-info-icon ${this.iconClass}"
        href="https://help.archive.org/hc/en-us/articles/360016554912-Borrowing-From-The-Lending-Library-A-Basic-Guide"
        target="_blank"
        title="Get more info on borrowing from The Lending Library."
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        <img src="./info-icon1.jpg" alt="Information Icon" />
      </a>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        margin-left: 10px;
        vertical-align: middle;
        font-size: 1.6rem;
      }
      .more-info-icon {
        display: inline-block;
        vertical-align: middle;
      }
      .more-info-icon img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        background: white;
      }
      .more-info-icon.mobile {
        position: absolute;
        right: 10px;
        margin-top: -12px;
      }
      .hidden {
        display: none;
      }
      .visible {
        display: inline-block;
      }
    `;
  }
}

window.customElements.define('info-icon', InfoIcon);
