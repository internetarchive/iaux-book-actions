/* eslint-disable */
import { LitElement, html, css } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import '@internetarchive/icon-close/icon-close.js';
import buttonBaseStyle from '../assets/styles/ia-button.js';

export class ShowDialog extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      body: { type: String },
      actions: { type: Array },
      opened: { type: Boolean },
      allowClose: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.title = 'Error';
    this.body =
      'Unexpected error: loan does not exist. Please try deleting your archive.org cookie.';
    this.actions = [];
    this.opened = false;
    this.allowClose = false;
  }

  updated(changed) {
    if (changed.get('opened') === false) {
      this.addOverlay();
    } else {
      this.removeOverlay();
    }
  }

  render() {
    return html`
      <div
        class="${classMap({
          dialog: true,
          opened: this.opened,
          closed: !this.opened,
        })}"
      >
        <div class="dialog-head">${this.title} ${this.closeButton}</div>
        <div class="dialog-body">${this.body}</div>
        <div class="dialog-foot">${this.renderActionButton}</div>
      </div>
    `;
  }

  get closeButton() {
    return this.allowClose
      ? html`<ia-icon-close
          @click="${() =>
            this.dispatchEvent(new CustomEvent('dialogAlertClose'))}"
        ></ia-icon-close>`
      : html``;
  }

  /* exceptional case to use dom element */
  addOverlay() {
    if (this.opened && !document.getElementById('ui-overlay')) {
      const overlayElement = document.createElement('div');
      overlayElement.id = 'ui-overlay';
      document.getElementsByTagName('body')[0].appendChild(overlayElement);
    }
  }

  /* exceptional case to use dom element */
  removeOverlay() {
    const overlayElement = document.getElementById('ui-overlay');
    if (overlayElement) overlayElement.remove();
  }

  get renderActionButton() {
    if (!this.actions) return;

    return this.actions.map(
      action =>
        html`<a class=${action.className} href=${action.href}>
          ${action.text}
        </button>`
    );
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
        min-width: 300px;
        max-width: 400px;
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
        text-align: left;
      }
      .dialog-body {
        border: 1px solid #d8d8d8;
      }
      ia-icon-close {
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        width: 2.5rem;
        height: 2.5rem;
        vertical-align: middle;
        --iconFillColor: #333;
        cursor: pointer;
      }
      .opened {
        display: flex;
      }
      .closed {
        display: none;
      }
      a {
        text-decoration: none;
      }
    `;

    return [buttonBaseStyle, dialogStyle];
  }
}

customElements.define('show-dialog', ShowDialog);
