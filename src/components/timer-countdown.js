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

      // execute 50th minute check
      if (Math.round(this.time) === this.autoCheckAt) {
        // cldar at here and < 10...
        this.dispatchEvent(
          new CustomEvent('IABookActions:loanRenew', {
            detail: {
              hasPageChanged: false,
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
        width="30"
        height="30"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="circle" cx="50" cy="50" r="50" />
      </svg>
      <span>${Math.round(this.time)}</span>
    `;
  }

  static get styles() {
    const white = css`var(--white, #fff)`;
    const secondsLeft = css`var(--secondsLeft, 60s)`;

    return css`
      :host {
        right: 5px;
        font-size: 14px;
        position: absolute;
      }

      @keyframes circletimer {
        0% {
          stroke-dashoffset: 320;
          stroke-dasharray: 320;
        }
        100% {
          stroke-dashoffset: 0;
          stroke-dasharray: 320;
        }
      }

      svg {
        background-color: transparent;
        position: absolute;
        top: 50%;
        right: 0;
        border-radius: 50px;
        border: 2px solid ${white};
        transform: translate(-50%, -50%) rotateZ(-90deg);
      }

      svg .circle {
        stroke: ${white};
        stroke-width: 100px;
        fill: transparent;
        stroke-dashoffset: 320;
        stroke-dasharray: 0;
        animation: ${secondsLeft} circletimer linear;
      }
    `;
  }
}

window.customElements.define('timer-countdown', TimerCountdown);
