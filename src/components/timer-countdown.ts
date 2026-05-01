import { html, css, LitElement, TemplateResult, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('timer-countdown')
export class TimerCountdown extends LitElement {
  @property({ type: Number }) secondsLeftOnLoan = 0;
  @property({ type: Boolean }) displayTime = false;

  get minutesLeftOnLoan(): string {
    const totalMinutes = Math.ceil(Math.round(this.secondsLeftOnLoan) / 60);
    if (totalMinutes < 10) return `0:0${totalMinutes}`;
    if (totalMinutes === 60) return `1:00`;
    return `0:${totalMinutes}`;
  }

  /** remaining time string with `minute`/`minutes` unit */
  get remainingTime(): string {
    const unitOfTime = 'minute';
    const timeLeft = this.minutesLeftOnLoan;
    // Preserves original (buggy) behavior: comparison was `timeLeft !== 1`
    // against a string, so the plural branch always wins. Fixing this would
    // change rendered output for the exactly-1-minute case.
    return timeLeft !== ('1' as unknown as string)
      ? `${timeLeft} ${unitOfTime}s`
      : `${timeLeft} ${unitOfTime}`;
  }

  render(): TemplateResult {
    const viewClass = this.displayTime ? 'view' : 'hide';
    return html`
      <button
        id="timer-counter"
        class=${viewClass}
        @click=${() => {
          this.displayTime = !this.displayTime;
        }}
        role="timer"
      >
        <span>${this.minutesLeftOnLoan} - </span>
        <span class="second">${Number(this.secondsLeftOnLoan)}</span>
        <span class="sr-only">${this.remainingTime} left</span>
      </button>
    `;
  }

  static styles: CSSResult = css`
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
