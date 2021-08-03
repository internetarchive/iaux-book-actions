import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/info-icon.js';

const container = ({ iconClass = 'mobile' } = {}) =>
  html`<info-icon .iconClass=${iconClass}></info-icon>`;

describe('<info-icon>', () => {
  it('check class on the basis screen resolution', async () => {
    const el = await fixture(container());
    expect(el.iconClass).to.be.equal('mobile');
    expect(el.shadowRoot.querySelector('a').classList.contains('mobile')).to.be
      .true;
    expect(el.shadowRoot.querySelector('a').classList.contains('desktop')).to.be
      .false;
  });
});
