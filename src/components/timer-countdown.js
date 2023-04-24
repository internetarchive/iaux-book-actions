import { html, css, LitElement } from 'lit';
import { sentryLogs } from '../core/config/sentry-events.js';

export default class TimerCountdown extends LitElement {
  static get properties() {
    return {
      secondsLeftOnLoan: { type: Number }, // in seconds
      loanTotalTime: { type: Number }, // in seconds
      loanRenewAtLast: { type: Number }, // in seconds
    };
  }

  constructor() {
    super();

    /**
     * seconds left in current loan
     * @type {number}
     */
    this.secondsLeftOnLoan = 0;

    /**
     * total seconds a loan does have
     * @type {number}
     */
    this.loanTotalTime = 0;

    /**
     * at the remaining time, we attempt to renew current loan
     * @type {number}
     */
    this.loanRenewAtLast = 0;

    /**
     * store time when timer is started
     * @type {string}
     */
    this.timeWhenTimerStart = '';

    /**
     * delay seconds in setInterval function
     * @type {number}
     */
    this.timerExecutionSeconds = 60;
  }

  disconnectedCallback() {
    window?.IALendingIntervals?.clearTimerCountdown();
  }

  firstUpdated() {
    this.timerCountdown();
  }

  updated(changed) {
    if (changed.has('secondsLeftOnLoan') && this.secondsLeftOnLoan > 0) {
      this.timerCountdown();
    }
  }

  timerCountdown() {
    this.disconnectedCallback();

    let secondsLeft = this.secondsLeftOnLoan;

    // store current time
    this.timeWhenTimerStart = new Date();

    /**
     * set interval in window object
     * @see ia-lending-intervals.js
     */
    window.IALendingIntervals.timerCountdown = setInterval(async () => {
      secondsLeft -= this.timerExecutionSeconds;
      secondsLeft = Math.round(secondsLeft); // round number

      // re-sync timer if gone off because of background window
      await this.reSyncTimerIfGoneOff(secondsLeft);

      /**
       * execute from last 10th minute to 0th minute
       * - 10th - to check if user has viewed
       * - till 0th - to show warning msg with remaining time to auto expired
       * @see IABookActions::bindLoanRenewEvents
       */
      if (secondsLeft <= this.loanRenewAtLast) {
        this.dispatchLoanRenewEvent(secondsLeft);
      }

      // clear interval in secondsLeft if less
      if (secondsLeft <= this.timerExecutionSeconds) {
        this.disconnectedCallback();
        window?.Sentry?.captureMessage(sentryLogs.clearOneHourTimer);
      }
    }, this.timerExecutionSeconds * 1000);
  }

  /**
   * dispatch loan renew attempt event
   *
   * @param {number} secondsLeft
   * @memberof TimerCountdown
   */
  dispatchLoanRenewEvent(secondsLeft) {
    this.dispatchEvent(
      new CustomEvent('IABookActions:loanRenew', {
        detail: {
          hasPageChanged: false,
          secondsLeft,
        },
        bubbles: true,
        composed: true,
      })
    );
  }

  /**
   * helper function to determine if timer is not in sync properly
   *
   * @param {number} timerSecondsLeft - actual seconds left get from setInterval
   *
   * @memberof TimerCountdown
   */
  async reSyncTimerIfGoneOff(timerSecondsLeft) {
    // debug info
    console.log(
      new Date().toLocaleTimeString(),
      'timeLeftInSec',
      timerSecondsLeft,
      ' ||| timeLeftInMin',
      Math.ceil(timerSecondsLeft / 60)
    );

    const currentTime = new Date();

    // current time - loan time
    const diffInSeconds =
      currentTime.getTime() / 1000 - this.timeWhenTimerStart.getTime() / 1000;

    const secondsShouldLeft = this.secondsLeftOnLoan - diffInSeconds;

    // convert in minutes
    const whatIsleft = Math.round(timerSecondsLeft);
    const whatShouldLeft = Math.round(secondsShouldLeft);

    if (whatIsleft !== whatShouldLeft) {
      // debug info
      console.log(
        `timer is gone off, let's re-sync, whatIsleft -> ${whatIsleft}, whatShouldLeft -> ${whatShouldLeft}`
      );
      this.secondsLeftOnLoan = secondsShouldLeft; // the seconds should left in timer again
    }
  }

  /**
   * get remaining time with timeunit
   *
   * @memberof TimerCountdown
   * @return string
   */
  get remainingTime() {
    const unitOfTime = 'minute';
    let timeLeft = Math.round(this.secondsLeftOnLoan);

    // convert time from second to minute
    timeLeft = Math.ceil(timeLeft / 60);

    return timeLeft !== 1
      ? `${timeLeft} ${unitOfTime}s`
      : `${timeLeft} ${unitOfTime}`;
  }

  render() {
    return html`
      <svg
        width="14"
        height="14"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="circle" cx="50" cy="50" r="50" />
      </svg>
      <span class="sr-only">${this.remainingTime} left</span>
    `;
  }

  static get styles() {
    const white = css`var(--white, #fff)`;
    const timerSecondsLeft = css`var(--secondsLeftOnLoan, 6000s)`; //
    const timerStrokeLeft = css`var(--strokeLeftOnLoan, 315)`;

    return css`
      :host {
        right: 0;
        margin-right: 10px;
        position: absolute;
        height: 20px;
        width: 20px;
      }

      @keyframes circletimer {
        0% {
          stroke-dashoffset: ${timerStrokeLeft};
          stroke-dasharray: 315;
        }
        100% {
          stroke-dashoffset: 0;
          stroke-dasharray: 315;
        }
      }

      svg {
        background-color: ${white};
        border-radius: 50px;
        border: 2px solid ${white};
        transform: rotateZ(-90deg);
      }

      svg .circle {
        stroke: #000;
        stroke-width: 100px;
        fill: ${white};
        stroke-dashoffset: 315;
        stroke-dasharray: 0;
        animation: ${timerSecondsLeft} circletimer linear;
      }

      .sr-only {
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        margin: 0;
        padding: 0;
        border: none;
        overflow: hidden;
      }
    `;
  }
}

window.customElements.define('timer-countdown', TimerCountdown);
