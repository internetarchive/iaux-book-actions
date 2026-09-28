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
import { infoIcon } from './assets/data/info.js';

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

    this.loanRenewInProgress = false;

    /**
     * True while recovering from a loan that genuinely lapsed (set by
     * autoRenewExpiredLoan), as opposed to a routine pre-expiry top-up.
     * Only the recovery case needs BookReader re-initialized — see
     * handleLoanAutoRenewed.
     */
    this.recoveringFromLoanExpiry = false;

    this.warningModalOpen = false;

    /** Once dismissed, don't re-show the warning modal every tick — only
     * a real renewal (handleLoanAutoRenewed) re-arms it. */
    this.warningModalDismissed = false;

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
    super.disconnectedCallback();
    window?.IALendingIntervals?.clearAll();
    this.tokenPoller?.disconnectedCallback();
    this.sentryCaptureMsg(sentryLogs.disconnectedCallback);
    this.disconnectResizeObserver();
  }

  /**
   * send log messages to sentry
   * @param {string} msg
   */
  sentryCaptureMsg(msg) {
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
      // Pause the countdown for the renew_loan round-trip, for every
      // renewal path — cleared by handleLoanAutoRenewed().
      this.loanRenewInProgress = true;
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

  /**
   * Recompute the action bar (title, buttons, colors, borrowType) from the
   * current lendingStatus.
   *
   * @returns {boolean} false when there are no actions to apply, in which
   *   case callers should bail out rather than continue with stale state.
   */
  applyLendingActions() {
    this.lendingOptions = new GetLendingActions(
      this.userid,
      this.identifier,
      this.lendingStatus,
      this.bwbPurchaseUrl
    );
    const actions = this.lendingOptions.getCurrentLendingActions();

    if (!actions) return false;

    this.primaryTitle = actions.primaryTitle;
    this.primaryActions = actions.primaryActions?.filter(action => {
      return action != null;
    });
    this.primaryColor = actions.primaryColor;
    this.secondaryActions = actions.secondaryActions?.filter(action => {
      return action != null;
    });

    this.borrowType = actions.borrowType ? actions.borrowType : null;

    return true;
  }

  async setupLendingToolbarActions() {
    const hasExpired =
      'browsingExpired' in this.lendingStatus &&
      this.lendingStatus?.browsingExpired;
    if (hasExpired) {
      // Auto-return must not visibly change the bar — unless nothing's
      // rendered yet (fresh load of an already-expired loan).
      if (this.primaryActions?.length) {
        log('[IABookActions] browsing expired — leaving action bar untouched');
      } else {
        log(
          '[IABookActions] browsing expired on first render — populating action bar'
        );
        this.applyLendingActions();
      }

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

    if (!this.applyLendingActions()) return;

    // Don't (re)start the countdown mid-renewal — secondsLeftOnLoan could
    // still be stale until handleLoanAutoRenewed() confirms it.
    if (this.borrowType === 'browsed' && !this.loanRenewInProgress) {
      await this.startTimerCountdown();
      await this.startBrowseTimer();
    }

    // early return if not borrowed or no action-bar
    if (!this.borrowType || this.barType === 'title') {
      this.lendingBarPostInit();
      return;
    }

    // Wait until any in-flight renewal is confirmed before (re)starting the
    // poller, so create_token isn't called against a not-yet-renewed loan.
    setTimeout(() => {
      if (
        !hasExpired &&
        !this.loanRenewInProgress &&
        !window.IALendingIntervals.tokenPoller
      ) {
        this.recoveringFromLoanExpiry = false;
        this.startLoanTokenPoller();
      }
    }, 100);

    this.requestUpdate();
  }

  /**
   * Is this BookReader's own init-time jump to the last-read page, rather
   * than a real patron interaction (which fires the identical event)? Only
   * an explicit `false` counts; a missing flag must be treated as real.
   * @param {Event} event - the BookReader:userAction event
   * @returns {boolean}
   */
  isBookReaderInitAction(event) {
    return event?.detail?.props?.init?.initComplete === false;
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
    window.addEventListener('BookReader:userAction', event => {
      if (this.isBookReaderInitAction(event)) {
        log(
          '[IABookActions] BookReader:userAction ignored — fired by BookReader init'
        );
        return;
      }

      // Capture before autoRenewExpiredLoan() runs — it optimistically
      // flips browsingExpired to false, which would otherwise also let
      // autoLoanRenewChecker() run and clobber the in-flight renewal.
      const wasExpired = this.lendingStatus.browsingExpired;

      log('[IABookActions] BookReader:userAction received', {
        borrowType: this.borrowType,
        browsingExpired: wasExpired,
      });

      if (wasExpired) {
        this.autoRenewExpiredLoan();
      }

      if (this.borrowType === 'browsed' && !wasExpired) {
        this.autoLoanRenewChecker(true);
      }
    });

    // A tab in the background can have its intervals throttled/paused, so
    // re-check status when the patron comes back to it.
    document.addEventListener('visibilitychange', async () => {
      if (document.hidden) {
        log('[IABookActions] visibilitychange: tab backgrounded');
        return;
      }

      log(
        '[IABookActions] visibilitychange: tab foregrounded',
        this.borrowType
      );

      try {
        // Loan already expired while tab was hidden — try to silently renew
        if (this.lendingStatus.browsingExpired === true) {
          this.autoRenewExpiredLoan();
          return;
        }

        if (this.borrowType !== 'browsed') return;

        if (this.lendingStatus.browsingExpired === false) {
          const loanTime = await this.localCache.get(
            `${this.identifier}-loanTime`
          );

          // number of seconds left in current loan
          const secondsLeft = Math.round((loanTime - new Date()) / 1000);

          if (secondsLeft >= this.timerExecutionSeconds) {
            this.loanStatusCheckInterval(Number(secondsLeft));
          } else {
            // Loan expired while away — silently renew. Only clear
            // intervals; disconnectedCallback() would drop the resize
            // observer for a session that's still continuing.
            window?.IALendingIntervals?.clearAll();
            this.autoRenewExpiredLoan();
          }
        }
      } catch (error) {
        // Surface localCache failures instead of an unhandled rejection.
        log('[IABookActions] visibilitychange handler failed', error);
        this.sentryCaptureMsg(`visibilitychange handler failed: ${error}`);
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
    // Re-entrancy guard against rapid BookReader:userAction events (e.g. a
    // single scroll firing several in quick succession).
    if (this.loanRenewInProgress) return;

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
   * Silently attempt to renew a browse loan that has expired, on
   * visibilitychange or a page turn. handleLoanAutoRenewed()/
   * handleLendingActionError() handle the outcome either way.
   */
  autoRenewExpiredLoan() {
    if (this.loanRenewInProgress) {
      log(
        '[IABookActions] autoRenewExpiredLoan: skipped, renewal already in progress',
        { identifier: this.identifier }
      );
      return;
    }
    log('[IABookActions] autoRenewExpiredLoan: starting silent renewal', {
      identifier: this.identifier,
    });
    this.loanRenewInProgress = true;
    this.recoveringFromLoanExpiry = true;

    this.modal?.closeModal();

    // Optimistically flip browsingExpired so the bar stays in the reading
    // state during the renew_loan round-trip, instead of showing "Borrow".
    this.lendingStatus = {
      ...this.lendingStatus,
      browsingExpired: false,
    };

    // Defer renewNow until after lendingStatus timer setup completes.
    setTimeout(() => {
      this.loanRenewResult = { texts: '', renewNow: true, renewType: 'auto' };
    }, 0);
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
   * Show the informational modal warning the patron their loan will expire
   * soon. This is acknowledgement-only — closing it does not renew the loan.
   * Only interacting with the book itself (e.g. turning a page) renews it.
   */
  async showWarningModal() {
    if (this.warningModalOpen) return;
    this.warningModalOpen = true;

    log('[IABookActions] showWarningModal');

    const {
      texts: warningTexts,
      secondsLeft: rawSecondsLeft,
    } = this.loanRenewResult;
    let secondsLeft = rawSecondsLeft;
    if (secondsLeft === undefined || secondsLeft <= 0) {
      secondsLeft = this.lendingStatus.secondsLeftOnLoan;
    } else {
      secondsLeft = secondsLeft > 60 ? secondsLeft : 60;
    }

    this.modal.customModalContent = nothing;
    this.modal?.closeModal();
    this.loanRenewResult = { texts: '', renewNow: false };

    const config = new ModalConfig({
      headline: 'Are you still there?',
      headerColor: '#194880',
      showCloseButton: false,
      closeOnBackdropClick: false,
      message: html`<span>
        ${this.loanRenewHelper?.getMessageTexts(warningTexts, secondsLeft)}
        <a
          href="https://help.archive.org/help/borrowing-from-the-lending-library"
          target="_blank"
          title="Get more info on borrowing from The Lending Library"
          data-event-click-tracking="BookReader|BrowsableMoreInfo"
          style="display:inline-block;vertical-align:middle;line-height:0;margin-left:4px;"
        >
          ${infoIcon}
        </a>
      </span>`,
    });

    const customModalContent = html`
      <div
        id="book-action-bar-custom-buttons"
        style="display:flex;flex-direction:column;justify-content:center;align-items:center;gap:8px;margin-top:10px;"
      >
        <button
          style="${modalButtonStyle.iaButton} ${modalButtonStyle.renew}"
          @click=${() => this.dismissWarningModal()}
        >
          Okay
        </button>
      </div>
    `;

    this.modal.setAttribute('aria-live', 'assertive');
    await this.modal?.showModal({ config, customModalContent });
  }

  /** Acknowledges the warning modal — closes it without renewing the loan */
  dismissWarningModal() {
    this.modal?.closeModal();
    this.warningModalOpen = false;
    this.warningModalDismissed = true;
  }

  /**
   * Execute when loan is expired
   */
  async browseHasExpired() {
    log('[IABookActions] browseHasExpired', {
      identifier: this.identifier,
      loanRenewInProgress: this.loanRenewInProgress,
    });
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
    log(
      '[IABookActions] browseHasExpired: cleared loanTime/pageChangedTime cache',
      {
        identifier: this.identifier,
      }
    );

    // show message after browsed book is expired.
    this.loanRenewResult.renewNow = false;
    this.loanRenewResult.texts =
      'This book has been returned due to inactivity.';

    this.modal?.closeModal();
    // Release the warning-modal re-entrancy guard, or it stays latched for
    // the life of the component.
    this.warningModalOpen = false;

    this.sentryCaptureMsg(sentryLogs.browseHasExpired);
  }

  /**
   * Show modal when the book can no longer be automatically renewed
   * because another patron has checked it out.
   */
  async showLoanUnavailableModal(errorMsg) {
    const config = new ModalConfig({
      headline: '',
      showCloseButton: false,
      closeOnBackdropClick: false,
      headerColor: '#d9534f',
      message:
        errorMsg ||
        'Due to inactivity, this book was returned, and someone else has now borrowed it. Please try again later.',
    });

    const customModalContent = html`<br />
      <div style="text-align: center">
        <button
          style="${modalButtonStyle.iaButton} ${modalButtonStyle.return}"
          @click=${() => URLHelper.goToUrl(this.returnUrl, true)}
        >
          Okay
        </button>
      </div>`;

    await this.modal?.showModal({ config, customModalContent });
  }

  async startBrowseTimer() {
    window?.IALendingIntervals?.clearBrowseExpireTimeout();

    const {
      browsingExpired,
      user_has_browsed,
      secondsLeftOnLoan,
    } = this.lendingStatus;

    if (!user_has_browsed || browsingExpired) {
      return;
    }

    window.IALendingIntervals.browseExpireTimeout = setTimeout(() => {
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
   * Runs after a loan renewal completes (successfully or not): shows the
   * outcome, updates the remaining time, and resets renewal-in-flight state.
   * @param {object} event
   */
  async handleLoanAutoRenewed({ detail }) {
    const activeLoan = detail?.data?.loan;

    // Treat anything but a confirmed renewal as a failure, or
    // loanRenewInProgress stays latched forever (autoLoanRenewChecker/
    // autoRenewExpiredLoan both no-op on it).
    if (!activeLoan?.renewal) {
      this.loanRenewInProgress = false;
      this.recoveringFromLoanExpiry = false;
      this.warningModalOpen = false;

      // dispatchActionError() has already reported this and shown the
      // relevant modal; don't stack a second one on top.
      log('[IABookActions] handleLoanAutoRenewed: not a confirmed renewal', {
        identifier: this.identifier,
        activeLoan,
      });
      return;
    }

    if (this.loanRenewResult.renewNow) {
      const loanTime = await this.localCache.get(`${this.identifier}-loanTime`);

      // number of seconds left in current loan
      const rawSecondsLeft = Math.round((loanTime - new Date()) / 1000);
      // Guard against a stale/missing loanTime read producing NaN, which
      // would get the loan stuck "active" with a countdown that never moves.
      const secondsLeft =
        Number.isFinite(rawSecondsLeft) && rawSecondsLeft > 0
          ? rawSecondsLeft
          : this.loanRenewTimeConfig.loanTotalTime;
      log('[IABookActions] handleLoanAutoRenewed', {
        secondsLeft,
        rawSecondsLeft,
        ajaxResponse: detail?.data,
      });

      if (this.recoveringFromLoanExpiry) {
        // Only now is it safe to re-initialize BookReader — not for a
        // routine top-up, where that would be disruptive.
        this.postInitComplete = false;
      }

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
      this.warningModalDismissed = false;
    }

    this.warningModalOpen = false;
    this.loanRenewInProgress = false;
  }

  /** Start the countdown interval; ticks read the live secondsLeftOnLoan
   * each time rather than a value frozen at start, so drift can't compound
   * across ticks (see loanStatusCheckInterval). */
  async startTimerCountdown() {
    window?.IALendingIntervals?.clearTimerCountdown();
    this.timeWhenTimerStart = new Date();

    window.IALendingIntervals.timerCountdown = setInterval(async () => {
      await this.loanStatusCheckInterval(
        Number(this.lendingStatus.secondsLeftOnLoan)
      );
    }, this.timerExecutionSeconds * 1000);
  }

  /**
   * Runs on every countdown tick: resyncs against wall-clock time, attempts
   * a renewal near expiry, and clears the timers once the loan expires.
   * @param {Number} secondsLeftOnLoan
   */
  async loanStatusCheckInterval(secondsLeftOnLoan) {
    let secondsLeft = secondsLeftOnLoan;
    secondsLeft -= this.timerExecutionSeconds;
    secondsLeft = Math.round(secondsLeft);

    const resyncd = this.reSyncTimerIfGoneOff(secondsLeft);
    if (resyncd.hasSynced) {
      secondsLeft = resyncd.whatShouldLeft;
      log('[IABookActions] timer: timer re-synced', { secondsLeft });
    }

    log('[IABookActions] timer', {
      whatShouldLeft: resyncd.whatShouldLeft,
      whatIsleft: secondsLeft,
    });

    // Re-anchor every tick so drift from wall-clock time can't compound
    // across ticks that don't happen to trigger a resync above.
    this.timeWhenTimerStart = new Date();
    this.lendingStatus = { ...this.lendingStatus, secondsLeftOnLoan: secondsLeft };

    // 10 minutes out: start checking for a renewal. 0: show the "about to
    // auto-return" warning. @see IABookActions::bindLoanRenewEvents
    if (secondsLeft <= this.loanRenewTimeConfig.loanRenewAtLast) {
      await this.loanRenewAttempt(secondsLeft);
    }

    if (secondsLeft <= this.timerExecutionSeconds) {
      window?.IALendingIntervals?.clearAll();
      this.tokenPoller?.disconnectedCallback();
      this.sentryCaptureMsg(sentryLogs.clearOneHourTimer);
    }
  }

  /**
   * helper function to determine if timer is not in sync properly
   *
   * @param {number} timerSecondsLeft - actual seconds left get from setInterval
   * @returns {Object} { hasSynced: [boolean], whatShouldLeft: [number] }
   */
  reSyncTimerIfGoneOff(timerSecondsLeft) {
    const currentTime = new Date();

    // current time - loan time
    const diffInSeconds =
      currentTime.getTime() / 1000 - this.timeWhenTimerStart.getTime() / 1000;

    const secondsShouldLeft =
      this.lendingStatus.secondsLeftOnLoan - diffInSeconds;

    // convert in minutes
    const whatIsleft = Math.round(timerSecondsLeft);
    const whatShouldLeft = Math.round(secondsShouldLeft);
    const timerElSeconds = this.timerCountdownEl.secondsLeftOnLoan || 0;

    if (timerElSeconds !== whatShouldLeft || whatIsleft !== whatShouldLeft) {
      // set lending status with new time to update decrementor
      const currStatus = {
        ...this.lendingStatus,
        secondsLeftOnLoan: whatShouldLeft,
      };
      this.lendingStatus = currStatus;
    }

    if (whatIsleft !== whatShouldLeft) {
      log(
        `[IABookActions] reSyncTimerIfGoneOff ${whatIsleft} - ${whatShouldLeft}: re-syncing timer`
      );
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
    let loanSecondsLeft = secondsLeft;
    // Under 50s left there isn't enough time for the renew_loan round-trip
    // and create_token to load images, so just expire the loan.
    if (loanSecondsLeft < 50) {
      log('[IABookActions] loanRenewAttempt: < 50s left, expiring loan');
      await this.browseHasExpired();
      return;
    }

    await this.autoLoanRenewChecker(false);

    // Once dismissed, don't re-show the warning on every subsequent tick —
    // only an actual renewal (handleLoanAutoRenewed) re-arms it.
    if (
      this.loanRenewResult.renewNow === false &&
      !this.warningModalDismissed
    ) {
      // Compensate for the 50s buffer above by warning a minute early.
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

    // Tear down any previous poller first, so only one is ever controlling
    // window.IALendingIntervals.tokenPoller at a time.
    this.tokenPoller?.disconnectedCallback();
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
   * Handles lending errors from any action (browse_book, borrow_book,
   * create_token, renew_loan, etc).
   * @event IABookActions#lendingActionError
   * @param {Object} event
   * @param {string} event.detail.action
   * @param {string} event.detail.data.error
   */
  handleLendingActionError(event) {
    this.disableActionGroup = false;

    const action = event?.detail?.action;
    const errorMsg = event?.detail?.data?.error;
    const isInitial = event?.detail?.isInitial === true;

    log('[IABookActions] handleLendingActionError', {
      identifier: this.identifier,
      action,
      errorMsg,
      isInitial,
      loanRenewInProgress: this.loanRenewInProgress,
      recoveringFromLoanExpiry: this.recoveringFromLoanExpiry,
    });

    if (action === 'create_token') {
      // Only the INITIAL token matters enough to interrupt the patron — a
      // routine interval refresh stays silent; the pages already loaded
      // are still served, and the next scheduled poll tries again on its
      // own without any special retry.
      if (!isInitial) {
        log(
          '[IABookActions] create_token failed on interval refresh — staying silent'
        );
        return;
      }

      // The book never opened, and we don't retry — reset the bar to
      // Borrow and the timer to 0 rather than leaving a red "Return now"
      // with a stale countdown for a session that isn't accessible.
      window?.IALendingIntervals?.clearAll();
      this.tokenPoller?.disconnectedCallback();
      this.lendingStatus = {
        ...this.lendingStatus,
        user_has_browsed: false,
        available_to_browse: true,
        secondsLeftOnLoan: 0,
      };

      // showErrorModal has dedicated create_token messaging (refresh
      // button + support email).
      if (errorMsg) this.showErrorModal(errorMsg, action);
    } else if (action === 'renew_loan') {
      window?.IALendingIntervals?.clearAll();
      this.loanRenewInProgress = false;
      this.recoveringFromLoanExpiry = false;

      // The loan was NOT renewed — reflect that immediately (show Borrow,
      // clear the stale timer) rather than leaving a frozen "Return now".
      this.lendingStatus = {
        ...this.lendingStatus,
        user_has_browsed: false,
        available_to_browse: true,
        secondsLeftOnLoan: 0,
      };

      // Refresh the page on dismissal so the client picks up whatever the
      // server now authoritatively considers true (any error message).
      this.showLoanUnavailableModal(errorMsg);
    } else {
      // Every other action failure genuinely affects loan state.
      window?.IALendingIntervals?.clearAll();

      if (!errorMsg) return;

      this.showErrorModal(errorMsg, action);

      // update action bar state if book is not available to browse or borrow.
      if (errorMsg.match(/not available to borrow/gm)) {
        if (action === 'browse_book') {
          this.lendingStatus = {
            ...this.lendingStatus,
            available_to_browse: false,
          };
        } else if (action === 'borrow_book') {
          this.lendingStatus = {
            ...this.lendingStatus,
            available_to_borrow: false,
          };
        }
      }
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
