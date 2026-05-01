import { html, css, LitElement, TemplateResult, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-group')
export class TextGroup extends LitElement {
  @property({ type: String }) texts = '';
  @property({ type: String }) textClass = '';

  render(): TemplateResult {
    return html`
      <span class="variable-texts ${this.textClass}">${this.texts}</span>
    `;
  }

  static styles: CSSResult = css`
    :host {
      display: inline-block;
    }
    .variable-texts {
      margin-right: 10px;
      vertical-align: middle;
      font-size: 1.7rem;
    }
    .hidden {
      display: none;
    }
    .visible {
      display: inline-block;
    }
  `;
}
