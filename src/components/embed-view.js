import { html, css } from 'lit-element';
import {
  analyticsCategories,
  analyticsActions,
} from '../core/config/analytics-event-and-category.js';
import ActionsHandler from '../core/services/actions-handler/actions-handler.js';

export class EmbedView extends ActionsHandler {
  static get properties() {
    return {
      identifier: { type: String },
      bookTitle: { type: String },
    };
  }

  constructor() {
    super();
    this.identifier = '';
    this.bookTitle = '';
    this.analyticsCategories = analyticsCategories;
    this.analyticsActions = analyticsActions;
    this.archiveLogo = 'https://archive.org/images/glogo-jw.png';
  }

  /**
   * Click handler to emit custom event on action click
   */
  clickHandler() {
    const { category, action } = {
      category: this.analyticsCategories.bookReaderHeader,
      action: this.analyticsActions.embed,
    };

    this.dispatchEvent(
      new CustomEvent('embedLink', {
        detail: {
          event: { category, action },
        },
      })
    );
  }

  render() {
    return html`
      <a class='embed-link' @click=${() => {
        this.clickHandler();
      }} href=/details/${this.identifier}><img src=${this.archiveLogo} alt=''>
      <span>${this.bookTitle}</span>
    </a>
    `;
  }

  static get styles() {
    return css`
      :host {
        padding: 0 10px;
      }
      .embed-link {
        display: inline-flex;
        align-items: center;
        text-decoration: none;
        color: var(--primaryTextColor, #fff);
        font-size: 1.4rem;
        height: 3.4rem;
      }
      .embed-link:hover {
        text-decoration: underline;
      }
      .embed-link img {
        margin-right: 0.5rem;
      }
    `;
  }
}

window.customElements.define('embed-view-link', EmbedView);
