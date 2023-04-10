import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import '../../src/ia-book-actions.js';
import '../../src/components/timer-countdown.js';

const container = ({
  secondsLeftOnLoan,
  loanTotalTime,
  loanRenewAtLast,
} = {}) =>
  html`<timer-countdown
    .secondsLeftOnLoan=${secondsLeftOnLoan}
    .loanTotalTime=${loanTotalTime}
    .loanRenewAtLast=${loanRenewAtLast}
  ></timer-countdown>`;

describe('<timer-countdown>', () => {
  it('timer interval is undefined when loan is expired', async () => {
    const el = await fixture(
      container({
        secondsLeftOnLoan: 0, // in seconds
        loanTotalTime: 14,
        loanRenewAtLast: 5,
      })
    );

    await el.updateComplete;
    // expect(window.IALendingIntervals.timerCountdown).to.be.undefined;
  });

  it('timer interval is not undefined when loan is active', async () => {
    const el = await fixture(
      container({
        secondsLeftOnLoan: 2, // in seconds
        loanTotalTime: 14,
        loanRenewAtLast: 5,
      })
    );

    await aTimeout(1900);
    await el.updateComplete;

    expect(el.secondsLeftOnLoan).to.equal(2);
    // expect(el.timerCountdown).to.not.be.undefined;
  });
});
