import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/text-group.js';

const container = ({ textClass, texts } = {}) =>
  html`<text-group .textClass=${textClass} .texts=${texts}></text-group>`;

describe('<text-group>', () => {
  it('check class on the basis small screen resolution', async () => {
    const el = await fixture(
      container({
        textClass: 'visible',
        texts: 'Join waitlist for 14 day borrow',
      })
    );
    expect(el.textClass).to.be.equal('visible');
    const textSpan = el.shadowRoot.querySelector('span');

    expect(textSpan.classList.contains('visible')).to.be.true;
    expect(textSpan.classList.contains('hidden')).to.be.false;
  });

  it('check class on the basis small large resolution', async () => {
    const el = await fixture(
      container({
        textClass: 'hidden',
        texts: 'Join waitlist for 14 day borrow',
      })
    );
    expect(el.textClass).to.be.equal('hidden');
    const textSpan = el.shadowRoot.querySelector('span');

    expect(textSpan.classList.contains('hidden')).to.be.true;
    expect(textSpan.classList.contains('visible')).to.be.false;
  });

  it('check inner texts of text group', async () => {
    const el = await fixture(
      container({
        texts: 'Join waitlist for 14 day borrow',
      })
    );
    const textSpan = el.shadowRoot.querySelector('span');
    expect(textSpan.innerText).to.equal('Join waitlist for 14 day borrow');
  });
});
