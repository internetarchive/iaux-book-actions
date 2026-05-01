import { html, css, TemplateResult, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  analyticsCategories,
  analyticsActions,
} from '../core/config/analytics-event-and-category';
import ActionsHandler from '../core/services/actions-handler/actions-handler';

import { archiveLogo } from '../assets/data/archive-logo';

@customElement('book-title-bar')
export class BookTitleBar extends ActionsHandler {
  @property({ type: String }) identifier = '';
  @property({ type: String }) bookTitle = '';

  analyticsCategories = analyticsCategories;
  analyticsActions = analyticsActions;

  /** Click handler — emits a `bookTitleBar` custom event with analytics. */
  clickHandler(): void {
    this.dispatchEvent(
      new CustomEvent('bookTitleBar', {
        detail: {
          event: {
            category: this.analyticsCategories.bookReaderHeader,
            action: this.analyticsActions.titleBar,
          },
        },
      }),
    );
  }

  render(): TemplateResult {
    return html`
      <a
        class="embed-link"
        @click=${() => this.clickHandler()}
        href="/details/${this.identifier}"
      >
        <span>${archiveLogo}</span>
        <span class="title">${this.bookTitle}</span>
      </a>
    `;
  }

  static styles: CSSResult = css`
    :host {
      padding: 0 10px;
      height: 3.4rem;
      display: flex;
    }
    .embed-link {
      display: inline-flex;
      align-items: center;
      text-decoration: none;
      color: var(--primaryTextColor, #fff);
      font-size: 1.4rem;
    }
    .embed-link .title {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-align: left;
      line-height: initial;
    }
    .embed-link svg {
      margin-right: 0.5rem;
      display: block;
    }
    .embed-link:hover {
      text-decoration: underline;
    }
  `;
}
