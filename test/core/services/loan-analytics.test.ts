import { expect } from '@open-wc/testing';

import LoanAnanlytics from '../../../src/core/services/loan-analytics';
import * as Cookies from '../../../src/core/services/doc-cookies';

const identifier = 'identifier1';

afterEach(() => {
  Cookies.removeItem(`br-browse-${identifier}`, '/');
});

describe('Loan Analytics', () => {
  it('browse bumps the browse counter', async () => {
    const loanAnalytics = new LoanAnanlytics();
    await loanAnalytics.storeLoanStatsCount(identifier, 'browse');

    expect(loanAnalytics.lendingEventCounts?.browse).to.equal(1);
  });

  it('browseagain bumps the browse counter same as browse', async () => {
    const loanAnalytics = new LoanAnanlytics();
    await loanAnalytics.storeLoanStatsCount(identifier, 'browse');
    await loanAnalytics.storeLoanStatsCount(identifier, 'browseagain');

    expect(loanAnalytics.lendingEventCounts?.browse).to.equal(2);
  });

  it('return bumps the expire counter reported to GA', async () => {
    const loanAnalytics = new LoanAnanlytics();
    await loanAnalytics.storeLoanStatsCount(identifier, 'return');

    expect(loanAnalytics.gaStats.expire).to.equal(1);
  });

  it('autoreturn bumps the expire counter same as return', async () => {
    const loanAnalytics = new LoanAnanlytics();
    await loanAnalytics.storeLoanStatsCount(identifier, 'autoreturn');

    expect(loanAnalytics.gaStats.expire).to.equal(1);
  });
});
