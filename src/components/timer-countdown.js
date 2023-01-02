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
        this.dispatchEvent(
          new CustomEvent('IABookActions:loanRenew', {
            detail: {
              isPageChanged: false,
            },
            bubbles: true,
            composed: true,
          })
        );
      }

      if (this.time === 0) clearInterval(this.timerInterval);
    }, 1000);
  }

  render() {
    return html`<div id="countdown">
      <div id="countdown-number">${Math.round(this.time)}</div>
      <svg>
        <circle r="18" cx="20" cy="20"></circle>
      </svg>
    </div>`;
  }

  static get styles() {
    return css`
      :host {
        right: 5px;
        font-size: 14px;
        position: absolute;
      }

      #countdown-number {
        color: white;
        display: inline-block;
        line-height: 40px;
        margin-right: 12px;
      }

      svg {
        position: absolute;
        top: 0;
        right: 0;
        width: 40px;
        height: 40px;
        transform: rotateY(-180deg) rotateZ(-90deg);
      }

      svg circle {
        stroke-dasharray: 113px;
        stroke-dashoffset: 0px;
        stroke-linecap: round;
        stroke-width: 3px;
        stroke: white;
        fill: none;
        animation: countdown 60s linear infinite forwards;
      }

      @keyframes countdown {
        from {
          stroke-dashoffset: 0px;
        }
        to {
          stroke-dashoffset: 113px;
        }
      }

      .hidden {
        display: none;
      }
      .visible {
        display: inline-block;
      }
    `;
  }
}

window.customElements.define('timer-countdown', TimerCountdown);
