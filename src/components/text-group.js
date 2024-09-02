import { html, css, LitElement } from 'lit';

export class TextGroup extends LitElement {
  static get properties() {
    return {
      texts: { type: String },
      textClass: { type: String },
      hasAdminBorrowedAccess: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.texts = '';
    this.textClass = '';
    this.hasAdminBorrowedAccess = false;
  }

  render() {
    return html`
      <span class="variable-texts ${this.textClass}">
        ${this.hasAdminBorrowedAccess
          ? html`<slot name="sticky-access-checkbox">${this.texts}</slot>`
          : this.texts}
      </span>
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
        font-size: 1.7rem;
        align-items: center;
      }
      .hidden {
        display: none;
      }
      .visible {
        display: flex;
      }
    `;
  }
}

window.customElements.define('text-group', TextGroup);
