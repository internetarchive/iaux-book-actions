import { html, fixture, expect, aTimeout } from '@open-wc/testing';

import '../src/ia-book-actions.js';
import Sinon from 'sinon';

import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';

afterEach(() => {
  Sinon.restore();
});

const container = ({ userid, identifier, lendingStatus = {} } = {}) =>
  html`<ia-book-actions
    .userid=${userid}
    .identifier=${identifier}
    .lendingStatus=${lendingStatus}
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
        text: 'Borrow for 1 hour',
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
    expect(el.primaryActions[0].text).to.equal('Borrow for 1 hour');
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

    expect(el.primaryTitle).to.equal('');
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
    expect(el.primaryTitle).contains('Borrow ends at ');
    expect(el.primaryActions[0].text).to.equal('Return now');
    expect(el.primaryActions[1].text).to.equal('Print Disability Access');
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

    await aTimeout(1500); // wait for 1.5 second
    await el.updateComplete;

    expect(el.primaryActions[0].text).to.equal('Borrow again');
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

    expect(el.primaryTitle).contains('Borrow ends at ');
    expect(el.primaryActions[0].text).to.equal('Return now');
    expect(el.tokenPoller.loanTokenInterval).to.not.equal(undefined);

    const expiredStatus = { ...browsingStatus, browsingExpired: true };
    el.lendingStatus = expiredStatus;
    await el.updateComplete;
    await aTimeout(1500); // wait for 1.5 sec

    expect(eventReceived).to.equal(true);
    expect(el.primaryActions[0].text).to.equal('Borrow again');
    expect(el.tokenPoller.loanTokenInterval).to.equal(undefined);
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
