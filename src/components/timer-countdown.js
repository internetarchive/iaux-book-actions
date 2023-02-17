import { html, css, LitElement } from 'lit';

export default class TimerCountdown extends LitElement {
  static get properties() {
    return {
      timeLeftOnLoan: { type: Number },
      loanRenewConfig: { type: Object },
    };
  }

  constructor() {
    super();
    this.timeLeftOnLoan = 0;
    this.loanRenewConfig = {};

    // private props
    this.timerInterval = undefined;
  }

  disconnectedCallback() {
    clearInterval(this.timerInterval);
  }

  updated(changed) {
    if (changed.has('timeLeftOnLoan') && this.timeLeftOnLoan > 0) {
      clearInterval(this.timerInterval);
      this.timerCountdown();
    }
  }

  timerCountdown() {
    // execute interval in each second in-case of dev environment
    this.timerInterval = setInterval(
      () => {
        this.timeLeftOnLoan -= this.loanRenewConfig.env === 'dev' ? 1 : 60;

        // execute from last 10th minute to 0th minute
        // - 10th - to check if user has viewed
        // - till 0th - to show warning msg with remaining time to auto returned
        if (
          Math.round(this.timeLeftOnLoan) <= this.loanRenewConfig.autoCheckAt
        ) {
          this.dispatchEvent(
            new CustomEvent('IABookActions:loanRenew', {
              detail: {
                hasPageChanged: false,
                timeLeft: Math.round(this.timeLeftOnLoan),
              },
              bubbles: true,
              composed: true,
            })
          );
        }

        // clear interval if timer is < this.loanRenewConfig.autoCheckAt
        if (this.timeLeftOnLoan < this.loanRenewConfig.autoCheckAt) {
          clearInterval(this.timerInterval);
        }
      },
      this.loanRenewConfig.env === 'dev' ? 1000 : 60000
    );
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
      <span>${Math.round(this.timeLeftOnLoan)}</span>
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
