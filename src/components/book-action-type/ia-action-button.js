import { html, css, LitElement } from 'lit-element';
import buttonBaseStyle from '../../assets/styles/ia-button.js';

export class IAActionButton extends LitElement {
  static get properties() {
    return {
      action: { type: Array },
    };
  }

  constructor() {
    super();
    this.action = {};
  }

  render() {
    return html`
      <button
        class="ia-button ${this.action.className}"
        @click=${this.action.callback}
      >
        ${this.action.text}
      </button>
    `;
  }

  static get styles() {
    const mainCSS = css`
      :host {
        display: contents;
        vertical-align: middle;
        width: 100%;
      }
    `;
    return [buttonBaseStyle, mainCSS];
  }
}

window.customElements.define('ia-action-button', IAActionButton);
