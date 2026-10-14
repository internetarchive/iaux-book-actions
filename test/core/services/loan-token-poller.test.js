import { expect, aTimeout } from '@open-wc/testing';
import Sinon from 'sinon';

import { LoanTokenPoller } from '../../../src/core/services/loan-token-poller.js';
import { unexpectedResponseError } from '../../../src/core/services/actions-handler/actions-handler-service.js';
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

describe('handleTokenError - Sentry report (WEBDEV-9595)', () => {
  let originalSentry;

  beforeEach(() => {
    originalSentry = window.Sentry;
    window.Sentry = { captureMessage: Sinon.spy() };
  });

  afterEach(() => {
    window.Sentry = originalSentry;
  });

  it('sends the identifier, action, borrowType and status to Sentry', () => {
    const poller = new LoanTokenPoller({
      identifier: 'identifier1',
      borrowType: 'borrowed',
      successCallback: () => {},
      errorCallback: () => {},
      pollerDelay: 120,
      skipInitialCall: true,
    });

    poller.handleTokenError(
      {
        success: false,
        error: unexpectedResponseError(400),
        status: 400,
      },
      false
    );

    const [, context] = window.Sentry.captureMessage.lastCall.args;
    expect(context.tags).to.deep.equal({
      identifier: 'identifier1',
      action: 'create_token',
    });
    expect(context.extra.borrowType).to.equal('borrowed');
    expect(context.extra.status).to.equal(400);
    expect(context.extra.isInitial).to.be.false;
    poller.disconnectedCallback();
  });
});

describe('handleTokenError - HTML 400 from the WAF (WEBDEV-9595)', () => {
  it('still calls errorCallback, passing the response through for the consumer to decide', () => {
    const errorCallback = Sinon.spy();
    const poller = new LoanTokenPoller({
      identifier: 'identifier1',
      borrowType: 'borrowed',
      successCallback: () => {},
      errorCallback,
      pollerDelay: 120,
      skipInitialCall: true,
    });
    const data = {
      success: false,
      error: unexpectedResponseError(400),
      status: 400,
      nonJsonResponse: true,
    };

    poller.handleTokenError(data, false);

    expect(errorCallback.calledOnce).to.be.true;
    expect(errorCallback.firstCall.args[0].detail.data).to.deep.equal(data);
    expect(errorCallback.firstCall.args[0].detail.isInitial).to.be.false;
    poller.disconnectedCallback();
  });
});

describe('consecutive create_token failures (WEBDEV-9595)', () => {
  const makePoller = errorCallback =>
    new LoanTokenPoller({
      identifier: 'identifier1',
      borrowType: 'borrowed',
      successCallback: () => {},
      errorCallback,
      pollerDelay: 120,
      skipInitialCall: true,
    });

  it('passes the count of failures in a row to errorCallback', () => {
    const errorCallback = Sinon.spy();
    const poller = makePoller(errorCallback);

    poller.handleTokenError({ error: 'x' }, false);
    poller.handleTokenError({ error: 'x' }, false);
    poller.handleTokenError({ error: 'x' }, false);

    expect(
      errorCallback.getCalls().map(c => c.args[0].detail.consecutiveFailures)
    ).to.deep.equal([1, 2, 3]);
    poller.disconnectedCallback();
  });

  it('resets the count after a successful refresh', async () => {
    const errorCallback = Sinon.spy();
    const poller = makePoller(errorCallback);

    poller.handleTokenError({ error: 'x' }, false);
    poller.handleTokenError({ error: 'x' }, false);
    // on localhost the service fakes a create_token success
    poller.handleLoanTokenPoller(false);
    await aTimeout(300);
    poller.handleTokenError({ error: 'x' }, false);

    expect(errorCallback.lastCall.args[0].detail.consecutiveFailures).to.equal(
      1
    );
    poller.disconnectedCallback();
  });
});
