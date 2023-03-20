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
     * setInterval executed interval
     * @type {number}
     */
    this.timerInterval = undefined;

    /**
     * delay seconds in setInterval function
     * @type {number}
     */
    this.timerExecutionSeconds = 0;
  }

  disconnectedCallback() {
    clearInterval(this.timerInterval);
  }

  updated(changed) {
    if (changed.has('secondsLeftOnLoan') && this.secondsLeftOnLoan > 0) {
      clearInterval(this.timerInterval);
      this.timerCountdown();
    }
  }

  timerCountdown() {
    // Just a QA thing-
    // if `this.loanTotalTime` less then 600 Seconds (10min)
    // - let just execute setInterval in each second
    // - otherwise execute in 60 seconds
    const timerExecutionSeconds = this.loanTotalTime <= 600 ? 1 : 60;

    this.timerInterval = setInterval(() => {
      this.secondsLeftOnLoan -= timerExecutionSeconds;
      const secondsLeft = Math.round(this.secondsLeftOnLoan);

      /**
       * execute from last 10th minute to 0th minute
       * - 10th - to check if user has viewed
       * - till 0th - to show warning msg with remaining time to auto expired
       * @see IABookActions::bindLoanRenewEvents
       */
      if (secondsLeft <= this.loanRenewAtLast) {
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

      // clear interval
      if (secondsLeft <= 1) {
        clearInterval(this.timerInterval);
        window?.Sentry?.captureMessage(sentryLogs.clearOneHourTimer);
      }
    }, timerExecutionSeconds * 1000);
  }

  /**
   * get remaining time with timeunit
   *
   * @memberof TimerCountdown
   * @return string
   */
  get remainingTime() {
    let unitOfTime = 'second';
    let timeLeft = Math.round(this.secondsLeftOnLoan);

    if (this.loanTotalTime <= 600) {
      return `${timeLeft} seconds`;
    }

    if (timeLeft > 60) {
      unitOfTime = 'minute';
      timeLeft = Math.floor(timeLeft / 60);
    }

    return timeLeft !== 1
      ? `${timeLeft} ${unitOfTime}s`
      : `${timeLeft} ${unitOfTime}`;
  }

  render() {
    return html`
      <svg
        width="16"
        height="16"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="circle" cx="50" cy="50" r="50" />
      </svg>
      <span class="sr-only">${this.remainingTime}</span>
      <span>${this.remainingTime}</span>
    `;
  }

  static get styles() {
    const white = css`var(--white, #fff)`;
    const timerSecondsLeft = css`var(--secondsLeftOnLoan, 6000s)`; //
    const timerStrokeLeft = css`var(--strokeLeftOnLoan, 315)`;

    return css`
      :host {
        right: 5px;
        position: absolute;
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
