import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/info-icon';
import type { InfoIcon } from '../../src/components/info-icon';

const container = ({ iconClass = 'mobile' }: { iconClass?: string } = {}) =>
  html`<info-icon .iconClass=${iconClass}></info-icon>`;

describe('<info-icon>', () => {
  it('check class on the basis screen resolution', async () => {
    const el = (await fixture(container())) as InfoIcon;
    expect(el.iconClass).to.be.equal('mobile');
    const link = el.shadowRoot!.querySelector('a')!;
    expect(link.classList.contains('mobile')).to.be.true;
    expect(link.classList.contains('desktop')).to.be.false;
  });
});
