import { html, css, LitElement } from 'lit';
import { sentryLogs } from '../core/config/sentry-events.js';

export default class TimerCountdown extends LitElement {
  static get properties() {
    return {
      secondsLeftOnLoan: { type: Number }, // in seconds
      loanRenewAtLast: { type: Number }, // in seconds
      isDevBox: { type: Boolean },
    };
  }

  constructor() {
    super();

    /**
     * seconds left in current time
     * @type {number}
     */
    this.secondsLeftOnLoan = 0;

    /**
     * at the remaining time, we attempt to renew current loan
     * @type {number}
     */
    this.loanRenewAtLast = 0;

    /**
     * @type {boolean}
     */
    this.isDevBox = false;

    // private props
    this.timerInterval = undefined;
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
    // in-case of isDevBox, execute timer in each second instead of 60
    const timerIntervalSeconds = this.isDevBox ? 1 : 60;

    this.timerInterval = setInterval(() => {
      // if this.isDevBox, just reduce seconds by 1 instead of 60 (1 min)
      this.secondsLeftOnLoan -= timerIntervalSeconds;
      const secondsLeft = Math.round(this.secondsLeftOnLoan);

      // execute from last 10th minute to 0th minute
      // - 10th - to check if user has viewed
      // - till 0th - to show warning msg with remaining time to auto expired
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
    }, timerIntervalSeconds * 1000);
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

    if (this.isDevBox) {
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
