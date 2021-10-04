import { html, css, LitElement } from 'lit-element';

export class TextGroup extends LitElement {
  static get properties() {
    return {
      texts: { type: String },
      textClass: { type: String },
    };
  }

  constructor() {
    super();
    this.texts = '';
    this.textClass = '';
  }

  render() {
    return html`
      <span class="variable-texts ${this.textClass}">${this.texts}</span>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
      .variable-texts {
        margin-left: 10px;
        vertical-align: middle;
        font-size: 1.6rem;
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

window.customElements.define('text-group', TextGroup);
