import { html, css, LitElement } from 'lit-element';
import buttonBaseStyle from '../../assets/styles/ia-button.js';

export class IAActionLink extends LitElement {
  static get properties() {
    return {
      action: { type: Array },
    };
  }

  constructor() {
    super();
    this.action = [];
  }

  render() {
    return html`
      <a
        class=${this.action.className}
        href="${this.action.url}"
        data-event-click-tracking="${this.action.analyticsEvent.category}|${this
          .action.analyticsEvent.action}"
        target=${this.action.target}
      >
        ${this.action.title}
      </a>
    `;
  }

  static get styles() {
    const mainCSS = css`
      :host {
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
      }
      .ia-button {
        min-height: inherit;
      }
      a {
        text-decoration: none;
      }
    `;
    return [buttonBaseStyle, mainCSS];
  }
}

window.customElements.define('ia-action-link', IAActionLink);
