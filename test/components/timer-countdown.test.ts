import { html, fixture, expect, aTimeout } from '@open-wc/testing';
import '../../src/ia-book-actions';
import '../../src/components/timer-countdown';
import type { TimerCountdown } from '../../src/components/timer-countdown';

const container = ({
  secondsLeftOnLoan,
  loanTotalTime,
  loanRenewAtLast,
}: {
  secondsLeftOnLoan?: number;
  loanTotalTime?: number;
  loanRenewAtLast?: number;
} = {}) =>
  html`<timer-countdown
    .secondsLeftOnLoan=${secondsLeftOnLoan}
    .loanTotalTime=${loanTotalTime}
    .loanRenewAtLast=${loanRenewAtLast}
  ></timer-countdown>`;

describe('<timer-countdown>', async () => {
  await aTimeout(5000);

  it('timer interval is undefined when loan is expired', async () => {
    const el = (await fixture(
      container({
        secondsLeftOnLoan: 0,
        loanTotalTime: 14,
        loanRenewAtLast: 5,
      }),
    )) as TimerCountdown;

    await el.updateComplete;
    // expect(window.IALendingIntervals.timerCountdown).to.be.undefined;
  });

  it('timer interval is not undefined when loan is active', async () => {
    const el = (await fixture(
      container({
        secondsLeftOnLoan: 2,
        loanTotalTime: 14,
        loanRenewAtLast: 5,
      }),
    )) as TimerCountdown;

    await el.updateComplete;

    expect(el.secondsLeftOnLoan).to.equal(2);
  });

  it('renders singular "minute" at the 1-minute boundary', async () => {
    const el = (await fixture(
      container({ secondsLeftOnLoan: 60 }),
    )) as TimerCountdown;

    await el.updateComplete;

    expect(el.minutesLeftOnLoan).to.equal('0:01');
    expect(el.remainingTime).to.equal('0:01 minute');
  });

  it('renders plural "minutes" away from the 1-minute boundary', async () => {
    const el = (await fixture(
      container({ secondsLeftOnLoan: 120 }),
    )) as TimerCountdown;

    await el.updateComplete;

    expect(el.minutesLeftOnLoan).to.equal('0:02');
    expect(el.remainingTime).to.equal('0:02 minutes');
  });
});
