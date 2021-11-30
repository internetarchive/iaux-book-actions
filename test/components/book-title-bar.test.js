import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import '../../src/components/book-title-bar.js';

const container = ({ identifier, bookTitle } = {}) =>
  html`<book-title-bar
    .identifier=${identifier}
    .bookTitle=${bookTitle}
  ></book-title-bar>`;

describe('<book-title-bar>', () => {
  it('check inner texts of title bar', async () => {
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

  it('check if event if firing on valid analytics category action', async () => {
    const el = await fixture(
      container({
        identifier: 'goody',
        bookTitle: 'this is test booktitle',
      })
    );

    const clickButton = () =>
      el.shadowRoot.querySelector('a').dispatchEvent(new Event('click'));
    setTimeout(clickButton);

    const { detail } = await oneEvent(el, 'bookTitleBar');
    expect(detail.event.category).to.equal('BookReader-Header');
    expect(detail.event.action).to.equal('Book-Title-Bar');
  });
});
