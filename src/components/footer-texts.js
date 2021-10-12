import { html, css, LitElement } from 'lit-element';

export class FooterTexts extends LitElement {
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
      <a href="#" class="print-disabled-text ${this.textClass}"
        >${this.texts}</a
      >
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      .print-disabled-text {
        background-image: url(https://archive.org/bookreader/static/pd-daisy.svg);
        background-repeat: no-repeat;
        background-size: 2rem;
        background-position-y: 0.2rem;
        padding-left: 2.5rem;
        margin-left: 0.5rem;
        display: inline-block;
        font-size: 1.4rem;
        color: cornflowerblue;
        margin-top: 10px;
      }
    `;
  }
}

window.customElements.define('footer-texts', FooterTexts);
