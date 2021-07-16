import { html, css, LitElement } from 'lit-element';
import buttonBaseStyle from '../assets/styles/ia-button';
import { mobileContainerWidth } from '../core/config/constants';

export class TextGroup extends LitElement {
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

  get textClass() {
    return this.width >= mobileContainerWidth ? ' visible' : ' hidden';
  }

  get iconClass() {
    return this.width < mobileContainerWidth ? ' mobile' : '';
  }

  render() {
    return html`
      <span class="variable-texts${this.textClass}">
        ${this.texts}
      </span>
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

window.customElements.define('text-group', TextGroup);
