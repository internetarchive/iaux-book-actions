import { expect, aTimeout } from '@open-wc/testing';

import { LocalCache } from '@internetarchive/local-cache';
import { LoanRenewHelper } from '../../../src/core/services/loan-renew-helper.js';

const identifier = 'booBar';
const loanRenewTimeConfig = {
  loanTotalTime: 13,
  loanRenewAtLast: 10,
  pageChangedInLast: 12,
  isDevBox: true,
};

// localCache used for auto-loan-renew
const localCache = new LocalCache({
  namespace: 'loanRenew',
});

beforeEach(async () => {
  await localCache.set({
    key: `${identifier}-loanTime`,
    value: new Date(
      new Date().getTime() + loanRenewTimeConfig.loanTotalTime * 1000
    ),
    ttl: Number(loanRenewTimeConfig.loanTotalTime),
  });
});

describe('Loan Renew Determine', () => {
  it('flip book page while reading a book', async () => {
    await aTimeout(1500);

    await localCache.set({
      key: `${identifier}-pageChangedTime`,
      value: new Date(), // current time
      ttl: Number(loanRenewTimeConfig.loanTotalTime),
    });

    const loanRenewHelper = new LoanRenewHelper(
      true, // hasPageChanged
      identifier,
      localCache,
      loanRenewTimeConfig
    );
    await loanRenewHelper.handleLoanRenew();

    expect(loanRenewHelper.result.renewNow).to.be.false;
  });

  it('auto renewed book when user is currently reading', async () => {
    await localCache.set({
      key: `${identifier}-pageChangedTime`,
      value: new Date(), // current time
      ttl: Number(loanRenewTimeConfig.loanTotalTime),
    });

    await aTimeout(1500);

    const loanRenewHelper = new LoanRenewHelper(
      false, // timer-countdown event
      identifier,
      localCache,
      loanRenewTimeConfig
    );
    await loanRenewHelper.handleLoanRenew();

    expect(loanRenewHelper.result.renewNow).to.be.true;
  });

  it('get toast message template', async () => {
    const loanRenewHelper = new LoanRenewHelper(
      false,
      identifier,
      localCache,
      loanRenewTimeConfig
    );

    const toastMsg = loanRenewHelper.getMessageTexts(
      loanRenewHelper.loanReturnWarning,
      '65' // in seconds
    );

    expect(toastMsg).to.be.equal(
      'This book will be automatically returned in 1 minute unless you turn a page.'
    );
  });
});
