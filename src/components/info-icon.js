import { html, css, LitElement } from 'lit-element';
import buttonBaseStyle from '../assets/styles/ia-button';
import { mobileContainerWidth } from '../core/config/constants';

export class InfoIcon extends LitElement {
  static get properties() {
    return {
      texts: { type: String },
      width: { type: Number },
      textClass: { type: String },
    };
  }

  constructor() {
    super();
    this.texts = '';
    this.width = 0;
  }

  get iconClass() {
    return this.width < mobileContainerWidth ? ' mobile' : '';
  }

  render() {
    return html`
      <a 
        class="more-info-icon${this.iconClass}"
        href="https://help.archive.org/hc/en-us/articles/360016554912-Borrowing-From-The-Lending-Library-A-Basic-Guide"
        target="_blank"
        data-event-click-tracking="BookReader|BrowsableMoreInfo">
        <img
          src="info-icon1.jpg"
        />
      </a>
    `;
  }

  static get styles() {
    const mainCSS = css`
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
    return [mainCSS, buttonBaseStyle];
  }
}

window.customElements.define('info-icon', InfoIcon);
