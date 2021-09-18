import { html, fixture, expect } from '@open-wc/testing';
import '../src/ia-book-actions.js';

const container = ({ userid, identifier, lendingStatus = {} } = {}) =>
  html`<ia-book-actions .userid=${userid} .identifier=${identifier} .lendingStatus=${lendingStatus}></ia-topnav>`;

describe('<ia-book-actions>', () => {
  it('Check assigned property value', async () => {
    const el = await fixture(
      container({
        userid: '@user1',
        identifier: 'foobar',
        lendingStatus: {
          is_lendable: true,
          available_to_browse: false,
          available_to_borrow: true,
        },
      })
    );
    expect(el.userid).to.be.equal('@user1');
    expect(el.identifier).to.equal('foobar');
  });
});

describe('Primary Actions data', () => {
  it('Check data for single primary action', async () => {
    const el = await fixture(
      container({
        userid: 'user1',
        identifier: 'identifier1',
        lendingStatus: {
          is_lendable: true,
          available_to_browse: false,
          available_to_borrow: true,
        },
      })
    );

    const expectedPrimaryActions = [
      {
        text: 'Borrow for 14 days',
        callback: () => {},
        className: 'ia-button primary',
      },
    ];

    expect(el.primaryActions.length).to.equal(1);
    expect(el.primaryActions.length).to.equal(expectedPrimaryActions.length);

    expect(el.primaryActions[0].text).to.equal('Borrow for 14 days');
    expect(el.primaryActions[0].text).to.equal(expectedPrimaryActions[0].text);
  });

  it('Check data for multiple primary action', async () => {
    const el = await fixture(
      container({
        userid: '@user',
        identifier: 'foobar',
        lendingStatus: {
          is_lendable: true,
          available_to_browse: true,
          available_to_borrow: true,
        },
      })
    );
    const expectedPrimaryActions = [
      {
        text: 'Borrow for 1 hour',
        callback: () => {},
        className: 'ia-button primary',
      },
      {
        text: 'Borrow for 14 days',
        callback: () => {},
        className: 'ia-button primary',
        disabled: false,
      },
    ];

    expect(el.primaryActions.length).to.equal(2);
    expect(el.primaryActions.length).to.equal(expectedPrimaryActions.length);
    expect(el.primaryActions[1].text).to.equal('Borrow for 14 days');
    expect(el.primaryActions[1].text).to.equal(expectedPrimaryActions[1].text);
  });
});

describe('Borrow status actions', () => {
  it('Check action for borrowable book without user', async () => {
    const el = await fixture(
      container({
        lendingStatus: {
          is_lendable: true,
          available_to_browse: true,
          available_to_borrow: true,
        },
      })
    );
    const expectedPrimaryActions = [
      {
        text: 'Log In and Borrow',
        callback: () => {},
        className: 'ia-button danger',
      },
    ];

    expect(el.primaryTitle).to.equal(
      'Renewable every hour, pending availability.'
    );
    expect(el.primaryActions.length).to.equal(1);
    expect(el.primaryActions[0].text).to.equal('Log In and Borrow');
    expect(el.primaryActions[0].text).to.equal(expectedPrimaryActions[0].text);
  });

  it('Check action for browsed book with user', async () => {
    const el = await fixture(
      container({
        userid: '@userid',
        lendingStatus: {
          is_lendable: true,
          user_has_browsed: true,
          available_to_browse: true,
          available_to_borrow: true,
        },
      })
    );
    const expectedPrimaryActions = [
      {
        text: 'Return now',
        callback: () => {},
        className: 'ia-button danger',
      },
    ];

    expect(el.primaryActions.length).to.equal(2);
    expect(el.primaryActions[0].text).to.equal('Return now');
    expect(el.primaryActions[0].text).to.equal(expectedPrimaryActions[0].text);
  });
});
