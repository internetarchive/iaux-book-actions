import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/collapsible-action-group.js';
import Sinon from 'sinon';

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
  borrowType = '',
} = {}) =>
  html`<collapsible-action-group
    .primaryActions=${primaryActions}
    .secondaryActions=${secondaryActions}
    .borrowType=${borrowType}
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

  it('check if loader is active and action-group is disabled', async () => {
    const el = await fixture(container());

    const primaryActionContainer = el.shadowRoot.querySelector('.primary');
    primaryActionContainer
      .querySelector('.ia-button')
      .dispatchEvent(new CustomEvent('toggle-loader'));
    el.disabled = true;
    await el.updateComplete;

    expect(el.disabled).to.be.true;
    expect(el.shadowRoot.querySelector('div').classList.contains('disabled')).to
      .be.true;
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

describe('fetch loan token and localStorage for browsed/borrowsed book', () => {
  beforeEach(() => {
    const localStorageMock = {
      getItem: Sinon.spy(),
      setItem: Sinon.spy(),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  it('test localStorage function when borrowType is browsing', async () => {
    await fixture(container({ borrowType: 'browsing' }));
    expect(localStorage.getItem).to.be.calledOnce;
    expect(localStorage.getItem).to.be.calledWith('consecutive-loan-count');
  });

  it('test localStorage function when borrowType is borrowing', async () => {
    await fixture(container({ borrowType: 'borrowing' }));
    expect(localStorage.getItem).to.not.be.calledOnce;
    expect(localStorage.getItem).to.not.be.calledWith('consecutive-loan-count');
  });
});
