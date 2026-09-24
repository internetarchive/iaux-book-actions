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
    // id, borrowType, successCallback, errorCallback, pollerDelay
    const tokenPoller = new LoanTokenPoller(
      'identifier1',
      'browsed',
      () => {
        console.log('success callback is executed!');
      },
      () => {
        console.log('error callback is executed!');
      },
      2000 // 2 minutes'
    );
    const successCallbackSpy = Sinon.stub(tokenPoller, 'successCallback');
    successCallbackSpy();
    expect(successCallbackSpy.callCount).to.equal(1);

    tokenPoller.handleLoanTokenPoller(true);
    expect(tokenPoller.errorCallback).to.be.a('function');
    expect(tokenPoller.successCallback).have;
  });

  it('get loan token for admin borrowed books', async () => {
    const tokenPoller = new LoanTokenPoller(
      'identifier1',
      'adminBorrowed',
      () => {},
      () => {},
      2000 // 2 minutes'
    );

    const successCallbackSpy = Sinon.stub(tokenPoller, 'successCallback');
    successCallbackSpy();
    expect(successCallbackSpy.callCount).to.equal(1);

    // for adminBorrowed,
    // - not initialize loanTokenInterval as don't need to fetch loan after specific interval
    expect(tokenPoller.loanTokenInterval).to.equal(undefined);
  });
});

describe('handleTokenError retry (WEBDEV-8322 follow-up)', () => {
  // Lending::do_renew() (backend) deletes the old loan record and writes
  // a brand-new one on every renewal, so the initial create_token call
  // right after a renewal can race that write's propagation and come
  // back with this exact error even though the loan is genuinely valid.
  const staleLoanReadError = {
    error: 'You do not currently have this book borrowed.',
  };

  const makeTokenPoller = () =>
    new LoanTokenPoller(
      'identifier1',
      'browsed',
      () => {},
      () => {},
      2000
    );

  it('retries the initial call on a stale-loan-read error instead of failing immediately', () => {
    const tokenPoller = makeTokenPoller();
    const handleLoanTokenPollerSpy = Sinon.spy(
      tokenPoller,
      'handleLoanTokenPoller'
    );
    const errorCallbackSpy = Sinon.spy(tokenPoller, 'errorCallback');
    const clock = Sinon.useFakeTimers();

    try {
      tokenPoller.handleTokenError(staleLoanReadError, true, 0);

      expect(errorCallbackSpy.called).to.be.false;

      clock.tick(tokenPoller.initialTokenRetryDelay);

      expect(handleLoanTokenPollerSpy.calledWith(true, 1)).to.be.true;
    } finally {
      clock.restore();
    }
  });

  it('gives up and calls errorCallback after exhausting retries', () => {
    const tokenPoller = makeTokenPoller();
    const errorCallbackSpy = Sinon.spy(tokenPoller, 'errorCallback');

    tokenPoller.handleTokenError(
      staleLoanReadError,
      true,
      tokenPoller.maxInitialTokenRetries
    );

    expect(errorCallbackSpy.calledOnce).to.be.true;
  });

  it('does not retry a routine (non-initial) poll on the same error', () => {
    const tokenPoller = makeTokenPoller();
    const errorCallbackSpy = Sinon.spy(tokenPoller, 'errorCallback');

    tokenPoller.handleTokenError(staleLoanReadError, false, 0);

    expect(errorCallbackSpy.calledOnce).to.be.true;
  });

  it('does not retry a genuinely different error, even on the initial call', () => {
    const tokenPoller = makeTokenPoller();
    const errorCallbackSpy = Sinon.spy(tokenPoller, 'errorCallback');

    tokenPoller.handleTokenError(
      { error: 'loan token not found. please try again later.' },
      true,
      0
    );

    expect(errorCallbackSpy.calledOnce).to.be.true;
  });
});
