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

  it('handles `BookReader:userAction` event', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
      })
    );

    const spy = Sinon.spy(el, 'autoLoanRenewChecker');
    el.borrowType = 'browsed';
    await el.updateComplete;

    window.dispatchEvent(new Event('BookReader:userAction'));
    await el.updateComplete;

    expect(spy.calledOnce).to.be.true;
    expect(spy.calledWith(true)).to.be.true;
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
        callback: () => {},
        className: 'ia-button primary',
      },
      {
        text: 'Borrow for 14 days',
        callback: () => {},
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
        callback: () => {},
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

    expect(el.primaryActions[0].text).to.equal('Borrow');

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
    expect(el.primaryActions[0].text).to.equal('Borrow');
    expect(el.tokenPoller.loanTokenInterval).to.equal(undefined);
  });
});

describe('Auto renew one hour loan', () => {
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
