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

describe('handleTokenError (no retry)', () => {
  // A create_token failure is treated as terminal on the first attempt —
  // no retry, whether it's the "stale loan read" race or anything else.
  const makeTokenPoller = () =>
    new LoanTokenPoller(
      'identifier1',
      'browsed',
      () => {},
      () => {},
      2000
    );

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
    const poller = new LoanTokenPoller('foo', 'browsed', () => {}, errorCallback, 120);
    poller.disconnectedCallback();

    poller.handleTokenError({ error: 'something else went wrong' }, true);

    expect(errorCallback.calledOnce).to.be.true;
    expect(errorCallback.firstCall.args[0].detail.isInitial).to.be.true;
  });
});
