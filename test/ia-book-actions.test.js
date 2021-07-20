import { html, fixture, expect } from '@open-wc/testing';

import '../src/ia-book-actions.js';

const container = ({
  userid = '@neeraj-archive',
  identifier = 'foobar',
  lendingStatus = {},
} = {}) =>
  html`<ia-book-actions .userid=${userid} .identifier=${identifier} .lendingStatus=${lendingStatus}></ia-topnav>`;

describe('<ia-book-actions>', () => {
  it('Check assigned property value', async () => {
    const el = await fixture(container());
    expect(el.userid).to.be.equal('@neeraj-archive');
    expect(el.identifier).to.equal('foobar');
  });
});
