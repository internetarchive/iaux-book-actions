import { expect } from '@open-wc/testing';
import Sinon from 'sinon';

import { LoanTokenPoller } from '../../../src/core/services/loan-token-poller';
import '@internetarchive/modal-manager';

beforeEach(async () => {
  await import('../../../src/core/config/ia-lending-intervals');

  const modalManager = document.createElement('modal-manager');
  document.body.appendChild(modalManager);
});

afterEach(() => {
  const mm = document.body.querySelector('modal-manager');
  if (mm) document.body.removeChild(mm);
});

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
      2000,
    );
    const successCallbackSpy = Sinon.stub(tokenPoller, 'successCallback');
    successCallbackSpy();
    expect(successCallbackSpy.callCount).to.equal(1);

    tokenPoller.handleLoanTokenPoller(true);
    expect(tokenPoller.errorCallback).to.be.a('function');
  });

  it('get loan token for admin borrowed books', async () => {
    const tokenPoller = new LoanTokenPoller(
      'identifier1',
      'adminBorrowed',
      () => {},
      () => {},
      2000,
    );

    const successCallbackSpy = Sinon.stub(tokenPoller, 'successCallback');
    successCallbackSpy();
    expect(successCallbackSpy.callCount).to.equal(1);

    expect(tokenPoller.loanTokenInterval).to.equal(undefined);
  });
});
