import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/info-icon.js';

const container = ({ width = 900 } = {}) =>
  html`<info-icon .width=${width}></info-icon>`;

describe('<info-icon>', () => {
  it('check class on the basis screen resolution', async () => {
    const el = await fixture(container());
    expect(el.width).to.be.equal(900);
    expect(el.shadowRoot.querySelector('a').classList.contains('mobile')).to.be
      .false;
    expect(el.shadowRoot.querySelector('a').classList.contains('desktop')).to.be
      .true;
  });
});
