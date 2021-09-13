import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/collapsible-action-group.js';

const container = ({
  primaryActions = [
    {
      analyticsEvent: { action: 'Browse', category: 'Lending' },
      className: 'ia-button primary',
      text: 'Borrow for 1 hour',
    },
    {
      analyticsEvent: { action: 'Borrow', category: 'Lending' },
      className: 'ia-button primary',
      text: 'Borrow for 14 days',
    },
  ],
  secondaryActions = [
    {
      analyticsEvent: { action: '', category: '' },
      className: 'ia-button dark',
      text: 'Better world book purchase',
    },
  ],
} = {}) =>
  html`<collapsible-action-group
    .primaryActions=${primaryActions}
    .secondaryActions=${secondaryActions}
  ></collapsible-action-group>`;

describe('<collapsible-action-group>', () => {
  it('check primary action button section is rendered', async () => {
    const el = await fixture(container());
    const primaryActionContainer = el.shadowRoot.querySelector('.primary');
    expect(primaryActionContainer.classList.contains('action-buttons')).to.be
      .true;

    const primaryButton = primaryActionContainer.querySelector('.ia-button');
    expect(primaryButton.innerText).to.equal('Borrow for 1 hour');
    expect(primaryButton.getAttribute('data-event-click-tracking')).to.equal(
      'Lending|Browse'
    );
  });
});
