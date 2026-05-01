import {
  html,
  css,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import { ModalConfig } from '@internetarchive/modal-manager';
import { LocalCache } from '@internetarchive/local-cache';

import './components/collapsible-action-group';
import './components/book-title-bar';
import './components/text-group';
import './components/info-icon';
import './components/timer-countdown';
import './core/config/ia-lending-intervals';

import { GetLendingActions } from './core/services/get-lending-actions';
import { mobileContainerWidth } from './core/config/constants';
import { sentryLogs } from './core/config/sentry-events';
import { LoanTokenPoller } from './core/services/loan-token-poller';
import { LoanRenewHelper } from './core/services/loan-renew-helper';
import log from './core/services/log';
import { URLHelper } from './core/config/url-helper';

import type {
  ActionButtonConfig,
  BorrowType,
  LendingStatus,
  LoanRenewResult,
  LoanRenewTimeConfig,
} from './core/types/lending-status';
import './core/types/globals';
import type { TimerCountdown } from './components/timer-countdown';

export const events = {
  browseExpired: 'IABookReader:BrowsingHasExpired',
} as const;

/**
 * Inline button styling for modal-manager dialogs. The modal-manager
 * doesn't (yet) understand `ia-button` classes, so we inline the rules.
 * TODO: let modal-manager render `ia-button`-classed buttons natively.
 */
export const modalButtonStyle = {
  iaButton:
    'min-height:3.5rem;cursor:pointer;color:white;border-radius:0.4rem;border:1px solid #c5d1df;padding:4px 8px;width:auto;user-select:none;',
  renew: 'background:#194880;width:110px;',
  return: 'background:#d9534f;width:120px;',
  loaderIcon:
    'display:inline-block;width:20px;height:20px;margin-top:2px;color:white;--activityIndicatorLoadingRingColor:#fff;--activityIndicatorLoadingDotColor:#fff;',
  refresh:
    'background:none;font-size:inherit;border:0;padding:0;color:#0000ee;cursor:pointer;text-decoration:underline',
} as const;

interface ModalManagerLike extends HTMLElement {
  customModalContent?: unknown;
  closeModal(): void;
  showModal(opts: {
    config: ModalConfig;
    customModalContent?: unknown;
  }): Promise<void>;
}

@customElement('ia-book-actions')
export default class IABookActions extends LitElement {
  @property({ type: String }) userid = '';
  @property({ type: String }) identifier = '';
  @property({ type: String }) bookTitle = '';
  @property({ type: Object }) lendingStatus: LendingStatus = {};
  @property({ type: String }) returnUrl = '';
  @property({ type: Number }) width = 0;
  @property({ type: String }) bwbPurchaseUrl = '';
  @property({ attribute: false }) lendingBarPostInit: () => void = () => {};
  @property({ type: String }) barType: 'action' | 'title' = 'action';
  @property({ attribute: false }) sharedObserver?: SharedResizeObserver;
  @property({ type: Boolean }) disableActionGroup = false;
  @property({ type: Number }) tokenDelay = 120;
  @property({ type: Number }) timerExecutionSeconds = 30;
  @property({ type: Object }) localCache?: LocalCache;
  @property({ type: Object }) loanRenewTimeConfig: LoanRenewTimeConfig = {
    loanTotalTime: 3600, // 1 hour
    loanRenewAtLast: 660, // 11 minutes
    pageChangedInLast: 900, // 15 minutes
  };
  @property({ type: Object }) loanRenewResult: LoanRenewResult = {
    texts: '',
    renewNow: false,
    secondsLeft: 0,
    renewType: '',
  };

  @state() postInitComplete = false;
  @state() primaryActions: Array<ActionButtonConfig | null> = [];
  @state() primaryTitle = '';
  @state() primaryColor = 'primary';
  @state() secondaryActions: Array<ActionButtonConfig | null> = [];
  lendingOptions?: GetLendingActions;
  borrowType: BorrowType = null;
  timeWhenTimerStart?: Date;
  returnNow = false;
  loanRenewHelper?: LoanRenewHelper;
  tokenPoller?: LoanTokenPoller;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window?.IALendingIntervals?.clearAll();
    this.sentryCaptureMsg(sentryLogs.disconnectedCallback);
    this.disconnectResizeObserver();
  }

  /** send log messages to sentry */
  sentryCaptureMsg(msg: string): void {
    log(window?.Sentry);
    window?.Sentry?.captureMessage(msg);
  }

  firstUpdated(): void {
    this.bindLoanRenewEvents();

    this.localCache = new LocalCache({
      namespace: 'loanRenew',
    });

    if (!this.sharedObserver) {
      this.sharedObserver = new SharedResizeObserver();
      this.setupResizeObserver();
    }
  }

  updated(changed: PropertyValues<this>): void {
    if (changed.has('lendingStatus') || changed.has('bwbPurchaseUrl')) {
      this.setupLendingToolbarActions();
    }

    if (changed.has('sharedObserver')) {
      this.disconnectResizeObserver();
      this.setupResizeObserver();
    }

    if (changed.has('loanRenewResult') && this.loanRenewResult.renewNow) {
      window.IALendingIntervals?.clearAll();
    }
  }

  /** SharedObserver resize handler */
  handleResize(entry: ResizeObserverEntry): void {
    const { target } = entry;
    if (target !== this.shadowRoot?.host) return;

    const { contentRect } = entry;
    this.width = Math.round(contentRect.width);
  }

  disconnectResizeObserver(): void {
    if (!this.shadowRoot) return;
    this.sharedObserver?.removeObserver({
      handler: this,
      target: this.shadowRoot.host as Element,
    });
  }

  setupResizeObserver(): void {
    if (!this.shadowRoot) return;
    this.sharedObserver?.addObserver({
      handler: this,
      target: this.shadowRoot.host as Element,
    });
  }

  async setupLendingToolbarActions(): Promise<void> {
    this.lendingOptions = new GetLendingActions(
      this.userid,
      this.identifier,
      this.lendingStatus,
      this.bwbPurchaseUrl,
    );
    const actions = this.lendingOptions.getCurrentLendingActions();
    if (!actions) return;

    this.primaryTitle = actions.primaryTitle;
    this.primaryActions = actions.primaryActions?.filter(
      action => action != null,
    );
    this.primaryColor = actions.primaryColor ?? 'primary';
    this.secondaryActions = actions.secondaryActions?.filter(
      action => action != null,
    );

    this.borrowType = actions.borrowType ?? null;

    const hasExpired =
      'browsingExpired' in this.lendingStatus &&
      !!this.lendingStatus?.browsingExpired;
    if (hasExpired) {
      log('setupLendingToolbarActions > hasExpired --- ');

      if (!this.tokenPoller) {
        this.sentryCaptureMsg(sentryLogs.bookWasExpired);
      }
      window?.IALendingIntervals?.clearAll();

      this.dispatchEvent(
        new Event(events.browseExpired, {
          bubbles: true,
          cancelable: false,
          composed: true,
        }),
      );
      return;
    }

    if (this.borrowType === 'browsed') {
      await this.startTimerCountdown();
      await this.startBrowseTimer();
    }

    if (!this.borrowType || this.barType === 'title') {
      this.lendingBarPostInit();
      return;
    }

    /**
     * tokenPoller determines if user has loan token for this book
     * - if book is going to renew, need to wait until renew is completed
     */
    setTimeout(() => {
      if (!hasExpired && !window.IALendingIntervals?.tokenPoller) {
        this.startLoanTokenPoller();
      }
    }, 100);

    this.requestUpdate();
  }

  /**
   * Bind events that drive the 1-hour auto-renew flow:
   *  1. `BookReader:userAction` — fired by BookReader on page interactions
   *  2. `visibilitychange` — re-syncs timer when tab returns to foreground
   */
  bindLoanRenewEvents(): void {
    window.addEventListener('BookReader:userAction', () => {
      log('IABookActions:BookReader:userAction');
      if (this.borrowType === 'browsed') {
        this.autoLoanRenewChecker(true);
      }
    });

    document.addEventListener('visibilitychange', async () => {
      if (!document.hidden) {
        log(
          'visibilitychange event execute:------------------ ',
          new Date().getMinutes(),
          new Date().getSeconds(),
          this.borrowType,
        );

        if (
          this.borrowType === 'browsed' &&
          this.lendingStatus.browsingExpired === false
        ) {
          const loanTime = await this.localCache?.get(
            `${this.identifier}-loanTime`,
          );

          const secondsLeft = Math.round(
            ((loanTime as Date | undefined)?.getTime?.() ?? 0) / 1000 -
              new Date().getTime() / 1000,
          );

          if (secondsLeft >= this.timerExecutionSeconds) {
            this.loanStatusCheckInterval(Number(secondsLeft));
          } else {
            this.browseHasExpired();
            this.disconnectedCallback();
          }
        }
      }
    });
  }

  /** Determine whether a browsed book should be renewed. @see LoanRenewHelper */
  async autoLoanRenewChecker(hasPageChanged = false): Promise<void> {
    if (!this.localCache) return;
    this.loanRenewHelper = new LoanRenewHelper(
      hasPageChanged,
      this.identifier,
      this.localCache,
      this.loanRenewTimeConfig,
    );

    await this.loanRenewHelper.handleLoanRenew();
    this.loanRenewResult = this.loanRenewHelper.result;
  }

  /** Required as sibling on page (the lending UI shares it). */
  get modal(): ModalManagerLike | null {
    const modalOnDom = document.body.querySelector(
      'modal-manager',
    ) as ModalManagerLike | null;
    modalOnDom?.setAttribute('id', 'action-bar-modal');
    return modalOnDom;
  }

  /** Show the warning modal asking if the user is still reading. */
  async showWarningModal(): Promise<void> {
    log('****** showWarningModal ******');
    if (this.modal) this.modal.customModalContent = nothing;
    this.modal?.closeModal();
    this.loanRenewResult = { texts: '', renewNow: false };

    let { secondsLeft } = this.loanRenewResult;
    if (secondsLeft === undefined) {
      secondsLeft = this.lendingStatus.secondsLeftOnLoan as number | undefined;
    } else {
      secondsLeft = secondsLeft > 60 ? secondsLeft : 60;
    }

    const config = new ModalConfig({
      headline: html`Are you still reading?`,
      headerColor: '#194880',
      showCloseButton: false,
      closeOnBackdropClick: false,
      message: html`${this.loanRenewHelper?.getMessageTexts(
        this.loanRenewResult.texts,
        secondsLeft ?? 0,
      )}`,
    });

    const customModalContent = html`<br />
      <div
        id="book-action-bar-custom-buttons"
        style="display:flex;justify-content:center;"
      >
        <button
          style="${modalButtonStyle.iaButton} ${modalButtonStyle.renew}"
          @click=${() => this.patronWantsToRenewBook()}
        >
          Keep reading
        </button>
        <button
          style="${modalButtonStyle.iaButton} ${modalButtonStyle.return}"
          @click=${() => this.patronWantsToReturnBook()}
        >
          Return the book
        </button>
      </div> `;

    this.modal?.setAttribute('aria-live', 'assertive');
    await this.modal?.showModal({ config, customModalContent });
  }

  async showWarningDisabledModal(
    buttonToDisable: 'renewBook' | 'returnBook' = 'renewBook',
  ): Promise<void> {
    let { secondsLeft } = this.loanRenewResult;
    if (secondsLeft === undefined) {
      secondsLeft = this.lendingStatus.secondsLeftOnLoan as number | undefined;
    } else {
      secondsLeft = secondsLeft > 60 ? secondsLeft : 60;
    }

    const config = new ModalConfig({
      headline: html`Are you still reading?`,
      headerColor: '#194880',
      showCloseButton: false,
      closeOnBackdropClick: false,
      message: html`${this.loanRenewHelper?.getMessageTexts(
        this.loanRenewResult.texts,
        secondsLeft ?? 0,
      )}`,
    });

    const customModalContent = html`<br />
      <div
        id="disabled-book-action-bar-custom-buttons"
        style="display:flex;justify-content:center; opacity:0.8; pointer-events:none;"
      >
        <button
          disabled
          style="${modalButtonStyle.iaButton} ${modalButtonStyle.renew}"
        >
          ${buttonToDisable === 'renewBook'
            ? html`<ia-activity-indicator
                mode="processing"
                style=${modalButtonStyle.loaderIcon}
              ></ia-activity-indicator>`
            : 'Keep reading'}
        </button>
        <span
          style="position: absolute; visibility: none; height: 1px; width: 1px; overflow: hidden;"
          >Renewing loan, one moment please.</span
        >
        <button
          disabled
          style="${modalButtonStyle.iaButton} ${modalButtonStyle.return}"
        >
          ${buttonToDisable === 'returnBook'
            ? html`<ia-activity-indicator
                mode="processing"
                style=${modalButtonStyle.loaderIcon}
              ></ia-activity-indicator>`
            : 'Return the book'}
        </button>
      </div> `;

    await this.modal?.showModal({ config, customModalContent });
  }

  /** Renew action in warning modal */
  async patronWantsToRenewBook(): Promise<void> {
    this.showWarningDisabledModal();
    this.loanRenewResult = { texts: '', renewNow: true, renewType: 'manual' };
  }

  async patronWantsToReturnBook(): Promise<void> {
    this.showWarningDisabledModal('returnBook');
    const el = document.querySelector(
      'ia-book-actions',
    ) as IABookActions | null;
    if (el) el.disableActionGroup = true;
    this.returnNow = true;
  }

  /** Show modal when book is auto returned. */
  async showExpiredModal(): Promise<void> {
    const config = new ModalConfig({
      headline: html``,
      showCloseButton: false,
      closeOnBackdropClick: false,
      headerColor: '#194880',
      message: html`This book has been returned due to inactivity.`,
    });

    const customModalContent = html`<br />
      <div style="text-align: center">
        <button
          style="${modalButtonStyle.iaButton} ${modalButtonStyle.renew}"
          @click=${() => {
            URLHelper.goToUrl(this.returnUrl, true);
          }}
        >
          Okay
        </button>
      </div> `;

    await this.modal?.showModal({ config, customModalContent });
  }

  /** Execute when loan is expired */
  async browseHasExpired(): Promise<void> {
    log('BrowseHasExpired ---');
    window?.IALendingIntervals?.clearAll();

    const currStatus: LendingStatus = {
      ...this.lendingStatus,
      browsingExpired: true,
      secondsLeftOnLoan: 0,
    };
    this.lendingStatus = currStatus;

    await this.localCache?.delete(`${this.identifier}-loanTime`);
    await this.localCache?.delete(`${this.identifier}-pageChangedTime`);

    this.loanRenewResult.renewNow = false;
    this.loanRenewResult.texts =
      'This book has been returned due to inactivity.';

    await this.showExpiredModal();

    this.sentryCaptureMsg(sentryLogs.browseHasExpired);
  }

  async startBrowseTimer(): Promise<void> {
    window?.IALendingIntervals?.clearBrowseExpireTimeout();

    const browsingExpired = this.lendingStatus.browsingExpired;
    const user_has_browsed = this.lendingStatus.user_has_browsed;
    const secondsLeftOnLoan =
      (this.lendingStatus.secondsLeftOnLoan as number) ?? 0;

    if (!user_has_browsed || browsingExpired) {
      log('startBrowseTimer --- !user_has_browsed || browsingExpired', {
        user_has_browsed,
        browsingExpired,
        secondsLeftOnLoan,
      });
      return;
    }

    if (window.IALendingIntervals) {
      window.IALendingIntervals.browseExpireTimeout = setTimeout(() => {
        log(
          'startBrowseTimer > browseExpireTimeout --- will expire loan',
          secondsLeftOnLoan,
        );
        this.browseHasExpired();
      }, secondsLeftOnLoan * 1000);
    }
  }

  render(): TemplateResult {
    if (this.barType === 'title') {
      return html`<section class="lending-wrapper">
        ${this.bookTitleBar}
      </section>`;
    }

    return html`<section class="lending-wrapper">
      ${this.bookActionBar}
    </section>`;
  }

  get bookTitleBar(): TemplateResult {
    return html`<book-title-bar
      .identifier=${this.identifier}
      .bookTitle=${this.bookTitle}
    ></book-title-bar>`;
  }

  get timerCountdownEl(): TimerCountdown | null {
    return (
      (this.shadowRoot?.querySelector(
        'timer-countdown',
      ) as TimerCountdown | null) ?? null
    );
  }

  get bookActionBar(): TemplateResult {
    return html`
      <collapsible-action-group
        .userid=${this.userid}
        .identifier=${this.identifier}
        .primaryColor=${this.primaryColor}
        .primaryActions=${this.primaryActions}
        .secondaryActions=${this.secondaryActions}
        .width=${this.width}
        .borrowType=${this.borrowType}
        .returnUrl=${this.returnUrl}
        .localCache=${this.localCache}
        .loanTotalTime=${this.loanRenewTimeConfig.loanTotalTime}
        .loanRenewType=${this.loanRenewResult.renewType ?? ''}
        ?hasAdminAccess=${this.hasAdminAccess}
        ?disabled=${this.disableActionGroup}
        ?autoRenew=${this.loanRenewResult.renewNow}
        ?autoReturn=${!!this.lendingStatus.browsingExpired}
        ?returnNow=${this.returnNow}
        @loanAutoRenewed=${this.handleLoanAutoRenewed}
        @lendingActionError=${this.handleLendingActionError}
        @toggleActionGroup=${this.handleToggleActionGroup}
      >
      </collapsible-action-group>
      ${this.textGroupTemplate} ${this.infoIconTemplate}
      <timer-countdown
        .secondsLeftOnLoan=${Math.round(
          Number(this.lendingStatus.secondsLeftOnLoan),
        )}
      ></timer-countdown>
    `;
  }

  /**
   * Execute after auto loan renewed is completed.
   * - show success message, refresh remaining time, reset timer state.
   */
  async handleLoanAutoRenewed(event: Event): Promise<void> {
    const detail = (event as CustomEvent).detail as
      | { data?: { loan?: unknown; error?: string } }
      | undefined;
    const activeLoan = detail?.data?.loan;
    const errorMessage = `Whoops, seems we hit a hiccup with renewing this book. Please refresh & retry. --- (Debug: ${detail?.data?.error})`;
    if (!activeLoan) {
      this.showErrorModal(errorMessage, 'handleLoanAutoRenewed');
      return;
    }

    if (this.loanRenewResult.renewNow) {
      const loanTime = await this.localCache?.get(
        `${this.identifier}-loanTime`,
      );

      const secondsLeft = Math.round(
        (((loanTime as Date | undefined)?.getTime?.() ?? 0) -
          new Date().getTime()) /
          1000,
      );
      log(loanTime, secondsLeft);

      log('IABookActions: handleLoanAutoRenewed --- ', {
        ajaxResponse: detail?.data,
        loanRenewResult: this.loanRenewResult,
        secondsLeftOnLoan: secondsLeft,
      });

      const currStatus: LendingStatus = {
        ...this.lendingStatus,
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: secondsLeft,
      };
      this.lendingStatus = currStatus;

      this.modal?.closeModal();
      this.modal?.removeAttribute('id');
      if (this.modal) this.modal.customModalContent = nothing;
      this.sentryCaptureMsg(sentryLogs.bookHasRenewed);
    }
  }

  /** start timer countdown interval after loan auto-renewed */
  async startTimerCountdown(): Promise<void> {
    window?.IALendingIntervals?.clearTimerCountdown();

    const secondsLeft = Number(this.lendingStatus.secondsLeftOnLoan);
    this.timeWhenTimerStart = new Date();

    if (window.IALendingIntervals) {
      window.IALendingIntervals.timerCountdown = setInterval(async () => {
        await this.loanStatusCheckInterval(secondsLeft);
      }, this.timerExecutionSeconds * 1000);
    }
  }

  /**
   * Tick-handler for the loan timer:
   *  - resync if the timer drifted (e.g. backgrounded tab)
   *  - try auto-renew during the last 10 minutes
   *  - clear the interval when seconds left ≤ executionSeconds
   */
  async loanStatusCheckInterval(secondsLeftOnLoan: number): Promise<void> {
    let secondsLeft = secondsLeftOnLoan;
    secondsLeft -= this.timerExecutionSeconds;
    secondsLeft = Math.round(secondsLeft);

    const resyncd = await this.reSyncTimerIfGoneOff(secondsLeft);

    if (resyncd.hasSynced) {
      secondsLeft = resyncd.whatShouldLeft;
      log('startTimerCountdown --- stale, timer has resyncd', { secondsLeft });
    }

    log(
      'startTimerCountdown --- countdown still valid. continue...',
      {
        resyncd,
        secondsLeft,
        loanRenewAtLast: this.loanRenewTimeConfig.loanRenewAtLast,
      },
      'time: ',
      new Date().getMinutes(),
      ':',
      new Date().getSeconds(),
      ', timerDelay: ',
      this.timerExecutionSeconds,
    );

    if (secondsLeft <= this.loanRenewTimeConfig.loanRenewAtLast) {
      await this.loanRenewAttempt(secondsLeft);
    }

    if (secondsLeft <= this.timerExecutionSeconds) {
      this.disconnectedCallback();
      this.sentryCaptureMsg(sentryLogs.clearOneHourTimer);
    }
  }

  /**
   * Helper to detect timer drift after a backgrounded tab returns.
   * @returns { hasSynced, whatShouldLeft }
   */
  async reSyncTimerIfGoneOff(
    timerSecondsLeft: number,
  ): Promise<{ hasSynced: boolean; whatShouldLeft: number }> {
    const currentTime = new Date();
    const startTime = this.timeWhenTimerStart ?? new Date();

    const diffInSeconds =
      currentTime.getTime() / 1000 - startTime.getTime() / 1000;

    const secondsShouldLeft =
      ((this.lendingStatus.secondsLeftOnLoan as number) ?? 0) - diffInSeconds;

    log('currentTime: ', currentTime);
    log('timeWhenTimerStart: ', this.timeWhenTimerStart);
    log('diffInSeconds: ', diffInSeconds);
    log('secondsShouldLeft: ', secondsShouldLeft);
    log(
      'this.lendingStatus.secondsLeftOnLoan: ',
      this.lendingStatus.secondsLeftOnLoan,
    );

    const whatIsleft = Math.round(timerSecondsLeft);
    const whatShouldLeft = Math.round(secondsShouldLeft);
    const timerElSeconds = this.timerCountdownEl?.secondsLeftOnLoan || 0;

    log(`reSyncTimerIfGoneOff?`, {
      whatIsleft,
      whatShouldLeft,
      timerElSeconds,
      timeLeftInMin: Math.ceil(timerSecondsLeft / 60),
    });

    if (timerElSeconds !== whatShouldLeft || whatIsleft !== whatShouldLeft) {
      const currStatus: LendingStatus = {
        ...this.lendingStatus,
        secondsLeftOnLoan: whatShouldLeft,
      };
      this.lendingStatus = currStatus;
    }

    if (whatIsleft !== whatShouldLeft) {
      log(`reSyncTimerIfGoneOff --- let's re-sync.`);
      return { hasSynced: true, whatShouldLeft };
    }

    return { hasSynced: false, whatShouldLeft };
  }

  /**
   * Attempt loan renew triggered by timer countdown or "keep reading"
   * button. Bails out and expires the loan if too little time remains
   * to safely round-trip the renew API call.
   */
  async loanRenewAttempt(secondsLeft: number): Promise<void> {
    log('loanRenewAttempt ---', {
      secondsLeft,
      loanRenewResult: this.loanRenewResult,
    });
    let loanSecondsLeft = secondsLeft;
    if (loanSecondsLeft < 50) {
      log('loanRenewAttempt --- loanSecondsLeft < 50, will expire');
      await this.browseHasExpired();
      return;
    }

    await this.autoLoanRenewChecker(false);

    if (this.loanRenewResult.renewNow === false) {
      loanSecondsLeft -= 60;
      this.loanRenewResult.secondsLeft = loanSecondsLeft;
      this.showWarningModal();
    }
  }

  /** enable access of borrowed/browsed books @see LoanTokenPoller */
  startLoanTokenPoller(): void {
    const successCallback = () => {
      if (!this.postInitComplete) {
        this.lendingBarPostInit();
      }
      this.postInitComplete = true;
    };
    const errorCallback = (eventLike: {
      detail: { action: string; data: unknown };
    }) => {
      this.handleLendingActionError(
        new CustomEvent('lendingActionError', { detail: eventLike.detail }),
      );
    };

    this.tokenPoller = new LoanTokenPoller(
      this.identifier,
      this.borrowType,
      successCallback,
      errorCallback,
      this.tokenDelay,
    );
  }

  /**
   * Toggles action group enable/disable (typically while a request is in
   * flight or after a successful action).
   * @event IABookActions#toggleActionGroup
   */
  handleToggleActionGroup(): void {
    this.disableActionGroup = !this.disableActionGroup;
  }

  /**
   * Centralized error handler for lending operations.
   * @event IABookActions#lendingActionError
   */
  handleLendingActionError(event: Event): void {
    this.disableActionGroup = false;
    window?.IALendingIntervals?.clearAll();

    const detail = (event as CustomEvent).detail as
      | { action?: string; data?: { error?: string } }
      | undefined;
    const action = detail?.action;
    const errorMsg = detail?.data?.error;

    if (errorMsg && action !== 'create_token') {
      this.showErrorModal(errorMsg, action ?? '');
    }

    if (action === 'create_token') {
      const currStatus: LendingStatus = {
        ...this.lendingStatus,
        user_has_browsed: false,
        available_to_browse: true,
      };
      this.lendingStatus = currStatus;
    }

    if (errorMsg && errorMsg.match(/not available to borrow/gm)) {
      let currStatus: LendingStatus = this.lendingStatus;
      if (action === 'browse_book') {
        currStatus = {
          ...this.lendingStatus,
          available_to_browse: false,
        };
      } else if (action === 'borrow_book') {
        currStatus = {
          ...this.lendingStatus,
          available_to_borrow: false,
        };
      }
      this.lendingStatus = currStatus;
    }
  }

  /** show error message if something went wrong */
  async showErrorModal(errorMsg: string, action: string): Promise<void> {
    const modalConfig = new ModalConfig({
      title: html`Lending error`,
      message: html`${errorMsg}`,
      headerColor: '#d9534f',
      showCloseButton: true,
    });

    if (action === 'create_token') {
      const refreshButton = html`<button
        style="${modalButtonStyle.refresh}"
        @click=${() => window.location.reload()}
      >
        refresh
      </button>`;

      modalConfig.message = html` Uh oh, something went wrong trying to access
        this book.<br />
        Please ${refreshButton} to try again or send us an email to
        <a
          href="mailto:info@archive.org?subject=Help: cannot access my borrowed book: ${this
            .identifier}"
          >info@archive.org</a
        ><br /><br />
        <code>errorLog: ${errorMsg}</code>`;
    }

    await this.modal?.showModal({
      config: modalConfig,
    });
  }

  get iconClass(): string {
    return this.width <= mobileContainerWidth ? 'mobile' : 'desktop';
  }

  get textClass(): string {
    return this.width >= mobileContainerWidth ? 'visible' : 'hidden';
  }

  get infoIconTemplate(): TemplateResult {
    return html`<info-icon iconClass=${this.iconClass}></info-icon>`;
  }

  get textGroupTemplate(): TemplateResult | typeof nothing {
    return this.primaryTitle
      ? html`<text-group
          textClass=${this.textClass}
          .texts=${this.primaryTitle}
        >
        </text-group>`
      : nothing;
  }

  get hasAdminAccess(): boolean {
    return !this.lendingStatus.userHasBorrowed && !!this.lendingStatus.isAdmin;
  }

  static styles = css`
    :host {
      display: block;
    }

    .hide {
      display: none;
    }

    .lending-wrapper {
      width: 100%;
      margin: 0 auto;
      background: var(--primaryBGColor, #000);
      color: var(--primaryTextColor, #fff);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
    }
  `;
}
