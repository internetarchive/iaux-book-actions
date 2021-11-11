import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/collapsible-action-group.js';

const container = ({
  primaryActions = [
    {
      analyticsEvent: { action: 'Browse', category: 'Lending' },
      className: 'ia-button primary',
      text: 'Borrow for 1 hour',
      id: 'browseBook',
    },
    {
      analyticsEvent: { action: 'Borrow', category: 'Lending' },
      className: 'ia-button primary',
      text: 'Borrow for 14 days',
      id: 'borrowBook',
    },
  ],
  secondaryActions = [
    {
      analyticsEvent: { action: '', category: '' },
      className: 'ia-button dark',
      text: 'Purchase',
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
  });
  it('fires analytics events', async () => {
    const el = await fixture(container());
    const primaryActionContainer = el.shadowRoot.querySelector('.primary');
    expect(primaryActionContainer.classList.contains('action-buttons')).to.be
      .true;

    expect(el.sendEvent).to.exist;

    let eName;
    let eAnalytics;
    const manualClickStub = (eventName, gaEvent) => {
      eName = eventName;
      eAnalytics = gaEvent;
    };

    el.clickHandler = manualClickStub;
    await el.updateComplete;

    const primaryButton = primaryActionContainer.querySelector('.ia-button');
    primaryButton.dispatchEvent(new Event('click'));
    await el.updateComplete;

    expect(eName).to.equal('browseBook');
    expect(eAnalytics.category).to.equal('Lending');
    expect(eAnalytics.action).to.equal('Browse');
  });
});
