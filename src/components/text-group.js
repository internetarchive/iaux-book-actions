import { html, css, LitElement } from 'lit-element';

export class TextGroup extends LitElement {
  static get properties() {
    return {
      texts: { type: String },
      class: { type: String },
    };
  }

  constructor() {
    super();
    this.texts = '';
    this.class = '';
  }

  render() {
    return html`
      <span class="variable-texts ${this.class}">${this.texts}</span>
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
