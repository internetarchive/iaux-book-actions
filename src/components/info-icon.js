import { html, css, LitElement, svg } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';

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
      'https://help.archive.org/hc/en-us/articles/360016554912-Borrowing-From-The-Lending-Library-A-Basic-Guide';
    this.icon = `<svg viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="infoTitleID infoDescID"
      width="24px" height="24px"
      style="background:white">
      <title id="infoTitleID">Info icon</title>
      <desc id="infoDescID">Informative icon</desc>
      <g>
        <path d="M480,253C478.3,129.3,376.7,30.4,253,32S30.4,135.3,32,259c1.7,123.7,103.3,222.6,227,221C382.7,478.3,481.7,376.7,480,253
          z M256,111.9c17.7,0,32,14.3,32,32s-14.3,32-32,32c-17.7,0-32-14.3-32-32S238.3,111.9,256,111.9z M300,395h-88v-11h22V224h-22v-12
          h66v172h22V395z" class="primary"/>
      </g>
    </svg>
    `;
  }

  // TODO- fetch info-icon using ia-icon
  render() {
    return html`
      <a
        class="more-info-icon ${this.iconClass}"
        href=${this.helpURL}
        target="_blank"
        title="Get more info on borrowing from The Lending Library"
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        ${this.getInfoIcon}
      </a>
    `;
  }

  get getInfoIcon() {
    return svg`${unsafeHTML(this.icon)}`;
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
