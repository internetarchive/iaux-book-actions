import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/embed-view.js';

const container = ({ identifier, bookTitle } = {}) =>
  html`<embed-view-link .identifier=${identifier} .bookTitle=${bookTitle}></embed-view>`;

describe('<embed-view-link>', () => {
  it('check inner texts of embed view', async () => {
    const el = await fixture(
      container({
        identifier: 'goody',
        bookTitle: 'this is test booktitle',
      })
    );
    const link = el.shadowRoot.querySelector('a');
    expect(link.innerText).to.equal('this is test booktitle');
    expect(link.getAttribute('href')).to.equal('/details/goody');
  });
});
