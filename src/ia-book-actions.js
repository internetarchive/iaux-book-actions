import { html, css, LitElement } from 'lit-element';

import './components/collapsible-action-group';
import './components/text-group';
import './components/info-icon';

import IABookActionsStyle from './assets/styles/ia-book-actions';

import LendingActionGroup from './core/services/lending-action-group';
import { lendingStatus } from './core/services/lending-get-status-service';

export class IABookActions extends LitElement {
  static get properties() {
    return {
      userid: { type: String },
      width: { type: Number },
      BWBPurchaseInfo: { type: String },
    };
  }

  constructor() {
    super();
    this.userid = '@neeraj-archive';
    this.actions = {};
    this.width = 0;
  }

  firstUpdated() {
    var resizeObserver = new ResizeObserver( entries => {
      for (let entry of entries) {
        this.width = entry.contentBoxSize ? entry.contentBoxSize[0].inlineSize : entry.contentRect.width;
      }
    });
    resizeObserver.observe(this.shadowRoot.querySelector('.lending-wrapper'));

    // get lending bar buttons and dropdown
    const lendingActionGroup = new LendingActionGroup(lendingStatus, this.width);
    this.actions = lendingActionGroup.actions;
    this.title = lendingActionGroup.title ?? this.actions.title;

    console.log('this.actions', this.actions, this.width)
  }

  render() {
    return html`
      <section class="lending-wrapper">
        <collapsible-action-group
          actions=${JSON.stringify(this.actions)}
          width=${this.width}
        >
        </collapsible-action-group>

        <text-group
          texts='${this.title}'
          width=${this.width}
        >
        </text-group>

        <info-icon
          width=${this.width}
        ></info-icon>
      </section>
    `;
  }

  static get styles() {
    return IABookActionsStyle;
  }
}

window.customElements.define('ia-book-actions', IABookActions);
