import { html, fixture, expect } from '@open-wc/testing';
import '../src/ia-book-actions.js';
import Sinon from 'sinon';

import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';

afterEach(() => {
  Sinon.restore();
});

const container = ({ userid, identifier, lendingStatus = {} } = {}) =>
  html`<ia-book-actions
    .userid=${userid}
    .identifier=${identifier}
    .lendingStatus=${lendingStatus}
  ></ia-book-actions>`;

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
        userid: 'foo',
        identifier: 'foo',
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
        className: 'ia-button primary',
      },
      {
        text: 'Print Disability Access',
        className: 'print-disability',
      },
    ];

    expect(el.primaryActions.length).to.equal(2);
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
      {
        text: 'Print Disability Access',
        url: '/details/printdisabled?tab=about',
        className: 'print-disability',
      },
    ];

    expect(el.primaryActions.length).to.equal(3);
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
        className: 'ia-button danger',
      },
      {
        text: 'Print Disability Access',
        url: '/details/printdisabled?tab=about',
        className: 'print-disability',
      },
    ];

    expect(el.primaryActions.length).to.equal(3);
    expect(el.primaryActions[0].text).to.equal(expectedPrimaryActions[0].text);
    expect(el.primaryActions[1].text).to.equal('Borrow for 14 days');
  });

  describe('Shared Resize Observer', () => {
    it('can receive a Shared Resize Observer', async () => {
      const sharedObserverStub = new SharedResizeObserver();
      const addObserverSpy = Sinon.spy(sharedObserverStub, 'addObserver');
      const component = await fixture(html` <ia-book-actions
        .userid=${'@userid'}
        .identifier=${'foo'}
        .lendingStatus=${{
          is_lendable: true,
          user_has_browsed: true,
          available_to_browse: true,
          available_to_borrow: true,
        }}
        .sharedObserver=${sharedObserverStub}
      ></ia-book-actions>`);
      await component.updateComplete;

      expect(addObserverSpy.callCount).to.equal(1);
    });
    it('loads its own resize observer if it is not received', async () => {
      const component = await fixture(html` <ia-book-actions
        .userid=${'@userid'}
        .identifier=${'foo'}
        .lendingStatus=${{
          is_lendable: true,
          user_has_browsed: true,
          available_to_browse: true,
          available_to_borrow: true,
        }}
      ></ia-book-actions>`);

      await component.updateComplete;
      expect(component.sharedObserver).to.not.be.undefined;
    });
  });
});
