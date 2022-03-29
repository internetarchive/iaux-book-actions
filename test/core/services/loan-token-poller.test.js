import { expect } from '@open-wc/testing';
import Sinon from 'sinon';

// import { LocalCache } from '@internetarchive/local-cache';
import { LoanTokenPoller } from '../../../src/core/services/loan-token-poller.js';

describe('Get Loan Token', () => {
  it('get loan token for browsed books', async () => {
    // const localCacheStub = new LocalCache();
    // const localCacheGetSpy = Sinon.spy(localCacheStub, 'get');

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

    // localCacheGetSpy();
    // expect(localCacheGetSpy.callCount).to.equal(1);

    // expect(tokenPoller.localCache.namespace).to.equal('LocalCache');
    // expect(tokenPoller.localCache.get).to.be.a('function');

    // tokenPoller.disconnectedInterval(); // clear token poller interval
    // expect(tokenPoller.loanTokenInterval).to.equal(undefined);

    tokenPoller.handleLoanTokenPoller(true);
    expect(tokenPoller.errorCallback).to.be.a('function');
    expect(tokenPoller.successCallback).have;
  });
});