import { html, css, LitElement, svg } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import '@internetarchive/icon-info/icon-info.js';

export class InfoIcon extends LitElement {
  static get properties() {
    return {
      iconClass: { type: String },
    };
  }

  constructor() {
    super();
    this.iconClass = '';
    this.helpURL =
      'https://help.archive.org/help/borrowing-from-the-lending-library';
  }

  render() {
    return html`
      <a
        class="more-info-icon ${this.iconClass}"
        href=${this.helpURL}
        target="_blank"
        title="Get more info on borrowing from The Lending Library"
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        <ia-icon-info></ia-icon-info>
      </a>
    `;
  }

  get getInfoIcon() {
    return svg`${unsafeHTML(this.icon)}`;
  }

  static get styles() {
    return css`
      ia-icon-info {
        display: inline-block;
        width: 18px;
        height: 20px;
        vertical-align: middle;
        --iconFillColor: white;
      }
      .more-info-icon {
        margin-left: 10px;
      }
      .more-info-icon img {
        width: 24px;
        height: 24px;
        vertical-align: middle;
        background: white;
      }
      .more-info-icon.mobile {
        position: absolute;
        top: 4px;
        right: 10px;
        margin-top: 15px;
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
