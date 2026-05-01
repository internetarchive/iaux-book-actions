import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/collapsible-action-group';
import type { CollapsibleActionGroup } from '../../src/components/collapsible-action-group';
import type { ActionButtonConfig } from '../../src/core/types/lending-status';

const defaultPrimary: ActionButtonConfig[] = [
  {
    analyticsEvent: { action: 'Browse', category: 'Lending' },
    className: 'ia-button primary',
    text: 'Borrow',
    id: 'browseBook',
  },
  {
    analyticsEvent: { action: 'Borrow', category: 'Lending' },
    className: 'ia-button primary',
    text: 'Borrow for 14 days',
    id: 'borrowBook',
  },
];

const defaultSecondary: ActionButtonConfig[] = [
  {
    analyticsEvent: { action: '', category: '' },
    className: 'ia-button dark',
    text: 'Purchase',
  },
];

const container = ({
  primaryActions = defaultPrimary,
  secondaryActions = defaultSecondary,
  borrowType = '',
}: {
  primaryActions?: ActionButtonConfig[];
  secondaryActions?: ActionButtonConfig[];
  borrowType?: string;
} = {}) =>
  html`<collapsible-action-group
    .primaryActions=${primaryActions}
    .secondaryActions=${secondaryActions}
    .borrowType=${borrowType}
    .returnUrl=${'https://openlibrary.org'}
  ></collapsible-action-group>`;

describe('<collapsible-action-group>', () => {
  it('check primary action button section is rendered', async () => {
    const el = (await fixture(container())) as CollapsibleActionGroup;
    const primaryActionContainer = el.shadowRoot!.querySelector('.primary')!;
    expect(primaryActionContainer.classList.contains('action-buttons')).to.be
      .true;

    const primaryButton = primaryActionContainer.querySelector(
      '.ia-button',
    ) as HTMLButtonElement;
    expect(primaryButton.innerText).to.equal('Borrow');
  });

  it('check if loader is active and action-group is disabled', async () => {
    const el = (await fixture(container())) as CollapsibleActionGroup;

    const primaryActionContainer = el.shadowRoot!.querySelector('.primary')!;
    primaryActionContainer
      .querySelector('.ia-button')!
      .dispatchEvent(new CustomEvent('toggle-loader'));
    el.disabled = true;
    await el.updateComplete;

    expect(el.disabled).to.be.true;
    expect(el.shadowRoot!.querySelector('div')!.classList.contains('disabled'))
      .to.be.true;
  });

  it('fires analytics events', async () => {
    const el = (await fixture(container())) as CollapsibleActionGroup;
    const primaryActionContainer = el.shadowRoot!.querySelector('.primary')!;
    expect(primaryActionContainer.classList.contains('action-buttons')).to.be
      .true;

    let eName: string | undefined;
    let eAnalytics: { category: string; action: string } | undefined;
    const manualClickStub = (
      eventName: string,
      gaEvent?: { category: string; action: string },
    ) => {
      eName = eventName;
      eAnalytics = gaEvent;
    };

    el.clickHandler = manualClickStub;
    await el.updateComplete;

    const primaryButton = primaryActionContainer.querySelector(
      '.ia-button',
    ) as HTMLButtonElement;
    primaryButton.dispatchEvent(new Event('click'));
    await el.updateComplete;

    expect(eName).to.equal('browseBook');
    expect(eAnalytics?.category).to.equal('Lending');
    expect(eAnalytics?.action).to.equal('Browse');
  });

  it('receives `loanUrl`', async () => {
    const el = (await fixture(container())) as CollapsibleActionGroup;
    expect(el.returnUrl).to.equal('https://openlibrary.org');
  });
});
