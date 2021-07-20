import { html, fixture, expect } from '@open-wc/testing';

import '../../src/components/text-group.js';

const container = ({ width, texts } = {}) =>
  html`<text-group .width=${width} .texts=${texts}></text-group>`;

describe('<text-group>', () => {
  it('check class on the basis small screen resolution', async () => {
    const el = await fixture(
      container({
        width: 600,
        texts: 'Join waitlist for 14 day borrow',
      })
    );
    expect(el.width).to.be.equal(600);
    const textSpan = el.shadowRoot.querySelector('span');

    expect(textSpan.classList.contains('hidden')).to.be.false;
    expect(textSpan.classList.contains('visible')).to.be.true;
  });

  it('check class on the basis small large resolution', async () => {
    const el = await fixture(
      container({
        width: 900,
        texts: 'Join waitlist for 14 day borrow',
      })
    );
    expect(el.width).to.be.equal(900);
    const textSpan = el.shadowRoot.querySelector('span');

    expect(textSpan.classList.contains('visible')).to.be.true;
    expect(textSpan.classList.contains('hidden')).to.be.false;
  });

  it('check inner texts of text group', async () => {
    const el = await fixture(
      container({
        width: 900,
        texts: 'Join waitlist for 14 day borrow',
      })
    );
    const textSpan = el.shadowRoot.querySelector('span');
    expect(textSpan.innerText).to.equal('Join waitlist for 14 day borrow');
  });
});
