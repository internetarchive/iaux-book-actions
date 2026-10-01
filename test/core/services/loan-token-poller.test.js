import { expect } from '@open-wc/testing';
import Sinon from 'sinon';

import { LoanTokenPoller } from '../../../src/core/services/loan-token-poller.js';
import '@internetarchive/modal-manager';

beforeEach(async () => {
  await import('../../../src/core/config/ia-lending-intervals.js');

  const modalManager = document.createElement('modal-manager');
  document.body.appendChild(modalManager);
});

afterEach(() => {
  document.body.removeChild(document.querySelector('modal-manager'));
});

describe('Get Loan Token', () => {
  it('get loan token for browsed books', async () => {
    const tokenPoller = new LoanTokenPoller({
      identifier: 'identifier1',
      borrowType: 'browsed',
      successCallback: () => {
        console.log('success callback is executed!');
      },
      errorCallback: () => {
        console.log('error callback is executed!');
      },
      pollerDelay: 2000, // 2 minutes'
    });
    const successCallbackSpy = Sinon.stub(tokenPoller, 'successCallback');
    successCallbackSpy();
    expect(successCallbackSpy.callCount).to.equal(1);

    tokenPoller.handleLoanTokenPoller(true);
    expect(tokenPoller.errorCallback).to.be.a('function');
    expect(tokenPoller.successCallback).have;
  });

  it('get loan token for admin borrowed books', async () => {
    const tokenPoller = new LoanTokenPoller({
      identifier: 'identifier1',
      borrowType: 'adminBorrowed',
      successCallback: () => {},
      errorCallback: () => {},
      pollerDelay: 2000, // 2 minutes'
    });

    const successCallbackSpy = Sinon.stub(tokenPoller, 'successCallback');
    successCallbackSpy();
    expect(successCallbackSpy.callCount).to.equal(1);

    // for adminBorrowed,
    // - not initialize loanTokenInterval as don't need to fetch loan after specific interval
    expect(tokenPoller.loanTokenInterval).to.equal(undefined);
  });
});

describe('handleTokenError (no retry)', () => {
  // A create_token failure is treated as terminal on the first attempt —
  // no retry, whether it's the "stale loan read" race or anything else.
  const makeTokenPoller = () =>
    new LoanTokenPoller({
      identifier: 'identifier1',
      borrowType: 'browsed',
      successCallback: () => {},
      errorCallback: () => {},
      pollerDelay: 2000,
    });

  it('reports the error immediately, without retrying, on the initial call', () => {
    const tokenPoller = makeTokenPoller();
    const handleLoanTokenPollerSpy = Sinon.spy(
      tokenPoller,
      'handleLoanTokenPoller'
    );
    const errorCallbackSpy = Sinon.spy(tokenPoller, 'errorCallback');

    tokenPoller.handleTokenError(
      { error: 'You do not currently have this book borrowed.' },
      true
    );

    expect(errorCallbackSpy.calledOnce).to.be.true;
    expect(handleLoanTokenPollerSpy.called).to.be.false;
  });

  it('reports the error immediately on a routine (non-initial) poll too', () => {
    const tokenPoller = makeTokenPoller();
    const errorCallbackSpy = Sinon.spy(tokenPoller, 'errorCallback');

    tokenPoller.handleTokenError(
      { error: 'You do not currently have this book borrowed.' },
      false
    );

    expect(errorCallbackSpy.calledOnce).to.be.true;
  });

  it('passes isInitial through to the error callback', () => {
    const errorCallback = Sinon.spy();
    const poller = new LoanTokenPoller({
      identifier: 'foo',
      borrowType: 'browsed',
      successCallback: () => {},
      errorCallback,
      pollerDelay: 120,
    });
    poller.disconnectedCallback();

    poller.handleTokenError({ error: 'something else went wrong' }, true);

    expect(errorCallback.calledOnce).to.be.true;
    expect(errorCallback.firstCall.args[0].detail.isInitial).to.be.true;
  });
});

describe('skipInitialCall option', () => {
  it('starts the recurring interval but fires no immediate create_token call', () => {
    const poller = new LoanTokenPoller({
      identifier: 'foo',
      borrowType: 'browsed',
      successCallback: () => {},
      errorCallback: () => {},
      pollerDelay: 120,
      skipInitialCall: true,
    });
    const handleLoanTokenPollerSpy = Sinon.spy(poller, 'handleLoanTokenPoller');

    // bookAccessed() already ran in the constructor above (before the spy
    // was attached) -- re-run it to observe whether it calls out.
    poller.bookAccessed();

    expect(handleLoanTokenPollerSpy.called).to.be.false;
    expect(window.IALendingIntervals.tokenPoller).to.not.equal(0);
    poller.disconnectedCallback();
  });

  it('fires the immediate call as usual when skipInitialCall is not set', () => {
    const poller = new LoanTokenPoller({
      identifier: 'foo',
      borrowType: 'browsed',
      successCallback: () => {},
      errorCallback: () => {},
      pollerDelay: 120,
    });
    const handleLoanTokenPollerSpy = Sinon.spy(poller, 'handleLoanTokenPoller');

    poller.bookAccessed();

    expect(handleLoanTokenPollerSpy.calledWith(true)).to.be.true;
    poller.disconnectedCallback();
  });
});
