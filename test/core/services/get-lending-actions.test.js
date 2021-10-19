import { expect } from '@open-wc/testing';
import GetLendingActions from '../../../src/core/services/get-lending-actions.js';

describe('Get Lending Actions', () => {
  it('Browsable and Borrowable with purchase link', async () => {
    const lendingOptions = new GetLendingActions(
      'user',
      'identifier',
      {
        is_lendable: true,
        available_to_browse: true,
        available_to_borrow: true,
      },
      'dummy-bwbPurchaseUrl'
    );
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryTitle).to.equal(
      'Renewable every hour, pending availability.'
    );
    expect(actions.primaryActions.length).to.equal(3);
    expect(actions.primaryActions[0].text).to.equal('Borrow for 1 hour');
    expect(actions.primaryActions[1].text).to.equal('Borrow for 14 days');
    expect(actions.secondaryActions[1].text).to.equal('Purchase');
  });

  it('Borrowable without user', async () => {
    const lendingOptions = new GetLendingActions(
      '',
      'identifier',
      {
        is_lendable: true,
        available_to_borrow: true,
      },
      ''
    );
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryActions.length).to.equal(1);
    expect(actions.primaryTitle).to.equal(
      'This book can be borrowed for 14 days.'
    );
    expect(actions.primaryActions[0].text).to.equal('Log In and Borrow');
  });

  it('Borrowing action', async () => {
    const lendingOptions = new GetLendingActions(
      '@user',
      'identifier',
      {
        is_lendable: true,
        available_to_borrow: true,
        user_has_borrowed: true,
        daysLeftOnLoan: 4,
      },
      ''
    );
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryTitle).to.equal(
      'Your loan of this book has 4 days left.'
    );
    expect(actions.primaryActions.length).to.equal(2);
    expect(actions.primaryActions[0].text).to.equal('Return now');
  });

  it('Reedem borrow action', async () => {
    const lendingOptions = new GetLendingActions(
      '@user',
      'identifier',
      {
        is_lendable: true,
        available_to_borrow: true,
        user_can_claim_waitlist: true,
      },
      ''
    );
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryTitle).to.equal(
      'You are at the top of the waitlist for this book'
    );
    expect(actions.primaryActions.length).to.equal(2);
    expect(actions.primaryActions[0].text).to.equal('Borrow for 14 days');
  });

  it('User can access print disabled', async () => {
    const lendingOptions = new GetLendingActions(
      '@user',
      'identifier',
      {
        is_lendable: true,
        available_to_borrow: true,
        is_printdisabled: true,
        user_is_printdisabled: true,
      },
      ''
    );
    const actions = lendingOptions.getCurrentLendingActions();

    // in-case of print-disabled, we show 14 days borrow
    expect(actions.primaryTitle).to.equal('');
    expect(actions.primaryActions.length).to.equal(2);
    expect(actions.primaryActions[0].text).to.equal('Borrow for 14 days');
  });

  it('If print disabled only', async () => {
    const lendingOptions = new GetLendingActions(
      '@user',
      'identifier',
      {
        isPrintDisabledOnly: true,
      },
      ''
    );
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryTitle).to.equal(
      'Book available to patrons with print disabilities.'
    );
    expect(actions.primaryActions.length).to.equal(1);
    expect(actions.primaryActions[0].text).to.equal('Borrow Unavailable');
  });

  it('If user is on waitlist', async () => {
    const lendingOptions = new GetLendingActions(
      '@user',
      'identifier',
      {
        user_on_waitlist: true,
        user_can_claim_waitlist: false,
      },
      ''
    );
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryTitle).to.equal(
      'You are on the waitlist for this book.'
    );
    expect(actions.primaryActions.length).to.equal(1);
    expect(actions.primaryActions[0].text).to.equal('Leave Waitlist');
  });

  it('If book borrow is not available', async () => {
    const lendingOptions = new GetLendingActions('@user', 'identifier', {}, '');
    const actions = lendingOptions.getCurrentLendingActions();

    expect(actions.primaryTitle).to.equal(
      'This book is not available at this time.'
    );
    expect(actions.primaryActions.length).to.equal(1);
    expect(actions.primaryActions[0].text).to.equal('Borrow Unavailable');
  });
});
