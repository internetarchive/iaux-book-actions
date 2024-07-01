import { html, css, LitElement } from 'lit';

export default class TimerCountdown extends LitElement {
  static get properties() {
    return {
      secondsLeftOnLoan: { type: Number },
      displayTime: { type: Boolean },
    };
  }

  constructor() {
    super();

    this.secondsLeftOnLoan = 0;
    this.displayTime = false;
  }

  get minutesLeftOnLoan() {
    let timeLeft = Math.round(this.secondsLeftOnLoan);

    // convert time from second to minute
    timeLeft = Math.ceil(timeLeft / 60);

    if (timeLeft < 10) {
      timeLeft = `0:0${timeLeft}`;
    } else if (timeLeft === 60) {
      timeLeft = `1:00`;
    } else {
      timeLeft = `0:${timeLeft}`;
    }
    return timeLeft;
  }

  /**
   * get remaining time with timeunit
   *
   * @memberof TimerCountdown
   * @return string - minutes left
   */
  get remainingTime() {
    const unitOfTime = 'minute';
    const timeLeft = this.minutesLeftOnLoan;

    return timeLeft !== 1
      ? `${timeLeft} ${unitOfTime}s`
      : `${timeLeft} ${unitOfTime}`;
  }

  render() {
    const viewClass = this.displayTime ? 'view' : 'hide1';
    return html`
      <button
        id="timer-counter"
        class=${viewClass}
        @click=${() => {
          this.displayTime = !this.displayTime;
        }}
        role="timer"
      >
        <span>${this.minutesLeftOnLoan} - ${this.minutesLeftOnLoan * 60}</span>
        <span class="sr-only">${this.remainingTime} left</span>
      </button>
    `;
  }

  static get styles() {
    return css`
      :host {
        right: 0;
        margin-right: 10px;
        position: absolute;
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

      button#timer-counter {
        cursor: pointer;
      }

      .hide {
        opacity: 0;
      }

      .show {
        opacity: 1;
      }
    `;
  }
}

window.customElements.define('timer-countdown', TimerCountdown);
