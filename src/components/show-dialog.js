/* eslint-disable */
import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import '@internetarchive/icon-close/icon-close.js';
import buttonBaseStyle from '../assets/styles/ia-button.js';

export class showDialog extends LitElement {
  static get properties() {
    return {
      opened: { type: Boolean },
      title: { type: Boolean },
      body: { type: Boolean },
      // opened: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.opened = false;
    this.title = 'Error';
    this.body =
      'Unexpected error: loan does not exist. Please try deleting yourarchive.org cookie.';
  }

  render() {
    // this.addOverlay();

    return html`
      <div
        class="${classMap({
          dialog: true,
          opened: this.opened,
          closed: !this.opened,
        })}"
      >
        <div class="dialog-head">
          ${this.title}<ia-icon-close></ia-icon-close>
        </div>
        <div class="dialog-body">${this.body}</div>
        <div class="dialog-foot">
          <a href="#" class="ia-button primary">Back to item details</a>
          <button
            class="ia-button danger"
            @click="${() =>
              this.dispatchEvent(new CustomEvent('dialog.close'))}"
          >
            Close
          </button>
        </div>
      </div>
    `;
  }

  addOverlay() {
    const overlayElement = document.createElement('div');
    overlayElement.className = 'ui-overlay';
    document.getElementsByTagName('body')[0].appendChild(overlayElement);
  }

  static get styles() {
    const dialogStyle = css`
      :host {
        color: #343434;
        font-size: 1.6rem;
      }
      .dialog {
        position: absolute;
        background: #fff;
        border-radius: 1.2rem;
        z-index: 3000;
        flex-direction: column;
        width: 400px;
        max-width: 500px;
        left: 50%;
        transform: translateX(-50%);

        border: 2px solid #ccc;
        border-radius: 12px;
        box-shadow: 0px 0px 27px 6px rgb(66 66 66 / 80%);
      }
      .dialog-head,
      .dialog-body,
      .dialog-foot {
        padding: 1rem;
        user-select: none;
      }
      .dialog-head {
        border-bottom: 1px solid #d8d8d8;
        font-size: 2rem;
        font-weight: 600;
      }
      ia-icon-close {
        float: right;
        display: inline-block;
        width: 2.5rem;
        height: 2.5rem;
        vertical-align: middle;
        --iconFillColor: rgb(217, 83, 79);
        cursor: pointer;
      }
      .opened {
        display: flex;
      }
      .closed {
        display: none;
      }
    `;

    return [buttonBaseStyle, dialogStyle];
  }
}

customElements.define('show-dialog', showDialog);
