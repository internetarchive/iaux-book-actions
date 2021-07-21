import { html, fixture, expect } from '@open-wc/testing';
import '../../../src/components/book-action-type/ia-action-link.js';
import {
  analyticsCategories,
  analyticsActions,
} from '../../../src/core/config/analytics-event-and-category.js';

const container = ({
  action = {
    text: 'Purchase',
    title: 'Purchase',
    url: 'www.dummy.url',
    target: '_blank',
    className: 'ia-button purchase dark',
    analyticsEvent: {
      category: analyticsCategories.purchase,
      action: analyticsActions.purchase,
    },
  },
} = {}) => html`<ia-action-link .action=${action}></ia-action-link>`;

describe('<ia-action-link>', () => {
  it('check attribute of action link button', async () => {
    const el = await fixture(container());
    const linkElement = el.shadowRoot.querySelector('a');

    expect(linkElement.innerText).to.equal('Purchase');
    expect(linkElement.classList.contains('purchase')).to.be.true;
    expect(linkElement.getAttribute('target')).to.equal('_blank');
    expect(linkElement.getAttribute('data-event-click-tracking')).to.equal(
      'BookReaderHeader|BWBPurchase'
    );
  });
});
