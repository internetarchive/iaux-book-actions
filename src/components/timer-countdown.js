import { html, css, LitElement } from 'lit';

export default class TimerCountdown extends LitElement {
  static get properties() {
    return {
      secondsLeftOnLoan: { type: Number }, // in seconds
    };
  }

  constructor() {
    super();

    /**
     * seconds left in current loan
     * @type {number}
     */
    this.secondsLeftOnLoan = 0;
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
