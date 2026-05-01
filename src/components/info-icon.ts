import { html, css, LitElement, TemplateResult, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@internetarchive/icon-info/icon-info.js';

@customElement('info-icon')
export class InfoIcon extends LitElement {
  @property({ type: String }) iconClass = '';

  helpURL = 'https://help.archive.org/help/borrowing-from-the-lending-library';

  render(): TemplateResult {
    return html`
      <a
        class="more-info-icon ${this.iconClass}"
        href=${this.helpURL}
        target="_blank"
        title="Get more info on borrowing from The Lending Library"
        data-event-click-tracking="BookReader|BrowsableMoreInfo"
      >
        <ia-icon-info></ia-icon-info>
      </a>
    `;
  }

  static styles: CSSResult = css`
    ia-icon-info {
      display: inline-block;
      width: 18px;
      height: 20px;
      vertical-align: middle;
      --iconFillColor: white;
    }
    .more-info-icon img {
      width: 24px;
      height: 24px;
      vertical-align: middle;
      background: white;
    }
    .hidden {
      display: none;
    }
    .visible {
      display: inline-block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'info-icon': InfoIcon;
  }
}
