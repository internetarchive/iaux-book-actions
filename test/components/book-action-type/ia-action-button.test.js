import { html, fixture, expect } from '@open-wc/testing';
import '../../../src/components/book-action-type/ia-action-button.js';
import {
  analyticsCategories,
  analyticsActions,
} from '../../../src/core/config/analytics-event-and-category.js';

const container = ({
  action = {
    text: 'Borrow for 14 days',
    className: 'ia-button primary',
    analyticsEvent: {
      category: analyticsCategories.purchase,
      action: analyticsActions.purchase,
    },
  },
} = {}) => html`<ia-action-button .action=${action}></ia-action-button>`;

describe('<ia-action-button>', () => {
  it('check attribute of action button', async () => {
    const el = await fixture(container());
    const btnElement = el.shadowRoot.querySelector('button');

    expect(btnElement.innerText).to.equal('Borrow for 14 days');
    expect(btnElement.classList.contains('primary')).to.be.true;
  });
});
