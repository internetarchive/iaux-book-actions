import { html, css, LitElement } from 'lit';

export default class TimerCountdown extends LitElement {
  static get properties() {
    return {
      time: { type: Number },
      autoCheckAt: { type: Number },
    };
  }

  constructor() {
    super();
    this.time = 0;
    this.autoCheckAt = 0;

    // private props
    this.timerInterval = undefined;
  }

  disconnectedCallback() {
    clearInterval(this.timerInterval);
  }

  updated(changed) {
    if (changed.has('time') && this.time > 0) {
      clearInterval(this.timerInterval);
      this.timerCountdown();
    }
  }

  timerCountdown() {
    this.timerInterval = setInterval(() => {
      this.time -= 1;

      // execute from last 10th minute to 0th minute
      // - 10th - to check if user has viewed
      // - till 0th - to show warning msg with remaining time to auto returned
      if (Math.round(this.time) <= this.autoCheckAt) {
        this.dispatchEvent(
          new CustomEvent('IABookActions:loanRenew', {
            detail: {
              hasPageChanged: false,
              timeLeft: Math.round(this.time),
            },
            bubbles: true,
            composed: true,
          })
        );
      }

      // clear interval if timer is < this.autoCheckAt
      if (this.time < this.autoCheckAt) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
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
    `;
  }

  static get styles() {
    const white = css`var(--white, #fff)`;
    const timerSecondsLeft = css`var(--timerSeconds, 6000s)`;
    const timerStrokeLeft = css`var(--timerStroke, 315)`;

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
    `;
  }
}

window.customElements.define('timer-countdown', TimerCountdown);
