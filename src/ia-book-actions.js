/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import { html, css, LitElement, nothing } from 'lit';

import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import { ModalConfig } from '@internetarchive/modal-manager';
import { LocalCache } from '@internetarchive/local-cache';

import './components/collapsible-action-group.js';
import './components/book-title-bar.js';
import './components/text-group.js';
import './components/info-icon.js';
import './components/timer-countdown.js';
import './core/config/ia-lending-intervals.js';

import { GetLendingActions } from './core/services/get-lending-actions.js';
import { mobileContainerWidth } from './core/config/constants.js';
import { sentryLogs } from './core/config/sentry-events.js';
import { LoanTokenPoller } from './core/services/loan-token-poller.js';
import { LoanRenewHelper } from './core/services/loan-renew-helper.js';
import log from './core/services/log.js';
import { URLHelper } from './core/config/url-helper.js';

export const events = {
  browseExpired: 'IABookReader:BrowsingHasExpired',
};

/**
 * custom styling for modal-manager buttons
 * TODO: lets allow modal-manager to know ia-button classes
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
};

export default class IABookActions extends LitElement {
  static get properties() {
    return {
      userid: { type: String },
      identifier: { type: String },
      bookTitle: { type: String },
      lendingStatus: { type: Object },
      returnUrl: { type: String },
      width: { type: Number },
      bwbPurchaseUrl: { type: String },
      lendingBarPostInit: {
        type: Function,
        attribute: false,
      },
      barType: { type: String },
      sharedObserver: { attribute: false },
      disableActionGroup: { type: Boolean },
      modal: { Object },
      tokenDelay: { type: Number },
      timerExecutionSeconds: { type: Number },
      localCache: { type: Object },
      loanRenewTimeConfig: { type: Object },
      loanRenewResult: { type: Object },
    };
  }

  constructor() {
    super();
    this.userid = '';
    this.identifier = '';
    this.bookTitle = '';
    this.returnUrl = '';
    this.lendingStatus = {}; // very important as components feed from this
    this.width = 0;
    this.bwbPurchaseUrl = '';
    this.lendingBarPostInit = () => {};
    this.barType = 'action'; // 'title'|'action'
    this.sharedObserver = undefined;
    this.disableActionGroup = false;
    this.tokenDelay = 120; // in seconds
    this.timerExecutionSeconds = 30;

    // private props
    this.postInitComplete = false;
    this.primaryActions = [];
    this.primaryTitle = '';
    this.primaryColor = 'primary';
    this.secondaryActions = [];
    this.lendingOptions = {};
    this.borrowType = null; // 'browsed'|'borrowed'
    this.browseTimer = undefined; // timeout
    this.timeWhenTimerStart = undefined;

    /**
     * when user click on [return the book] button on warning modal
     */
    this.returnNow = false;

    /**
     * contains one hour auto-loan-renew time configuration
     * defaults to 1 hour config
     * @type {object} loanRenewTimeConfig
     * @property {number} loanTotalTime - total seconds a loan does have
     * @property {number} loanRenewAtLast - check for loan renew at last
     * @property {number} pageChangedInLast - consider loan renew eligible if viewed new page
     */
    this.loanRenewTimeConfig = {
      loanTotalTime: 3600, // 1 hour
      loanRenewAtLast: 660, // 11 minutes
      pageChangedInLast: 900, // 15 minutes
    };

    /**
     * contains one hour auto-loan-renew response
     *
     * @type {object} loanRenewResult
     * @property {string} texts - texts messages shows in modal
     * @property {boolean} renewNow - key to determine if need to renew now
     * @property {number} secondsLeft - seconds left in active loan
     */
    this.loanRenewResult = {
      texts: '',
      renewNow: false,
      secondsLeft: 0,
      renewType: '',
    };
  }

  disconnectedCallback() {
    // clear all intervals for lending system
    window?.IALendingIntervals?.clearAll();

    this.sentryCaptureMsg(sentryLogs.disconnectedCallback);
    this.disconnectResizeObserver();
  }

  /**
   * send log messages to sentry
   * @param {string} msg
   */
  sentryCaptureMsg(msg) {
    log(window?.Sentry);
    window?.Sentry?.captureMessage(msg);
  }

  firstUpdated() {
    // bind auto loan renew events
    this.bindLoanRenewEvents();

    // localCache used for auto-loan-renew
    this.localCache = new LocalCache({
      namespace: 'loanRenew',
    });

    if (!this.sharedObserver) {
      this.sharedObserver = new SharedResizeObserver();
      this.setupResizeObserver();
    }
  }

  updated(changed) {
    if (changed.has('lendingStatus') || changed.has('bwbPurchaseUrl')) {
      this.setupLendingToolbarActions();
    }

    if (changed.has('sharedObserver')) {
      this.disconnectResizeObserver();
      this.setupResizeObserver();
    }

    if (changed.has('loanRenewResult') && this.loanRenewResult.renewNow) {
      window.IALendingIntervals.clearAll();
    }
  }

  /** SharedObserver resize handler */
  handleResize(entry) {
    // if you are observing multiple targets,
    // you can distinguish them through `entry.target`
    const { target } = entry;
    if (target !== this.shadowRoot.host) return;

    const { contentRect } = entry;
    // configure your view, ie:

    this.width = Math.round(contentRect.width);
  }

  /** Removes observer */
  disconnectResizeObserver() {
    this.sharedObserver?.removeObserver({
      handler: this,
      target: this.shadowRoot.host,
    });
  }

  // observe the shadowRoot's viewport and
  // make this component the handler of changes
  setupResizeObserver() {
    if (!this.shadowRoot) return;
    this.sharedObserver?.addObserver({
      handler: this,
      target: this.shadowRoot.host,
    });
  }
  /** End SharedObserver resize handler */

  async setupLendingToolbarActions() {
    this.lendingOptions = new GetLendingActions(
      this.userid,
      this.identifier,
      this.lendingStatus,
      this.bwbPurchaseUrl
    );
    const actions = this.lendingOptions.getCurrentLendingActions();

    if (!actions) return;

    this.primaryTitle = actions.primaryTitle;
    this.primaryActions = actions.primaryActions?.filter(action => {
      return action != null;
    });
    this.primaryColor = actions.primaryColor;
    this.secondaryActions = actions.secondaryActions?.filter(action => {
      return action != null;
    });

    this.borrowType = actions.borrowType ? actions.borrowType : null;

    const hasExpired =
      'browsingExpired' in this.lendingStatus &&
      this.lendingStatus?.browsingExpired;
    if (hasExpired) {
      log('setupLendingToolbarActions > hasExpired --- ');

      if (!this.tokenPoller) {
        this.sentryCaptureMsg(sentryLogs.bookWasExpired);
      }
      window?.IALendingIntervals?.clearAll();

      /** Global event - always fire */
      this.dispatchEvent(
        new Event(events.browseExpired, {
          bubbles: true,
          cancelable: false,
          composed: true,
        })
      );

      // early return if book is already expired
      return;
    }

    if (this.borrowType === 'browsed') {
      // start timer for loan-renew
      await this.startTimerCountdown();

      // start timer for browsed.
      await this.startBrowseTimer();
    }

    // early return if not borrowed or no action-bar
    if (!this.borrowType || this.barType === 'title') {
      this.lendingBarPostInit();
      return;
    }

    /**
     * tokenPoller determines if user has loan token for this book
     * - if book is going to renew, need to wait until renew is completed
     */
    setTimeout(() => {
      if (!hasExpired && !window.IALendingIntervals.tokenPoller)
        this.startLoanTokenPoller();
    }, 100);

    this.requestUpdate();
  }

  /**
   * Bind 1 hour loan auto renew event,
   * There are two events we want to use,
   * 1. BookReader:userAction - dispatched from bookreader side
   * 2. IABookActions:loanRenew - dispatched from timer-countdown component
   */
  bindLoanRenewEvents() {
    /**
     * dispatched this event from bookreader page changed
     */
    window.addEventListener('BookReader:userAction', () => {
      log('IABookActions:BookReader:userAction');
      if (this.borrowType === 'browsed') {
        this.autoLoanRenewChecker(true);
      }
    });

    /**
     * auto-renew interval may stale when tab is in background,
     * so when user open that tab again,
     * the [visibilitychange] event can trigger timer to show relavent messages
     */
    document.addEventListener('visibilitychange', async () => {
      if (!document.hidden) {
        log(
          'visibilitychange event execute:------------------ ',
          new Date().getMinutes(),
          new Date().getSeconds(),
          this.borrowType
        );

        if (
          this.borrowType === 'browsed' &&
          this.lendingStatus.browsingExpired === false
        ) {
          const loanTime = await this.localCache.get(
            `${this.identifier}-loanTime`
          );

          // number of seconds left in current loan
          const secondsLeft = Math.round((loanTime - new Date()) / 1000);

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

  /**
   * To determine if need to be renewed browsed book
   * @see LoanRenewHelper
   *
   * @param {Boolean} hasPageChanged
   */
  async autoLoanRenewChecker(hasPageChanged = false) {
    this.loanRenewHelper = new LoanRenewHelper(
      hasPageChanged,
      this.identifier,
      this.localCache,
      this.loanRenewTimeConfig
    );

    await this.loanRenewHelper.handleLoanRenew();
    this.loanRenewResult = this.loanRenewHelper.result;
  }

  /**
   * Required as sibling on page
   * @returns HTMLElement
   */
  get modal() {
    const modalOnDom = document.body.querySelector('modal-manager');

    modalOnDom?.setAttribute('id', 'action-bar-modal');
    return modalOnDom;
  }

  /**
   * Show the waring modal to ask user if they are still reading
   */
  async showWarningModal() {
    log('****** showWarningModal ******');
    // clear modal
    this.modal.customModalContent = nothing;
    this.modal?.closeModal();
    this.loanRenewResult = { texts: '', renewNow: false };

    // if secondsLeft < 60, consider it 1 minute
    let { secondsLeft } = this.loanRenewResult;
    if (secondsLeft === undefined) {
      secondsLeft = this.lendingStatus.secondsLeftOnLoan;
    } else {
      secondsLeft = secondsLeft > 60 ? secondsLeft : 60;
    }

    const config = new ModalConfig({
      headline: 'Are you still reading?',
      headerColor: '#194880',
      showCloseButton: false,
      closeOnBackdropClick: false,
      message: this.loanRenewHelper?.getMessageTexts(
        this.loanRenewResult.texts,
        secondsLeft
      ),
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

    this.modal.setAttribute('aria-live', 'assertive');
    await this.modal?.showModal({ config, customModalContent });
  }

  /** @param { 'renewBook' | 'returnBook' } buttonToDisable */
  async showWarningDisabledModal(buttonToDisable = 'renewBook') {
    // if secondsLeft < 60, consider it 1 minute
    let { secondsLeft } = this.loanRenewResult;
    if (secondsLeft === undefined) {
      secondsLeft = this.lendingStatus.secondsLeftOnLoan;
    } else {
      secondsLeft = secondsLeft > 60 ? secondsLeft : 60;
    }

    const config = new ModalConfig({
      headline: 'Are you still reading?',
      headerColor: '#194880',
      showCloseButton: false,
      closeOnBackdropClick: false,
      message: this.loanRenewHelper?.getMessageTexts(
        this.loanRenewResult.texts,
        secondsLeft
      ),
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

  /** Handles Renew action in warning modal */
  async patronWantsToRenewBook() {
    this.showWarningDisabledModal();
    this.loanRenewResult = { texts: '', renewNow: true, renewType: 'manual' };
  }

  async patronWantsToReturnBook() {
    this.showWarningDisabledModal('returnBook');
    document.querySelector('ia-book-actions').disableActionGroup = true;
    this.returnNow = true;
  }

  /**
   * Show modal when book is auto returned
   */
  async showExpiredModal() {
    const config = new ModalConfig({
      headline: '',
      showCloseButton: false,
      closeOnBackdropClick: false,
      headerColor: '#194880',
      message: 'This book has been returned due to inactivity.',
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

  /**
   * Execute when loan is expired
   */
  async browseHasExpired() {
    log('BrowseHasExpired ---');
    window?.IALendingIntervals?.clearAll();

    const currStatus = {
      ...this.lendingStatus,
      browsingExpired: true,
      secondsLeftOnLoan: 0,
    };
    this.lendingStatus = currStatus;

    // remove respected key:value for loan-renew
    await this.localCache.delete(`${this.identifier}-loanTime`);
    await this.localCache.delete(`${this.identifier}-pageChangedTime`);

    // show message after browsed book is expired.
    this.loanRenewResult.renewNow = false;
    this.loanRenewResult.texts =
      'This book has been returned due to inactivity.';

    await this.showExpiredModal();

    this.sentryCaptureMsg(sentryLogs.browseHasExpired);
  }

  async startBrowseTimer() {
    window?.IALendingIntervals?.clearBrowseExpireTimeout();

    const { browsingExpired, user_has_browsed, secondsLeftOnLoan } =
      this.lendingStatus;

    if (!user_has_browsed || browsingExpired) {
      log('startBrowseTimer --- !user_has_browsed || browsingExpired', {
        user_has_browsed,
        browsingExpired,
        secondsLeftOnLoan,
      });
      return;
    }

    window.IALendingIntervals.browseExpireTimeout = setTimeout(() => {
      log(
        'startBrowseTimer > browseExpireTimeout --- will expire loan',
        secondsLeftOnLoan
      );
      this.browseHasExpired();
    }, secondsLeftOnLoan * 1000);
  }

  render() {
    if (this.barType === 'title') {
      return html`<section class="lending-wrapper">
        ${this.bookTitleBar}
      </section>`;
    }

    return html`<section class="lending-wrapper">
      ${this.bookActionBar}
    </section>`;
  }

  get bookTitleBar() {
    return html`<book-title-bar
      .identifier=${this.identifier}
      .bookTitle=${this.bookTitle}
    ></book-title-bar>`;
  }

  get timerCountdownEl() {
    return this.shadowRoot.querySelector('timer-countdown');
  }

  get bookActionBar() {
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
        .loanRenewType=${this.loanRenewResult.renewType}
        ?hasAdminAccess=${this.hasAdminAccess}
        ?disabled=${this.disableActionGroup}
        ?autoRenew=${this.loanRenewResult.renewNow}
        ?autoReturn=${this.lendingStatus.browsingExpired}
        ?returnNow=${this.returnNow}
        @loanAutoRenewed=${this.handleLoanAutoRenewed}
        @lendingActionError=${this.handleLendingActionError}
        @toggleActionGroup=${this.handleToggleActionGroup}
      >
      </collapsible-action-group>
      ${this.textGroupTemplate} ${this.infoIconTemplate}
      <timer-countdown
        .secondsLeftOnLoan=${Math.round(
          Number(this.lendingStatus.secondsLeftOnLoan)
        )}
      ></timer-countdown>
    `;
  }

  /**
   * Execute after auto loan renewed is completed
   * - show success message
   * - then change the remaining time
   * - reset timer state
   * @param {object} event
   */
  async handleLoanAutoRenewed({ detail }) {
    const activeLoan = detail?.data?.loan;
    const errorMessage = `Whoops, seems we hit a hiccup with renewing this book. Please refresh & retry. --- (Debug: ${detail?.data?.error})`;
    if (!activeLoan) {
      this.showErrorModal(errorMessage, 'handleLoanAutoRenewed');
      return;
    }

    if (this.loanRenewResult.renewNow) {
      // Now, let's reset loan duration & this.lendingStatus
      const loanTime = await this.localCache.get(`${this.identifier}-loanTime`);

      // number of seconds left in current loan
      const secondsLeft = Math.round((loanTime - new Date()) / 1000);
      log(loanTime, secondsLeft);

      log('IABookActions: handleLoanAutoRenewed --- ', {
        ajaxResponse: detail?.data,
        loanRenewResult: this.loanRenewResult,
        secondsLeftOnLoan: secondsLeft,
      });

      const currStatus = {
        ...this.lendingStatus,
        user_has_browsed: true,
        browsingExpired: false,
        secondsLeftOnLoan: secondsLeft,
      };
      this.lendingStatus = currStatus;

      // close the modal
      this.modal?.closeModal();
      this.modal.removeAttribute('id');
      this.modal.customModalContent = nothing;
      this.sentryCaptureMsg(sentryLogs.bookHasRenewed);
    }
  }

  /**
   * start timer countdown interval after loan auto-renewed
   *
   * @memberof IABookActions
   */
  async startTimerCountdown() {
    window?.IALendingIntervals?.clearTimerCountdown();

    const secondsLeft = Number(this.lendingStatus.secondsLeftOnLoan);
    this.timeWhenTimerStart = new Date();

    window.IALendingIntervals.timerCountdown = setInterval(async () => {
      // interval execution block
      await this.loanStatusCheckInterval(secondsLeft);
    }, this.timerExecutionSeconds * 1000);
  }

  /**
   * setInterval execution function do following things
   * - if setInterval timer gone off, let's resync
   * - loan-renew attempt to renew the loan OR show relavant message
   * - if loan has expired, clear interval timers
   *
   * @param {Number} secondsLeftOnLoan
   */
  async loanStatusCheckInterval(secondsLeftOnLoan) {
    let secondsLeft = secondsLeftOnLoan;
    secondsLeft -= this.timerExecutionSeconds;
    secondsLeft = Math.round(secondsLeft); // round number

    // re-sync timer if gone off because of background window
    // side effect: updates this.lendingStatus & kicks off lifecycle,
    // if really updated, escape from here
    const resyncd = await this.reSyncTimerIfGoneOff(secondsLeft);

    if (resyncd.hasSynced) {
      secondsLeft = resyncd.whatShouldLeft;
      log('startTimerCountdown --- stale, timer has resyncd', {
        secondsLeft,
      });
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
      this.timerExecutionSeconds
    );

    /**
     * execute from last 10th minutes to 0th minute
     * - 10th - to check if user has viewed
     * - till 0th - to show warning msg with remaining time to auto expired
     * @see IABookActions::bindLoanRenewEvents
     */
    if (secondsLeft <= this.loanRenewTimeConfig.loanRenewAtLast) {
      await this.loanRenewAttempt(secondsLeft);
    }

    // clear interval in secondsLeft if less
    if (secondsLeft <= this.timerExecutionSeconds) {
      this.disconnectedCallback();
      this.sentryCaptureMsg(sentryLogs.clearOneHourTimer);
    }
  }

  /**
   * helper function to determine if timer is not in sync properly
   *
   * @param {number} timerSecondsLeft - actual seconds left get from setInterval
   * @returns {Object} { hasSynced: [boolean], whatShouldLeft: [number] }
   */
  async reSyncTimerIfGoneOff(timerSecondsLeft) {
    const currentTime = new Date();

    // current time - loan time
    const diffInSeconds =
      currentTime.getTime() / 1000 - this.timeWhenTimerStart.getTime() / 1000;

    const secondsShouldLeft =
      this.lendingStatus.secondsLeftOnLoan - diffInSeconds;

    log('currentTime: ', currentTime);
    log('timeWhenTimerStart: ', this.timeWhenTimerStart);
    log('diffInSeconds: ', diffInSeconds);
    log('secondsShouldLeft: ', secondsShouldLeft);
    log(
      'this.lendingStatus.secondsLeftOnLoan: ',
      this.lendingStatus.secondsLeftOnLoan
    );

    // convert in minutes
    const whatIsleft = Math.round(timerSecondsLeft);
    const whatShouldLeft = Math.round(secondsShouldLeft);
    const timerElSeconds = this.timerCountdownEl.secondsLeftOnLoan || 0;

    log(`reSyncTimerIfGoneOff?`, {
      whatIsleft,
      whatShouldLeft,
      timerElSeconds,
      timeLeftInMin: Math.ceil(timerSecondsLeft / 60),
    });

    if (timerElSeconds !== whatShouldLeft || whatIsleft !== whatShouldLeft) {
      // set lending status with new time to update decrementor
      const currStatus = {
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
   * attmept to loan renew from
   * - timer countdown
   * - onclick on [keep reading] button
   *
   * @param {*} secondsLeft
   * @memberof IABookActions
   */
  async loanRenewAttempt(secondsLeft) {
    log('loanRenewAttempt ---', {
      secondsLeft,
      loanRenewResult: this.loanRenewResult,
    });
    let loanSecondsLeft = secondsLeft;
    /**
     * auto-renew is not possible in last seconds (let say 50 second) because,
     * 1. less time to execute ajax call
     * 2. less time to write loan on datanodes
     * 3. less time to load images by create_token api
     * so if seconds left is < 50, just expire the loan
     */
    if (loanSecondsLeft < 50) {
      log('loanRenewAttempt --- loanSecondsLeft < 50, will expire');
      await this.browseHasExpired();
      return;
    }

    await this.autoLoanRenewChecker(false);

    // show warning modal with remaining time to auto returned it.
    if (this.loanRenewResult.renewNow === false) {
      /**
       * so compensate for the 50 second buffer to handle above race conditions
       * let's reduce 1 min from warning texts and early return the book when 1 min left.
       */
      loanSecondsLeft -= 60;
      this.loanRenewResult.secondsLeft = loanSecondsLeft;

      this.showWarningModal();
    }
  }

  /**
   * enable access of borrowed/browsed books
   * @see LoanTokenPoller
   */
  startLoanTokenPoller() {
    const successCallback = () => {
      if (!this.postInitComplete) {
        this.lendingBarPostInit();
      }
      this.postInitComplete = true;
    };
    const errorCallback = eventObj => {
      this.handleLendingActionError(eventObj);
    };

    /**
     * LoanTokenPoller is a class that polls the loan token
     * it takes 5 params
     * 1. this.identifier
     * 2. this.borrowType
     * 3. successCallback - it used to
     *    - disptach lendingFlow::PostInit event
     *    - initialize bookreader using br.init()
     * 4. errorCallback
     * 5. tokenPollerDelay
     */
    this.tokenPoller = new LoanTokenPoller(
      this.identifier,
      this.borrowType,
      successCallback,
      errorCallback,
      this.tokenDelay // in seconds
    );
  }

  /*
   * custom event handler to toggle action group visibility
   *
   * @event IABookActions#toggleActionGroup
   */
  handleToggleActionGroup() {
    this.disableActionGroup = !this.disableActionGroup;
  }

  /**
   * handle lending errors occure during different operation like
   * browse book, borrow book, borrowed book token etc...
   *
   * @event IABookActions#lendingActionError
   * @param {Object} event - The employee who is responsible for the project
   *  @param {string} event.detail.action - action when error occurred like 'browseBook', 'borrowBook'
   *  @param {string} event.detail.data.error - error message
   */
  handleLendingActionError(event) {
    this.disableActionGroup = false;

    // clear all intervals for lending system when error occured
    window?.IALendingIntervals?.clearAll();

    const action = event?.detail?.action;
    const errorMsg = event?.detail?.data?.error;

    // template not show create_token errors
    if (errorMsg && action !== 'create_token')
      this.showErrorModal(errorMsg, action);

    // if error related to loan token
    // - set user_has_browsed to `false`
    if (action === 'create_token') {
      const currStatus = {
        ...this.lendingStatus,
        user_has_browsed: false,
        available_to_browse: true,
      };
      this.lendingStatus = currStatus;
    }

    // update action bar state if book is not available to browse or borrow.
    if (errorMsg && errorMsg.match(/not available to borrow/gm)) {
      let currStatus = this.lendingStatus;
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

  /* show error message if something went wrong */
  async showErrorModal(errorMsg, action) {
    const modalConfig = new ModalConfig({
      title: 'Lending error',
      message: errorMsg,
      headerColor: '#d9534f',
      showCloseButton: true,
    });

    if (action === 'create_token') {
      const refreshButton = html`<button
        style="${modalButtonStyle.refresh}"
        @click=${() => window.location.reload(true)}
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

  get iconClass() {
    return this.width <= mobileContainerWidth ? 'mobile' : 'desktop';
  }

  get textClass() {
    return this.width >= mobileContainerWidth ? 'visible' : 'hidden';
  }

  get infoIconTemplate() {
    return html`<info-icon iconClass=${this.iconClass}></info-icon>`;
  }

  get textGroupTemplate() {
    return this.primaryTitle
      ? html`<text-group
          textClass=${this.textClass}
          .texts=${this.primaryTitle}
        >
        </text-group>`
      : nothing;
  }

  get hasAdminAccess() {
    return !this.lendingStatus.userHasBorrowed && this.lendingStatus.isAdmin;
  }

  static get styles() {
    return css`
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
}

window.customElements.define('ia-book-actions', IABookActions);
