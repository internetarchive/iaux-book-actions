import { expect, fixture, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';
import { LocalCache } from '@internetarchive/local-cache';

import ActionsHandler from '../../../src/core/services/actions-handler/actions-handler.js';
import { analyticsCategories, analyticsActions, analyticsLabels } from '../../../src/core/config/analytics-event-and-category.js';

// Define a temporary tag for this element for testing
const TEST_TAG = 'ia-actions-handler-test';
if (!customElements.get(TEST_TAG)) {
  customElements.define(TEST_TAG, ActionsHandler);
}

describe('ActionsHandler#setStickyAdminAccess', () => {
  let clock;
  let lastSetCookie;
  let cookieOverridden = false;
  let actionsHandlerFixture;

  beforeEach(async () => {
    // Intercept document.cookie writes to capture the full cookie string
    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get() {
        return '';
      },
      set(value) {
        lastSetCookie = value;
      },
    });
    cookieOverridden = true;

    // Create the element via fixture (portable across browsers)
    actionsHandlerFixture = await fixture(`<${TEST_TAG}></${TEST_TAG}>`);
  });

  afterEach(() => {
    sinon.restore();
    if (clock) {
      clock.restore();
      clock = undefined;
    }
    // restore document.cookie
    if (cookieOverridden) {
      try {
        // remove our instance-level override
        // eslint-disable-next-line no-param-reassign
        delete document.cookie;
      } catch (e) {
        // ignore
      }
      cookieOverridden = false;
    }
    lastSetCookie = undefined;
  });

  it('sets the sticky-admin-access cookie with correct domain, path, and 30-day expiration', async () => {
    // Arrange: fix time and stub cookie writer
    const now = new Date('2025-01-01T00:00:00.000Z');
    clock = sinon.useFakeTimers({ now: now.getTime() });

    // Calculate expected values based on current environment
    const expectedDomain = window.location.hostname === 'localhost' ? 'localhost' : '.archive.org';
    const expectedExpires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Act: call the method on the element created in beforeEach
    actionsHandlerFixture.setStickyAdminAccess(true);

    // Assert: verify the composed cookie string
    expect(lastSetCookie).to.be.a('string');
    // Name and value
    expect(lastSetCookie).to.contain(`${encodeURIComponent('sticky-admin-access')}=${encodeURIComponent('true')}`);
    // Domain
    expect(lastSetCookie).to.contain(`domain=${expectedDomain}`);
    // Path
    expect(lastSetCookie).to.contain('path=/');
    // Expiration close to 30 days from now
    const match = /expires=([^;]+)/.exec(lastSetCookie);
    expect(match).to.not.equal(null);
    const expiresStr = match && match[1];
    const parsed = expiresStr ? new Date(expiresStr) : null;
    expect(parsed).to.be.instanceOf(Date);
    expect(parsed && parsed.getTime()).to.equal(expectedExpires.getTime());
  });

  it('sets the cookie value to false when disabling', async () => {
    // Act
    actionsHandlerFixture.setStickyAdminAccess(false);

    expect(lastSetCookie).to.be.a('string');
    expect(lastSetCookie).to.contain(`${encodeURIComponent('sticky-admin-access')}=${encodeURIComponent('false')}`);
  });
});

describe('ActionsHandler#handleLoanRenewNow (WEBDEV-8322)', () => {
  let el;
  let localCache;
  const identifier = 'renew-now-test-book';

  beforeEach(async () => {
    // Make sure no other test in this run left ?error=true in the URL —
    // ActionsHandlerService reads it directly off window.location.
    const params = new URLSearchParams(window.location.search);
    if (params.has('error')) {
      params.delete('error');
      const query = params.toString();
      window.history.replaceState(
        {},
        '',
        `${window.location.pathname}${query ? `?${query}` : ''}`
      );
    }

    el = await fixture(`<${TEST_TAG}></${TEST_TAG}>`);
    el.identifier = identifier;
    el.loanTotalTime = 3600;
    localCache = new LocalCache({ namespace: 'loanRenew' });
    el.localCache = localCache;
    // The demo/test environment's ActionsHandlerService fakes a renew_loan
    // success after a 5s delay to simulate a real network round-trip.
    await localCache.delete(`${identifier}-loanTime`);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('awaits the loanTime cache write before dispatching loanAutoRenewed, and fires the renew analytics event only on success', async function test() {
    this.timeout(7000);

    const storeStatsSpy = sinon.spy(el.loanAnanlytics, 'storeLoanStatsCount');
    const sendEventSpy = sinon.spy(el.loanAnanlytics, 'sendEvent');

    let loanTimeWhenEventFired;
    el.addEventListener('loanAutoRenewed', () => {
      loanTimeWhenEventFired = localCache.get(`${identifier}-loanTime`);
    });

    el.handleLoanRenewNow('auto');

    // ActionsHandlerService fakes a 5s delay for renew_loan in this
    // (localhost) test environment — wait it out, matching the existing
    // pattern used elsewhere in this test suite for the same fake delay.
    await aTimeout(5500);

    // The race this guards against: loanAutoRenewed used to dispatch
    // before setBrowseTimeSession()'s cache write landed, so a listener
    // reading the cache immediately could still see the old/deleted value.
    const resolvedLoanTime = await loanTimeWhenEventFired;
    expect(resolvedLoanTime).to.exist;
    expect(resolvedLoanTime.getTime()).to.be.greaterThan(Date.now());

    expect(storeStatsSpy.calledWith(identifier, 'autorenew')).to.be.true;
    // storeLoanStatsCount fires its own matrix-stats sendEvent internally,
    // so assert on the specific renew-success event rather than call count.
    expect(
      sendEventSpy.calledWith(
        analyticsCategories.browse,
        analyticsActions.browseRenew,
        analyticsLabels.browseAutoRenew,
        identifier
      )
    ).to.be.true;
  });

  it('does not fire the renew analytics event when the renewal fails', async () => {
    const sendEventSpy = sinon.spy(el.loanAnanlytics, 'sendEvent');
    const storeStatsSpy = sinon.spy(el.loanAnanlytics, 'storeLoanStatsCount');

    // Force ActionsHandlerService's shouldReturnError branch for this call.
    const originalSearch = window.location.search;
    const params = new URLSearchParams(originalSearch);
    params.set('error', 'true');
    window.history.pushState({}, '', `?${params.toString()}`);

    let errorEventDetail;
    el.addEventListener('lendingActionError', ({ detail }) => {
      errorEventDetail = detail;
    });

    try {
      el.handleLoanRenewNow('auto');
      await aTimeout(200);

      expect(errorEventDetail?.action).to.equal('renew_loan');
      // dispatchActionError fires its own 'LendingServiceError' analytics
      // event on any error — that's expected. What must NOT fire is the
      // renew-success event this fix gates on `isRenewal`.
      expect(
        sendEventSpy.calledWith(
          analyticsCategories.browse,
          analyticsActions.browseRenew
        )
      ).to.be.false;
      expect(storeStatsSpy.calledWith(identifier, 'autorenew')).to.be.false;
    } finally {
      window.history.pushState({}, '', `${window.location.pathname}${originalSearch}`);
    }
  });
});
