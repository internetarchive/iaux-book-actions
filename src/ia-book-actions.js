/* eslint-disable camelcase */
import { html, css, LitElement, nothing } from 'lit';

import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import { ModalConfig } from '@internetarchive/modal-manager';
import { ToastConfig } from '@internetarchive/toast-manager';
import { LocalCache } from '@internetarchive/local-cache';

import './components/collapsible-action-group.js';
import './components/book-title-bar.js';
import './components/text-group.js';
import './components/info-icon.js';
import './components/timer-countdown.js';

import { GetLendingActions } from './core/services/get-lending-actions.js';
import { mobileContainerWidth } from './core/config/constants.js';
import { sentryLogs } from './core/config/sentry-events.js';
import { LoanTokenPoller } from './core/services/loan-token-poller.js';
import { LoanRenewHelper } from './core/services/loan-renew-helper.js';

export const events = {
  browseExpired: 'IABookReader:BrowsingHasExpired',
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
    this.lendingStatus = {};
    this.width = 0;
    this.bwbPurchaseUrl = '';
    this.lendingBarPostInit = () => {};
    this.barType = 'action'; // 'title'|'action'
    this.sharedObserver = undefined;
    this.disableActionGroup = false;
    this.modal = undefined;
    this.tokenDelay = 120; // in seconds

    // private props
    this.primaryActions = [];
    this.primaryTitle = '';
    this.primaryColor = 'primary';
    this.secondaryActions = [];
    this.lendingOptions = {};
    this.borrowType = ''; // (browsed|borrowed)
    this.consecutiveLoanCounts = 1; // consecutive loan count
    this.suppressToast = false;
    this.browseTimer = undefined;

    /**
     * contains one hour auto-loan-renew time configuration
     *
     * @type {object} loanRenewTimeConfig
     * @property {number} loanTotalTime - total seconds a loan does have
     * @property {number} loanRenewAtLast - check for loan renew at last
     * @property {number} pageChangedInLast - consider loan renew eligible if viewed new page
     */
    this.loanRenewTimeConfig = {};

    /**
     * contains one hour auto-loan-renew response
     *
     * @type {object} loanRenewResult
     * @property {string} texts - texts messages need to show in toast message
     * @property {boolean} renewNow - key to determine if need to renew now
     * @property {number} secondsLeft - seconds left in active loan
     */
    this.loanRenewResult = { texts: '', renewNow: false, secondsLeft: 0 };

    /**
     * need showdowRoot opened for resetTimerCountState
     * @see IABookActions::resetTimerCountState
     */
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  disconnectedCallback() {
    this.tokenPoller?.disconnectedInterval();
    window?.Sentry?.captureMessage(sentryLogs.disconnectedCallback);
    this.disconnectResizeObserver();
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
      this.update();
    }

    if (changed.has('sharedObserver')) {
      this.disconnectResizeObserver();
      this.setupResizeObserver();
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
    this.suppressToast = false;

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

    this.borrowType = actions.borrowType;

    const hasExpired =
      'browsingExpired' in this.lendingStatus &&
      this.lendingStatus?.browsingExpired;
    if (hasExpired) {
      if (!this.tokenPoller) {
        window?.Sentry?.captureMessage(sentryLogs.bookWasExpired);
      }
      this.tokenPoller?.disconnectedInterval();
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
      // start timer for browsed.
      this.startBrowseTimer();
    }

    // early return if not borrowed or no action-bar
    if (!this.borrowType || this.barType === 'title') {
      this.lendingBarPostInit();
      return;
    }

    // initial timer state for 1-hour loan
    if (this.borrowType === 'browsed' && !this.loanRenewResult.renewNow) {
      setTimeout(() => {
        this.resetTimerCountState();
      }, 100);
    }

    /**
     * tokenPoller determines if user has loan token for this book
     * - if book is going to renew, need to wait until renew is completed
     * - otherwise execute immediately
     */
    setTimeout(
      () => {
        this.startLoanTokenPoller();
      },

      // if book is renew while reading, let's wait to execute create-token api
      this.loanRenewResult.renewNow ? this.tokenDelay * 1000 : 100
    );
  }

  /**
   * Bind 1 hour loan auto renew event,
   * There are two events we want to use,
   * 1. BookReader:userAction - dispatched from bookreader side
   * 2. click event to refresh the page when book is auto expired
   * 3. IABookActions:loanRenew - dispatched from timer-countdown component
   */
  bindLoanRenewEvents() {
    /**
     * dispatched this event from bookreader page changed
     */
    window.addEventListener('BookReader:userAction', () => {
      if (this.borrowType === 'browsed') {
        this.suppressToast = false;
        this.autoLoanRenewChecker(true);
      }

      return nothing;
    });

    /**
     * detect click-event on document to close toast-template
     */
    document.addEventListener('click', e => {
      if (this.loanRenewHelper && this.loanRenewResult.secondsLeft > 0) {
        this.suppressToast = true;
      }

      // reload when user click on book-page and book is EXPIRED
      const hasExpired =
        'browsingExpired' in this.lendingStatus &&
        this.lendingStatus?.browsingExpired;
      if (hasExpired && e.target.nodeName !== 'IA-BOOK-ACTIONS') {
        window.location?.reload();
      }
    });

    /**
     * this event dispatched from timer-countdown component for:
     * 1. user turned book page after showing auto-returned warning message
     * 2. show warning message having remaining time
     * @see TimerCountdown::timerCountdown
     */
    this.addEventListener('IABookActions:loanRenew', async event => {
      await this.autoLoanRenewChecker(false);

      // show warning message with remaining time to auto returned it.
      if (this.loanRenewResult.renewNow === false) {
        this.loanRenewResult.secondsLeft = event.detail.secondsLeft;
        this.showToastMessage();
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
   * Show toast messages on some specific loan renew features. e.g.
   * - show message when book is auto renewed
   * - show message when book is expired
   * - show message having remaining time when book is about to auto returned
   */
  async showToastMessage() {
    if (this.suppressToast) return;

    const iaBookActions = document.querySelector('ia-book-actions')?.shadowRoot;
    if (!iaBookActions) return;

    let toastTemplate = iaBookActions.querySelector('toast-template');
    if (!toastTemplate) {
      toastTemplate = document.createElement('toast-template');
    }
    await iaBookActions.appendChild(toastTemplate);

    const config = new ToastConfig();
    config.dismisOnClick = true;
    config.texts = this.loanRenewHelper?.getMessageTexts(
      this.loanRenewResult.texts,
      this.loanRenewResult.secondsLeft
    );

    toastTemplate.showToast({
      config,
    });
  }

  async browseHasRenew() {
    const loanTime = await this.localCache.get(`${this.identifier}-loanTime`);
    const secondsLeft = (loanTime - new Date()) / 1000; // different in seconds

    const currStatus = {
      ...this.lendingStatus,
      user_has_browsed: true,
      browsingExpired: false,
      secondsLeftOnLoan: secondsLeft,
    };
    this.lendingStatus = currStatus;

    this.startBrowseTimer();
  }

  startBrowseTimer() {
    clearTimeout(this.browseTimer);
    const {
      browsingExpired,
      user_has_browsed,
      secondsLeftOnLoan,
    } = this.lendingStatus;
    if (!user_has_browsed || browsingExpired) {
      return;
    }

    this.browseTimer = setTimeout(() => {
      this.browseHasExpired();
    }, secondsLeftOnLoan * 1000);
  }

  /**
   * Execute when loan is expired
   */
  async browseHasExpired() {
    this.tokenPoller?.disconnectedInterval();

    const currStatus = { ...this.lendingStatus, browsingExpired: true };
    this.lendingStatus = currStatus;

    // remove respected key:value for loan-renew
    await this.localCache.delete(`${this.identifier}-loanTime`);
    await this.localCache.delete(`${this.identifier}-pageChangedTime`);

    // show message after browsed book is expired.
    this.loanRenewResult.renewNow = false;
    this.loanRenewResult.texts =
      'This book has been automatically returned due to inactivity.';

    this.suppressToast = false;
    this.showToastMessage();

    window?.Sentry?.captureMessage(sentryLogs.browseHasExpired);
  }

  /**
   * Reset timer animation state after book renewed
   */
  async resetTimerCountState() {
    const timerCountdown = this._shadowRoot.querySelector('timer-countdown');
    if (!timerCountdown) return;

    const secondsLeft = Number(this.lendingStatus.secondsLeftOnLoan);
    const strokeDashOffset =
      (secondsLeft / this.loanRenewTimeConfig.loanTotalTime) * 315;

    // set seconds left in loan expire
    timerCountdown.style?.setProperty('--secondsLeftOnLoan', `${secondsLeft}s`);

    // set circle stroke offset left in loan expire
    timerCountdown.style?.setProperty(
      '--strokeLeftOnLoan',
      `${Number(strokeDashOffset)}` // the perimeter of the circle = (π * 2 * radius)
    );

    const animationCircle = timerCountdown.shadowRoot.querySelector('.circle');
    animationCircle.style.animationName = 'none';
    setTimeout(() => {
      animationCircle.style.animationName = 'circletimer';
    }, 100);
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

  get timerCountdownTemplate() {
    return this.borrowType === 'browsed'
      ? html`<timer-countdown
          .secondsLeftOnLoan=${Number(this.lendingStatus.secondsLeftOnLoan)}
          .loanTotalTime=${this.loanRenewTimeConfig.loanTotalTime}
          .loanRenewAtLast=${this.loanRenewTimeConfig.loanRenewAtLast}
        ></timer-countdown>`
      : nothing;
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
        ?hasAdminAccess=${this.hasAdminAccess}
        ?disabled=${this.disableActionGroup}
        ?renewNow=${this.loanRenewResult.renewNow}
        @loanAutoRenewed=${this.handleLoanAutoRenewed}
        @lendingActionError=${this.handleLendingActionError}
        @toggleActionGroup=${this.handleToggleActionGroup}
      >
      </collapsible-action-group>
      ${this.textGroupTemplate} ${this.infoIconTemplate}
      ${this.timerCountdownTemplate}
    `;
  }

  /**
   * Execute after auto loan renewed is completed
   * - show success message
   * - then change the remaining time
   * - reset timer state
   */
  async handleLoanAutoRenewed() {
    if (this.loanRenewResult.renewNow) {
      this.tokenPoller?.disconnectedInterval();

      this.suppressToast = false;
      await this.showToastMessage();
      await this.browseHasRenew();
      await this.resetTimerCountState();

      window?.Sentry?.captureMessage(`${sentryLogs.bookHasRenewed}`);
      // TODO: analytics?? for consecutive renew.....

      // testing console....
      console.log(sentryLogs.bookHasRenewed, {
        loanRenewResult: this.loanRenewResult,
        browseHasRenew: this.lendingStatus.secondsLeftOnLoan,
        resetTimerCountState: this._shadowRoot.querySelector('timer-countdown'),
      });
    }
  }

  /**
   * enable access of borrowed/browsed books
   * @see LoanTokenPoller
   */
  startLoanTokenPoller() {
    if (this.tokenPoller) {
      window?.Sentry?.captureMessage(sentryLogs.clearTokenPoller);
      this.tokenPoller?.disconnectedInterval();
    }
    const successCallback = () => {
      this.lendingBarPostInit();
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

  /*
   * handle lending errors occure during different operation like
   * browse book, borrow book, borrowed book token etc...
   *
   * @event IABookActions#lendingActionError
   * @param {Object} event - The employee who is responsible for the project
   *  @param {string} event.detail.action - action when error occurred like 'browseBook', 'borrowBook'
   *  @param {string} event.detail.data.error - error message
   */
  handleLendingActionError(event) {
    // toggle activity loader
    this.handleToggleActionGroup();

    const action = event?.detail?.action;
    const errorMsg = event?.detail?.data?.error;

    if (errorMsg) this.showErrorModal(errorMsg, action);

    // if error related to loan token
    // - clear tokenPoller interval
    // - set user_has_browsed to `false`
    if (action === 'create_token') {
      this.tokenPoller?.disconnectedInterval();

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
    this.disableActionGroup = false;

    // check if this.modal passed as prop
    if (!this.modal) {
      this.modal = document.querySelector('modal-manager');

      // check the DOM if <modal-manager> already there
      if (!this.modal) this.modal = document.createElement('modal-manager');
    }

    this.modal.id = 'action-bar-modal';
    await document.body.appendChild(this.modal);

    const modalConfig = new ModalConfig({
      title: 'Lending error',
      message: errorMsg,
      headerColor: '#d9534f',
      showCloseButton: true,
    });

    if (action === 'create_token') {
      const refreshButton = html`<button
        style="background:none;font-size:inherit;border:0;padding:0;color:#0000ee;cursor:pointer;text-decoration:underline"
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

    this.modal.showModal({
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

      toast-template {
        --toastTopMargin: 80px;
        --toastBGColor: #333;
        --toastFontColor: #fff;
      }
    `;
  }
}

window.customElements.define('ia-book-actions', IABookActions);
