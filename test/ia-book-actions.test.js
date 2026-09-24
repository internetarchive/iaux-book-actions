import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import '@internetarchive/modal-manager';
import '../src/ia-book-actions.js';
import Sinon from 'sinon';

import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import { LocalCache } from '@internetarchive/local-cache';

beforeEach(() => {
  const modalManager = document.createElement('modal-manager');
  document.body.appendChild(modalManager);
});

afterEach(() => {
  Sinon.restore();
  document.body.removeChild(document.querySelector('modal-manager'));
});

// localCache used for auto-loan-renew
const localCache = new LocalCache({
  namespace: 'loanRenew',
});

const container = ({
  userid,
  identifier,
  lendingStatus = {},
  barType = 'action',
} = {}) =>
  html`<ia-book-actions
    .userid=${userid}
    .identifier=${identifier}
    .lendingStatus=${lendingStatus}
    .barType=${barType}
  ></ia-book-actions>`;

describe('<ia-book-actions>', () => {
  it('Check assigned property value', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          is_lendable: true,
          available_to_browse: false,
          available_to_borrow: true,
        },
      })
    );

    expect(el.userid).to.be.equal('@user1');
    expect(el.identifier).to.equal('foobar');
  });

  it('Can daw a title bar instead of actions', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        barType: 'title',
      })
    );

    const titleBar = el.shadowRoot.querySelector('book-title-bar');
    expect(titleBar).to.exist;
  });

  it('Handles <collapsible-action-group>@toggleActionGroup event', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
      })
    );

    const collapsibleActionGroup = el.shadowRoot.querySelector(
      'collapsible-action-group'
    );
    expect(el.disableActionGroup).to.be.false;
    collapsibleActionGroup.dispatchEvent(new Event('toggleActionGroup'));
    await el.updateComplete;
    expect(el.disableActionGroup).to.be.true;
  });

  it('handles `BookReader:userAction` event when loan is active', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
      })
    );
    // Not testing the BookReader-init grace period here — bypass it.
    el.userActionReadyAt = 0;

    const spy = Sinon.spy(el, 'autoLoanRenewChecker');
    el.lendingStatus = { ...el.lendingStatus, browsingExpired: false };
    await el.updateComplete;
    // Set borrowType after the update so setupLendingToolbarActions() doesn't overwrite it
    el.borrowType = 'browsed';

    window.dispatchEvent(new Event('BookReader:userAction'));
    await el.updateComplete;

    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(true)).to.be.true;
  });

  it('handles `BookReader:userAction` event when loan has expired', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: { user_has_browsed: true, browsingExpired: true },
      })
    );
    // Not testing the BookReader-init grace period here — bypass it.
    el.userActionReadyAt = 0;

    const spy = Sinon.spy(el, 'autoRenewExpiredLoan');
    el.borrowType = 'browsed';
    await el.updateComplete;

    window.dispatchEvent(new Event('BookReader:userAction'));
    await el.updateComplete;

    expect(spy.calledOnce).to.be.true;
  });

  it('ignores BookReader:userAction fired within the startup grace period (WEBDEV-8322 follow-up)', async () => {
    // Regression: BookReader.jumpToIndex() fires its own 'userAction'
    // event any time it runs — including BookReader's own init-time jump
    // to the reader's last-read page (updateFromParams(), called from
    // init()), which has nothing to do with the patron doing anything.
    // Without this grace period, a plain page refresh on an already-
    // expired loan would silently auto-renew before the patron did
    // anything at all.
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: { user_has_browsed: true, browsingExpired: true },
      })
    );
    el.borrowType = 'browsed';
    await el.updateComplete;

    const spy = Sinon.spy(el, 'autoRenewExpiredLoan');

    // Fired immediately after bindLoanRenewEvents() ran (in firstUpdated())
    // — well within the default grace period.
    window.dispatchEvent(new Event('BookReader:userAction'));
    await el.updateComplete;

    expect(spy.called).to.be.false;
  });
});

describe('Primary Actions data', () => {
  it('Check data for single primary action', async () => {
    const el = await fixture(
      container({
        userid: 'foo',
        identifier: 'foo',
        lendingStatus: {
          is_lendable: true,
          available_to_browse: false,
          available_to_borrow: true,
        },
      })
    );

    const expectedPrimaryActions = [
      {
        text: 'Borrow for 14 days',
        className: 'ia-button primary',
      },
      {
        text: 'Print Disability Access',
        className: 'print-disability',
      },
    ];

    expect(el.primaryActions.length).to.equal(2);
    expect(el.primaryActions.length).to.equal(expectedPrimaryActions.length);

    expect(el.primaryActions[0].text).to.equal('Borrow for 14 days');
    expect(el.primaryActions[0].text).to.equal(expectedPrimaryActions[0].text);
  });

  it('Check data for multiple primary action', async () => {
    const el = await fixture(
      container({
        userid: '@user',
        identifier: 'foobar',
        lendingStatus: {
          is_lendable: true,
          available_to_browse: true,
          available_to_borrow: true,
        },
      })
    );
    const expectedPrimaryActions = [
      {
        text: 'Borrow', // changed from 'Borrow for 1 hour'
        callback: () => { },
        className: 'ia-button primary',
      },
      {
        text: 'Borrow for 14 days',
        callback: () => { },
        className: 'ia-button primary',
        disabled: false,
      },
      {
        text: 'Print Disability Access',
        url: '/details/printdisabled?tab=about',
        className: 'print-disability',
      },
    ];

    expect(el.primaryActions.length).to.equal(3);
    expect(el.primaryActions.length).to.equal(expectedPrimaryActions.length);
    expect(el.primaryActions[1].text).to.equal('Borrow for 14 days');
    expect(el.primaryActions[1].text).to.equal(expectedPrimaryActions[1].text);
  });
});

describe('Borrow status actions', () => {
  it('Update available_to_browse key when book is not available to borrow', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        lendingStatus: {
          is_lendable: true,
          available_to_browse: true,
          available_to_borrow: true,
        },
      })
    );

    const errorEvent = new CustomEvent('lendingActionError');
    el.addEventListener('lendingActionError', () => {
      el.handleLendingActionError({
        detail: {
          action: 'browse_book',
          data: { error: 'not available to borrow' },
        },
      });
    });
    el.dispatchEvent(errorEvent);
    await el.updateComplete;

    // removed available_to_browse from lending bar
    expect(el.lendingStatus.available_to_browse).to.be.false;
    expect(el.primaryActions[0].text).to.equal('Borrow for 14 days');
  });

  it('Update available_to_borrow key when book is not available to borrow', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        lendingStatus: {
          is_lendable: true,
          available_to_browse: true,
          available_to_borrow: true,
        },
      })
    );

    const errorEvent = new Event('lendingActionError');
    el.addEventListener('lendingActionError', () => {
      el.handleLendingActionError({
        detail: {
          action: 'borrow_book',
          data: { error: 'not available to borrow' },
        },
      });
    });
    el.dispatchEvent(errorEvent);
    await el.updateComplete;

    // removed available_to_borrow from lending bar
    expect(el.lendingStatus.available_to_borrow).to.be.false;
    expect(el.primaryActions[0].text).to.equal('Borrow');
  });

  it('Check action for borrowable book without user', async () => {
    const el = await fixture(
      container({
        lendingStatus: {
          is_lendable: true,
          available_to_browse: true,
          available_to_borrow: true,
        },
      })
    );
    const expectedPrimaryActions = [
      {
        text: 'Log In and Borrow',
        callback: () => { },
        className: 'ia-button danger',
      },
    ];

    expect(el.primaryTitle).to.equal(
      'Renews automatically with continued use.'
    );
    expect(el.primaryActions.length).to.equal(2);
    expect(el.primaryActions[0].text).to.equal('Log In and Borrow');
    expect(el.primaryActions[0].text).to.equal(expectedPrimaryActions[0].text);
  });

  it('Check action for browsed book with user', async () => {
    const el = await fixture(
      container({
        userid: '@userid',
        lendingStatus: {
          is_lendable: true,
          user_has_browsed: true,
          available_to_browse: true,
          available_to_borrow: true,
        },
      })
    );
    const expectedPrimaryActions = [
      {
        text: 'Return now',
        className: 'ia-button danger',
      },
      {
        text: 'Print Disability Access',
        url: '/details/printdisabled?tab=about',
        className: 'print-disability',
      },
    ];

    expect(el.primaryActions.length).to.equal(3);
    expect(el.primaryActions[0].text).to.equal(expectedPrimaryActions[0].text);
    expect(el.primaryActions[1].text).to.equal('Borrow for 14 days');
  });
});

describe('Browsing expired status', () => {
  it('Book is browsed but not expired', async () => {
    const el = await fixture(
      container({
        userid: '@userid',
        lendingStatus: {
          is_lendable: true,
          user_has_browsed: true,
          browseHasExpired: false,
        },
      })
    );
    expect(el.primaryTitle).contains('');
    expect(el.primaryActions[0].text).to.equal('Return now');
    expect(el.primaryActions[1].text).to.equal('Print Disability Access');

    // default params of one-hour loan renew
    expect(el.loanRenewResult.texts).to.equal('');
    expect(el.loanRenewResult.renewNow).to.equal(false);
    expect(el.loanRenewResult.secondsLeft).to.equal(0);
  });

  it('Book is browsing and going to expire after 1 second', async () => {
    const el = await fixture(
      container({
        userid: '@userid',
        lendingStatus: {
          is_lendable: true,
          user_has_browsed: true,
          browseHasExpired: false,
          secondsLeftOnLoan: 1,
        },
      })
    );

    // timer-countdown is still active
    expect(el.timerCountdownEl).to.exist;

    await aTimeout(1500); // wait for 1.5 second
    await el.updateComplete;

    // Auto-return must not visibly change the action bar — it should stay
    // exactly as it looked while reading (see WEBDEV-8322).
    expect(el.primaryActions[0].text).to.equal('Return now');

    expect(el.timerCountdownEl).to.exist;

    //   // book has been expired
    expect(el.loanRenewResult.renewNow).to.equal(false);
    expect(el.loanRenewResult.secondsLeft).to.equal(0);
    expect(el.loanRenewResult.texts).to.equal(
      'This book has been returned due to inactivity.'
    );
  });

  it('Expiring book cancels interval & emits event', async () => {
    const baseStatus = {
      is_lendable: true,
      user_has_browsed: false,
    };
    const el = await fixture(
      container({
        userid: '@userid',
        lendingStatus: baseStatus,
      })
    );

    let eventReceived = false;
    const listener = () => {
      eventReceived = true;
    };
    el.addEventListener('IABookReader:BrowsingHasExpired', listener);

    const browsingStatus = { ...baseStatus, user_has_browsed: true };
    el.lendingStatus = browsingStatus;
    await el.updateComplete;

    expect(el.primaryTitle).contains('');
    expect(el.primaryActions[0].text).to.equal('Return now');

    const expiredStatus = { ...browsingStatus, browsingExpired: true };
    el.lendingStatus = expiredStatus;
    await el.updateComplete;
    await aTimeout(1500); // wait for 1.5 sec

    expect(eventReceived).to.equal(true);
    // Auto-return must not visibly change the action bar — it should stay
    // exactly as it looked while reading (see WEBDEV-8322).
    expect(el.primaryActions[0].text).to.equal('Return now');
    expect(el.tokenPoller.loanTokenInterval).to.equal(undefined);
  });
});

describe('Auto renew one hour loan', async () => {
  await aTimeout(5000);
  it('Book is browsing and renewed it now', async () => {
    const loanTime = 88;
    const el = await fixture(
      container({
        userid: '@userid',
        identifier: 'Foo',
        lendingStatus: {
          is_lendable: true,
          user_has_browsed: true,
          browseHasExpired: false,
          secondsLeftOnLoan: loanTime,
        },
      })
    );

    // timer-countdown starts with same amount component is loaded with
    expect(el.timerCountdownEl.secondsLeftOnLoan).to.equal(loanTime);

    const handleLoanAutoRenewedSpy = Sinon.spy(el, 'handleLoanAutoRenewed');

    // let's update state, fastforward loan...
    el.loanRenewResult = {
      texts: 'This book has been renewed for 1 hour.',
      renewNow: true,
      secondsLeft: 10,
    };
    el.lendingStatus = {
      is_lendable: true,
      user_has_browsed: true,
      browseHasExpired: false,
      secondsLeftOnLoan: 8, // <-- loan time has decreased
    };

    await el.updateComplete;

    await localCache.set({
      key: `${el.identifier}-loanTime`,
      value: new Date(new Date().getTime() + loanTime * 1000),
      ttl: Number(10),
    });

    // timer-countdown reflects decreased loan time
    expect(el.timerCountdownEl.secondsLeftOnLoan).to.equal(8);

    expect(el.postInitComplete).to.equal(false);

    // dispatch loanAutoRenewed event - test 200 callback
    const collapsibleActionGroupEl = el.shadowRoot.querySelector(
      'collapsible-action-group'
    );
    collapsibleActionGroupEl.dispatchEvent(
      new CustomEvent('loanAutoRenewed', {
        detail: { data: { identifier: 'Foo' } },
      })
    );

    await aTimeout(1900); // wait for 1.9 second
    await el.updateComplete;

    // Autorenew 200 callback is called
    expect(handleLoanAutoRenewedSpy.calledOnce).to.equal(true);

    expect(el.loanRenewResult.texts).to.equal(
      'This book has been renewed for 1 hour.'
    );
    expect(el.loanRenewResult.renewNow).to.equal(true);
    expect(el.loanRenewResult.secondsLeft).to.equal(10);
    expect(el.timerCountdownEl).to.exist;
    expect(el.timerCountdownEl.secondsLeftOnLoan).to.equal(8);
  });
});

describe('Visibility change API for document', async () => {
  await aTimeout(5000);

  beforeEach(() => {
    Object.defineProperty(document, 'hidden', {
      value: false,
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(document, 'hidden', {
      value: true,
      configurable: true,
    });
  });

  it('when book is not expired and loan time is valid', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: false,
        },
      })
    );
    await el.updateComplete;

    // Set a valid loan time well into the future
    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    const spy = Sinon.spy(el, 'loanStatusCheckInterval');
    document.dispatchEvent(new Event('visibilitychange'));
    await aTimeout(100);

    expect(spy.calledOnce).to.be.true;
  });

  it('when loan expired while tab was hidden (browsingExpired false, loanTime past)', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: false,
        },
      })
    );
    await el.updateComplete;

    // Set a loan time already in the past
    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() - 10 * 1000),
      ttl: 3600,
    });

    const spy = Sinon.spy(el, 'autoRenewExpiredLoan');
    document.dispatchEvent(new Event('visibilitychange'));
    await aTimeout(100);

    expect(spy.calledOnce).to.be.true;
  });

  it('when loan already marked expired (browsingExpired true)', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: true,
        },
      })
    );
    await el.updateComplete;

    el.borrowType = 'browsed';

    const spy = Sinon.spy(el, 'autoRenewExpiredLoan');
    document.dispatchEvent(new Event('visibilitychange'));
    await aTimeout(100);

    expect(spy.calledOnce).to.be.true;
  });
});

describe('autoRenewExpiredLoan', () => {
  it('optimistically resets browsingExpired so the button stays red', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          available_to_browse: true,
          browsingExpired: true,
        },
      })
    );
    await el.updateComplete;

    // Before: browsingExpired true → borrow1HrAction → primary color is 'primary' (blue)
    expect(el.primaryColor).to.equal('primary');

    el.autoRenewExpiredLoan();
    await el.updateComplete;

    // After: browsingExpired flipped to false → patronIsReadingAction → 'danger' (red)
    expect(el.lendingStatus.browsingExpired).to.be.false;
    expect(el.primaryColor).to.equal('danger');
  });

  it('does not (re)start the countdown during the optimistic pre-confirmation window (WEBDEV-8322 follow-up)', async () => {
    // Regression: the optimistic browsingExpired flip above triggers
    // setupLendingToolbarActions() before renew_loan is even dispatched,
    // let alone confirmed. Without gating on loanRenewInProgress, that
    // would (re)start the timer-countdown interval using whatever stale
    // secondsLeftOnLoan was left over from before the loan expired,
    // showing a wrong/flickering value until handleLoanAutoRenewed()
    // corrects it moments later.
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          available_to_browse: true,
          browsingExpired: true,
        },
      })
    );
    await el.updateComplete;

    const startTimerCountdownSpy = Sinon.spy(el, 'startTimerCountdown');

    el.autoRenewExpiredLoan();
    await el.updateComplete;

    expect(el.loanRenewInProgress).to.be.true;
    expect(startTimerCountdownSpy.called).to.be.false;
  });

  it('sets loanRenewInProgress and triggers renewNow after timeout', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: true,
        },
      })
    );
    await el.updateComplete;

    el.autoRenewExpiredLoan();

    expect(el.loanRenewInProgress).to.be.true;

    // renewNow is set in a setTimeout — flush the macrotask queue
    await aTimeout(50);
    expect(el.loanRenewResult.renewNow).to.be.true;
    expect(el.loanRenewResult.renewType).to.equal('auto');
  });

  it('ignores subsequent calls while a renewal is already in progress', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: true,
        },
      })
    );
    await el.updateComplete;

    // Spy *after* fixture so the handler is the same instance
    const spy = Sinon.spy(el, 'autoRenewExpiredLoan');

    el.autoRenewExpiredLoan(); // first call — proceeds
    el.autoRenewExpiredLoan(); // second call — should be a no-op

    // The spy counts both invocations but the internal guard stops the second
    expect(spy.callCount).to.equal(2);
    // loanRenewInProgress is still true (not double-set or cleared)
    expect(el.loanRenewInProgress).to.be.true;

    // Only one setTimeout fires (the second call returned early)
    await aTimeout(50);
    expect(el.loanRenewResult.renewNow).to.be.true;
  });

  it('clears loanRenewInProgress after a successful loanAutoRenewed event', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: false,
          secondsLeftOnLoan: 100,
        },
      })
    );
    await el.updateComplete;

    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    el.autoRenewExpiredLoan();
    expect(el.loanRenewInProgress).to.be.true;

    // Wait for the deferred renewNow to be set
    await aTimeout(50);

    // Simulate the renew_loan success response
    const collapsibleActionGroupEl = el.shadowRoot.querySelector(
      'collapsible-action-group'
    );
    collapsibleActionGroupEl.dispatchEvent(
      new CustomEvent('loanAutoRenewed', {
        detail: { data: { loan: { identifier: 'foobar' } } },
      })
    );

    await aTimeout(100);
    await el.updateComplete;

    expect(el.loanRenewInProgress).to.be.false;
  });

  it('does not reset postInitComplete until renewal is confirmed, not on the optimistic flip (WEBDEV-8322 follow-up)', async () => {
    // Regression: resetting postInitComplete (which lets BookReader
    // re-initialize via create_token) as soon as autoRenewExpiredLoan()
    // optimistically flips browsingExpired would let create_token race
    // ahead of renew_loan's response, reading the still-expired loan
    // record and minting a bad access cookie — breaking page images with
    // CORS/auth errors until the next natural token refresh.
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: true,
        },
      })
    );
    await el.updateComplete;
    el.postInitComplete = true;
    el.lendingBarPostInit = Sinon.spy();

    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    el.autoRenewExpiredLoan();
    await el.updateComplete;

    // Still true right after the optimistic flip — must not reset early.
    expect(el.postInitComplete).to.be.true;
    expect(el.lendingBarPostInit.called).to.be.false;

    await aTimeout(50);

    const collapsibleActionGroupEl = el.shadowRoot.querySelector(
      'collapsible-action-group'
    );
    collapsibleActionGroupEl.dispatchEvent(
      new CustomEvent('loanAutoRenewed', {
        detail: { data: { loan: { identifier: 'foobar' } } },
      })
    );

    await aTimeout(200);
    await el.updateComplete;

    // The confirmed renewal must have forced a fresh create_token cycle
    // that re-ran lendingBarPostInit() (BookReader re-init) — postInitComplete
    // itself ends up true again once that cycle completes, so we assert on
    // the re-init actually having fired instead of the transient flag.
    expect(el.lendingBarPostInit.calledOnce).to.be.true;
    expect(el.recoveringFromLoanExpiry).to.be.false;
  });

  it('does not start the token poller (create_token) on the optimistic flip, only after renewal is confirmed', async () => {
    // Regression: even without re-running lendingBarPostInit early, the
    // token poller restart in setupLendingToolbarActions() was ungated —
    // it fired on the optimistic lendingStatus flip too, calling
    // create_token against the still-expired loan. When that failed,
    // handleLendingActionError cleared ALL lending intervals (including
    // the countdown timer) and flipped user_has_browsed false, sometimes
    // permanently killing the countdown if it lost the race against the
    // real renewal confirming afterward.
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: true,
        },
      })
    );
    await el.updateComplete;

    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    const startTokenPollerSpy = Sinon.spy(el, 'startLoanTokenPoller');

    el.autoRenewExpiredLoan();
    await el.updateComplete;
    await aTimeout(150); // let the 100ms token-poller-restart check run

    expect(startTokenPollerSpy.called).to.be.false;

    await aTimeout(50);
    const collapsibleActionGroupEl = el.shadowRoot.querySelector(
      'collapsible-action-group'
    );
    collapsibleActionGroupEl.dispatchEvent(
      new CustomEvent('loanAutoRenewed', {
        detail: { data: { loan: { identifier: 'foobar' } } },
      })
    );

    await aTimeout(200);
    await el.updateComplete;

    expect(startTokenPollerSpy.calledOnce).to.be.true;
  });

  it('does not touch postInitComplete on a routine (non-expiry) renewal', async () => {
    // A background top-up renewal (loan never actually lapsed) never
    // interrupted BookReader, so it must not force a re-init.
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: { user_has_browsed: true, browsingExpired: false },
      })
    );
    await el.updateComplete;
    el.postInitComplete = true;
    el.loanRenewResult = { texts: '', renewNow: true, renewType: 'auto' };
    el.lendingBarPostInit = Sinon.spy();

    await el.localCache.set({
      key: 'foobar-loanTime',
      value: new Date(new Date().getTime() + 3600 * 1000),
      ttl: 3600,
    });

    const collapsibleActionGroupEl = el.shadowRoot.querySelector(
      'collapsible-action-group'
    );
    collapsibleActionGroupEl.dispatchEvent(
      new CustomEvent('loanAutoRenewed', {
        detail: { data: { loan: { identifier: 'foobar' } } },
      })
    );

    await aTimeout(100);
    await el.updateComplete;

    expect(el.lendingBarPostInit.called).to.be.false;
  });

  it('clears loanRenewInProgress and shows unavailable modal on renew_loan failure', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: true,
        },
      })
    );
    await el.updateComplete;

    const showModalSpy = Sinon.spy(el, 'showLoanUnavailableModal');

    el.autoRenewExpiredLoan();
    expect(el.loanRenewInProgress).to.be.true;

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: { error: 'book is not available' },
      },
    });

    expect(el.loanRenewInProgress).to.be.false;
    expect(showModalSpy.calledOnce).to.be.true;
  });
});

describe('BookReader:userAction race regression (WEBDEV-8322)', () => {
  it('does not let autoLoanRenewChecker clobber an in-flight expired-loan renewal', async () => {
    // Get borrowType derived as 'browsed' first, same as the
    // "Expiring book cancels interval" test above — hasExpired renders
    // leave borrowType untouched, so it must already be 'browsed' before
    // the loan is marked expired.
    const baseStatus = {
      is_lendable: true,
      user_has_browsed: true,
      browsingExpired: false,
    };
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: baseStatus,
      })
    );
    await el.updateComplete;
    expect(el.borrowType).to.equal('browsed');
    // Not testing the BookReader-init grace period here — bypass it.
    el.userActionReadyAt = 0;

    el.lendingStatus = { ...baseStatus, browsingExpired: true };
    await el.updateComplete;

    const autoLoanRenewCheckerSpy = Sinon.spy(el, 'autoLoanRenewChecker');

    window.dispatchEvent(new CustomEvent('BookReader:userAction'));

    // autoRenewExpiredLoan()'s setTimeout(0) sets renewNow=true. If the old
    // bug were present, the still-live lendingStatus.browsingExpired check
    // would (wrongly) also let autoLoanRenewChecker(true) run — which reads
    // the already-deleted loanTime cache key and overwrites renewNow back
    // to false. Give both paths plenty of time to resolve.
    await aTimeout(300);

    expect(autoLoanRenewCheckerSpy.called).to.be.false;
    expect(el.loanRenewResult.renewNow).to.be.true;
  });

  it('ignores repeated BookReader:userAction events firing in quick succession (e.g. from a scroll)', async () => {
    // Regression: a single scroll gesture can fire BookReader:userAction
    // several times in rapid succession. autoLoanRenewChecker() had no
    // guard against concurrent/repeated invocation, unlike
    // autoRenewExpiredLoan() — each event spun up its own LoanRenewHelper,
    // racing to overwrite this.loanRenewResult and potentially
    // re-triggering renew_loan/create_token while a prior call from an
    // earlier event was still in flight or had just landed.
    const baseStatus = {
      is_lendable: true,
      user_has_browsed: true,
      browsingExpired: false,
    };
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: baseStatus,
      })
    );
    await el.updateComplete;
    expect(el.borrowType).to.equal('browsed');
    // Not testing the BookReader-init grace period here — bypass it.
    el.userActionReadyAt = 0;

    el.loanRenewInProgress = true;

    const loanRenewHelperSpy = Sinon.spy(el, 'autoLoanRenewChecker');

    // Simulate a scroll firing the event several times back to back.
    window.dispatchEvent(new CustomEvent('BookReader:userAction'));
    window.dispatchEvent(new CustomEvent('BookReader:userAction'));
    window.dispatchEvent(new CustomEvent('BookReader:userAction'));
    await aTimeout(50);

    // The method is still called each time (the guard is inside it), but
    // must no-op instead of spinning up a new LoanRenewHelper each time.
    expect(loanRenewHelperSpy.callCount).to.equal(3);
    expect(el.loanRenewHelper).to.be.undefined;
  });
});

describe('handleLendingActionError - loanRenewInProgress reset', () => {
  it('clears loanRenewInProgress on any renew_loan failure, not just "not available"', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: { user_has_browsed: true, browsingExpired: true },
      })
    );
    await el.updateComplete;

    el.loanRenewInProgress = true;

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: { error: 'some other unrelated failure' },
      },
    });

    expect(el.loanRenewInProgress).to.be.false;
  });
});

describe('handleLendingActionError - create_token failures must not stop the countdown (WEBDEV-8322 follow-up)', () => {
  it('does not clear the reading countdown on a create_token failure', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: false,
          secondsLeftOnLoan: 100,
        },
      })
    );
    await el.updateComplete;
    expect(window.IALendingIntervals.timerCountdown).to.not.equal(0);

    el.handleLendingActionError({
      detail: {
        action: 'create_token',
        data: { error: 'loan token not found. please try again later.' },
      },
    });

    // The countdown must keep running — a token refresh hiccup says
    // nothing about how much time is left on the loan itself.
    expect(window.IALendingIntervals.timerCountdown).to.not.equal(0);
  });

  it('shows the error modal for a create_token failure that reaches here (retries already exhausted)', async () => {
    // By the time handleLendingActionError runs for a create_token
    // failure, LoanTokenPoller has already retried and given up (see
    // loan-token-poller.js's handleTokenError) — this is a genuine
    // failure, so the patron must be told instead of it happening
    // silently.
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: false,
          secondsLeftOnLoan: 100,
        },
      })
    );
    await el.updateComplete;

    const showErrorModalSpy = Sinon.spy(el, 'showErrorModal');
    const errorMsg = 'loan token not found. please try again later.';

    el.handleLendingActionError({
      detail: {
        action: 'create_token',
        data: { error: errorMsg },
      },
    });

    expect(showErrorModalSpy.calledOnceWith(errorMsg, 'create_token')).to.be
      .true;
    expect(el.lendingStatus.user_has_browsed).to.be.false;
  });

  it('still clears everything on a renew_loan failure', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          user_has_browsed: true,
          browsingExpired: false,
          secondsLeftOnLoan: 100,
        },
      })
    );
    await el.updateComplete;
    expect(window.IALendingIntervals.timerCountdown).to.not.equal(0);

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: { error: 'some other unrelated failure' },
      },
    });

    expect(window.IALendingIntervals.timerCountdown).to.equal(0);
  });

  it('shows the same unavailable-modal-and-refresh path for any renew_loan failure, regardless of message text', async () => {
    // Regression: branching on errorMsg.match(/not available/) to decide
    // how to recover was fragile — the server can return any message
    // (e.g. a lending limit hit), and guessing which lendingStatus fields
    // are now accurate client-side is error-prone. Every renew_loan
    // failure now shows the real error and refreshes the page on
    // dismissal (showLoanUnavailableModal's Okay button), rather than
    // trying to patch up state without reloading from the server.
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          is_lendable: true,
          user_has_browsed: true,
          browsingExpired: false,
          available_to_browse: false,
          secondsLeftOnLoan: 100,
        },
      })
    );
    await el.updateComplete;

    const showUnavailableSpy = Sinon.spy(el, 'showLoanUnavailableModal');
    const lendingLimitMsg =
      'Your account has hit a lending limit. Please try again later or contact info@archive.org.';

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: { error: lendingLimitMsg },
      },
    });
    await el.updateComplete;

    expect(showUnavailableSpy.calledOnceWith(lendingLimitMsg)).to.be.true;
  });

  it('updates lendingStatus immediately on a renew_loan failure — Borrow state, timer cleared', async () => {
    // The modal's Okay button refreshes the page, but that shouldn't be
    // the only thing correcting the UI — while the modal is still open,
    // the action bar must already show Borrow instead of "Return now"
    // with a stale countdown value from before the failed renewal.
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          is_lendable: true,
          user_has_browsed: true,
          browsingExpired: false,
          available_to_browse: false,
          secondsLeftOnLoan: 100,
        },
      })
    );
    await el.updateComplete;

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: {
          error:
            'Your account has hit a lending limit. Please try again later or contact info@archive.org.',
        },
      },
    });
    await el.updateComplete;

    expect(el.lendingStatus.user_has_browsed).to.be.false;
    expect(el.lendingStatus.available_to_browse).to.be.true;
    expect(el.lendingStatus.secondsLeftOnLoan).to.equal(0);
    expect(el.primaryActions[0].text).to.not.equal('Return now');
  });

  it('also shows the unavailable modal for the "not available" message, with its own text', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          is_lendable: true,
          user_has_browsed: true,
          browsingExpired: false,
          secondsLeftOnLoan: 100,
        },
      })
    );
    await el.updateComplete;

    const showUnavailableSpy = Sinon.spy(el, 'showLoanUnavailableModal');
    const notAvailableMsg = 'This book is not available to borrow at this time.';

    el.handleLendingActionError({
      detail: {
        action: 'renew_loan',
        data: { error: notAvailableMsg },
      },
    });
    await el.updateComplete;

    expect(showUnavailableSpy.calledOnceWith(notAvailableMsg)).to.be.true;
  });
});

describe('showWarningModal', () => {
  it('shows a headline, one Okay button, and an info-icon help link; Okay dismisses without renewing', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: { user_has_browsed: true, secondsLeftOnLoan: 100 },
      })
    );
    await el.updateComplete;

    await el.showWarningModal();

    const modalManagerEl = document.body.querySelector('modal-manager');
    const modalTemplateEl =
      modalManagerEl.shadowRoot.querySelector('modal-template');
    const headline =
      modalTemplateEl.shadowRoot.querySelector('.headline')?.textContent;
    expect(headline).to.contain('Are you still there?');

    const helpLink = modalTemplateEl.shadowRoot.querySelector(
      'a[href="https://help.archive.org/help/borrowing-from-the-lending-library"]'
    );
    expect(helpLink).to.exist;

    const buttons = modalManagerEl.shadowRoot.querySelectorAll(
      '#book-action-bar-custom-buttons button'
    );
    expect(buttons.length).to.equal(1);
    expect(buttons[0].textContent).to.contain('Okay');

    buttons[0].click();

    expect(el.warningModalOpen).to.be.false;
    expect(el.warningModalDismissed).to.be.true;
    expect(el.loanRenewResult.renewNow).to.be.false;
  });

  it('does not reopen while already open', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: { user_has_browsed: true, secondsLeftOnLoan: 100 },
      })
    );
    await el.updateComplete;

    await el.showWarningModal();
    const showModalSpy = Sinon.spy(el.modal, 'showModal');

    await el.showWarningModal();

    expect(showModalSpy.called).to.be.false;
  });
});

describe('Shared Resize Observer', () => {
  it('can receive a Shared Resize Observer', async () => {
    const sharedObserverStub = new SharedResizeObserver();
    const addObserverSpy = Sinon.spy(sharedObserverStub, 'addObserver');
    const component = await fixture(html` <ia-book-actions
      .userid=${'@userid'}
      .identifier=${'foo'}
      .lendingStatus=${{
        is_lendable: true,
        user_has_browsed: true,
        available_to_browse: true,
        available_to_borrow: true,
      }}
      .sharedObserver=${sharedObserverStub}
    ></ia-book-actions>`);
    await component.updateComplete;

    expect(addObserverSpy.callCount).to.equal(1);
  });

  it('loads its own resize observer if it is not received', async () => {
    const component = await fixture(html` <ia-book-actions
      .userid=${'@userid'}
      .identifier=${'foo'}
      .lendingStatus=${{
        is_lendable: true,
        user_has_browsed: true,
        available_to_browse: true,
        available_to_borrow: true,
      }}
    ></ia-book-actions>`);

    await component.updateComplete;
    expect(component.sharedObserver).to.not.be.undefined;
  });
});
