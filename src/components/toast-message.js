import { html, css, LitElement, nothing } from 'lit';

export class ToastMessage extends LitElement {
  static get properties() {
    return {
      texts: { type: String },
      dismisOnClick: { type: Boolean },
      clostAfter: { type: Number },
    };
  }

  constructor() {
    super();
    this.texts = null;
    this.clostAfter = 0;
  }

  render() {
    return this.texts
      ? html`
          <span
            class="toast-message fade-in"
            title="Click/tap to close"
            @click=${() => {
              this.dismisOnClick ? this.texts = null : nothing;
            }}
            >${this.texts}</span
          >
        `
      : nothing;
  }

  static get styles() {
    const heightFromTop = css`var(--messageHeightFromTop, 15%)`;

    return css`
      :host {
        display: inline-block;
      }

      .toast-message {
        z-index: 2;
        position: absolute;
        top: ${heightFromTop};
        font-size: 1.4rem;
        font-family: 'Helvetica Neue';
        color: #fff;
        left: 50%;
        background: #333;
        border: 1px solid #fff;
        border-radius: 5px;
        box-shadow: 1px 1px 2px;
        padding: 10px;
        width: fit-content;
        transform: translate(-50%, -50%);
        cursor: pointer;
        animation: fadeIn 5s;
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
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

window.customElements.define('toast-message', ToastMessage);
