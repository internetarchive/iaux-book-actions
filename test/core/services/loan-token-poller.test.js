import { expect } from '@open-wc/testing';
import Sinon from 'sinon';

// import { LocalCache } from '@internetarchive/local-cache';
import { LoanTokenPoller } from '../../../src/core/services/loan-token-poller.js';

describe('Get Loan Token', () => {
  it('get loan token for browsed books', async () => {
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

    // for adminBorrowed,
    // - not initialize loanTokenInterval as don't need to fetch loan after specific interval
    expect(tokenPoller.loanTokenInterval).to.equal(undefined);
  });
});
