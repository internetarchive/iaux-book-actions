import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import '../../src/components/timer-countdown.js';

const container = ({ secondsLeftOnLoan, loanRenewTimeConfig } = {}) =>
  html`<timer-countdown
    .secondsLeftOnLoan=${secondsLeftOnLoan}
    .loanRenewTimeConfig=${loanRenewTimeConfig}
  ></timer-countdown>`;

describe('<timer-countdown>', () => {
  it('timer interval is undefined when loan is expired', async () => {
    const el = await fixture(
      container({
        secondsLeftOnLoan: 0, // in seconds
        loanRenewTimeConfig: {
          loanTotalTime: 14, // in seconds
          loanRenewAtLast: 5, // in seconds
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
        secondsLeftOnLoan: 2, // in seconds
        loanRenewTimeConfig: {
          loanTotalTime: 14, // in seconds
          loanRenewAtLast: 5, // in seconds
          pageChangedInLast: 5, // in seconds
          isDevBox: true,
        },
      })
    );

    await aTimeout(1900);
    await el.updateComplete;

    expect(el.secondsLeftOnLoan).to.equal(2);
    expect(el.timerInterval).to.not.be.undefined;
  });
});
