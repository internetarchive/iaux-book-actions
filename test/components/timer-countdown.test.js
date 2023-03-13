import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import '../../src/components/timer-countdown.js';

const container = ({ timeLeftOnLoan, loanRenewConfig } = {}) =>
  html`<timer-countdown
    .timeLeftOnLoan=${timeLeftOnLoan}
    .loanRenewConfig=${loanRenewConfig}
  ></timer-countdown>`;

describe('<timer-countdown>', () => {
  it('timer interval is undefined when loan is expired', async () => {
    const el = await fixture(
      container({
        timeLeftOnLoan: 0, // in seconds
        loanRenewConfig: {
          totalTime: 14, // in seconds
          autoCheckAt: 5, // in seconds
          pageChangedInLast: 5, // in seconds
          isDevBox: true,
        },
      })
    );

    await el.updateComplete;
    expect(el.timerInterval).to.be.undefined;
  });

  it('timer interval is not undefined when loan is active', async () => {
    const el = await fixture(
      container({
        timeLeftOnLoan: 2, // in seconds
        loanRenewConfig: {
          totalTime: 14, // in seconds
          autoCheckAt: 5, // in seconds
          pageChangedInLast: 5, // in seconds
          isDevBox: true,
        },
      })
    );

    await aTimeout(1900);
    await el.updateComplete;

    expect(el.timeLeftOnLoan).to.equal(1);
    expect(el.timerInterval).to.not.be.undefined;
  });
});
