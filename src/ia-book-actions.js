/* eslint-disable camelcase */
import { html, css, LitElement, nothing } from 'lit';

import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import { ModalConfig } from '@internetarchive/modal-manager';

import './components/collapsible-action-group.js';
import './components/book-title-bar.js';
import './components/text-group.js';
import './components/info-icon.js';
import './components/timer-countdown.js';
import './components/toast-message.js';

import { GetLendingActions } from './core/services/get-lending-actions.js';
import { mobileContainerWidth } from './core/config/constants.js';
import { LoanTokenPoller } from './core/services/loan-token-poller.js';
import { OneHourAutoRenew } from './core/services/one-hour-auto-renew.js';

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
      autoRenew: { type: Boolean },
      sharedObserver: { attribute: false },
      disableActionGroup: { type: Boolean },
      modal: { Object },
      tokenDelay: { type: Number },
      toastTexts: { type: String },
      remainingTime: { type: Number },
      resetTimerCountdown: { type: Boolean },
      localCache: { type: Object },
      autoRenewTimeConfig: { type: Object },
      browseAgainNow: { type: Boolean },
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
    this.autoRenew = false;
    this.sharedObserver = undefined;
    this.disableActionGroup = false;
    this.modal = undefined;
    this.tokenDelay = 120000; // 2 minutes
    this.localCache = {},
    this.autoRenewTimeConfig = {},

    // private props
    this.primaryActions = [];
    this.primaryTitle = '';
    this.primaryColor = 'primary';
    this.secondaryActions = [];
    this.lendingOptions = {};
    this.borrowType = ''; // (browsed|borrowed)
    this.consecutiveLoanCounts = 1; // consecutive loan count
    this.browseAgainNow = false;

    // show toast-message for auto return message
    this.hideToast = true;
    this.autoReturnMessage = 'This book will be automatically returned in 15 seconds unless you turn a page.';
    this.autoRenewMessage = 'This book has been renewed for another hour.';

    // dispatched this event from timer-countdown 
    this.addEventListener('autoReturnWarning', event => {
      // const dd = this.autoRenew1 = new OneHourAutoRenew(
      //   event.detail.bookPageChange,
      //   this.identifier,
      //   this.localCache,
      //   this.autoRenewTimeConfig,
      // );
      // this.toastTexts = dd.resultRes.toastTexts;
      // this.hideToast = dd.resultRes.hideToast;
      this.handleBookAutoRenew(event);
    });

    // dispatched this event from bookreader side 
    this.addEventListener('bookPageFlip', event => {
      // console.log(e)
      // const dd = this.autoRenew1 = new OneHourAutoRenew(
      //   event.detail.bookPageChange,
      //   this.identifier,
      //   this.localCache,
      //   this.autoRenewTimeConfig,
      // );
      // this.toastTexts = dd.resultRes.toastTexts;
      // this.hideToast = dd.resultRes.hideToast;
      // console.log(dd.resultRes)
      this.handleBookAutoRenew(event);
      // this.browseAgainNow = true;
    });

    this.resetTimerCountdown = false;
  }

  disconnectedCallback() {
    this.tokenPoller?.disconnectedInterval();
    window?.Sentry?.captureMessage('disconnectedCallback');
    this.disconnectResizeObserver();
  }

  firstUpdated() {
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

    if (changed.has('autoRenew')) {
      this.resetTimerCountdown = true;
    }
    if (changed.has('sharedObserver')) {
      this.disconnectResizeObserver();
      this.setupResizeObserver();
    }
  }

  async browseHasExpired() {
    const currStatus = { ...this.lendingStatus, browsingExpired: true };
    this.lendingStatus = currStatus;

    // remove respected key:value
    await this.localCache.delete(`${this.identifier}-loanTime`);
    await this.localCache.delete(`${this.identifier}-pageFlipTime`);

    // show message after browsed book is expired.
    this.toastTexts = 'This book has been automatically returned due to inactivity.';
  }

  async browseHasRenew() {
    const currStatus = { ...this.lendingStatus, secondsLeftOnLoan: 61 };
    this.lendingStatus = currStatus;
  }

  startBrowseTimer() {
    const {
      browsingExpired,
      user_has_browsed,
      secondsLeftOnLoan,
    } = this.lendingStatus;
    if (!user_has_browsed || browsingExpired) {
      return;
    }

    // expired book and show browse again button
    const timeLeft = secondsLeftOnLoan * 1000;
    setTimeout(() => {
      this.browseHasExpired();
    }, timeLeft);
  }

  async handleBookAutoRenew(event) {
    try {
      const bookPageChange = event.detail.bookPageChange;
      const currentDate = new Date();

      const {
        totalTime, // 60
        autoRenewCheckerAtLast, // 50
        autoRenewVisitedInLast, // 15
      } = this.autoRenewTimeConfig;

      const loanTime = await this.localCache.get(`${this.identifier}-loanTime`);
      const lastPageFlipTime = await this.localCache.get(`${this.identifier}-pageFlipTime`);

      const lastFlipTimeFrame = await this.changeTime(
        currentDate,
        autoRenewVisitedInLast,
        'sub'
      ); // 15 seconds

      console.log(lastPageFlipTime, lastFlipTimeFrame)

      // if page is not flipped in last 15 minutes,
      // instantaly renew it if user viewed new page in last 10 minutes
      if (bookPageChange === true) {
        const lastTimeFrame = await this.changeTime(
          loanTime,
          totalTime - autoRenewCheckerAtLast,
          'add'
        ); // 50 seconds
        console.log('page flipped!')

        if (currentDate >= lastTimeFrame) {
          console.log('1 YES NOW BORROW IT AGAIN NOW!');
          this.toastTexts = this.autoRenewMessage;
          this.browseAgainNow = true;
          this.hideToast = false;
          await this.browseHasRenew();
        }

        return nothing // early return
      }

      console.log(lastPageFlipTime, lastFlipTimeFrame)
      if (lastPageFlipTime === undefined) { // not viewed
        console.log('2 DON\'T BORROW IT!');
        this.toastTexts = this.autoReturnMessage;
        this.hideToast = false;
      } else if (lastPageFlipTime >= lastFlipTimeFrame) { // viewed in last time frame
        console.log('3 YES BORROW IT AGAIN!');
        this.toastTexts = this.autoRenewMessage;
        this.browseAgainNow = true;
        this.hideToast = false;
        await this.browseHasRenew();
      } else if (lastPageFlipTime <= lastFlipTimeFrame) { // viewed but not in last time frame
        console.log('4 DON\'T BORROW IT!');
        this.toastTexts = this.autoReturnMessage;
        this.hideToast = false;
      } else {
        this.browseAgainNow = true;
        console.log('5 YES NOW BORROW IT AGAIN NOW!');
      }
    } catch (error) {
      console.log(error)
    }
  }

  async changeTime(date, minutes, op) {
    if (date === undefined) return undefined;
    
    if (op === 'sub') {
      return new Date(date.getTime() - minutes * 1000);
    }

    return new Date(date.getTime() + minutes * 1000);
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

    this.borrowType = actions.borrowType;
    this.remainingTime = this.lendingStatus.secondsLeftOnLoan;

    const hasExpired =
      'browsingExpired' in this.lendingStatus &&
      this.lendingStatus?.browsingExpired;
    if (hasExpired) {
      window?.Sentry?.captureMessage('setupLendingToolbarActions hasExpired');
      this.tokenPoller?.disconnectedInterval();
      /** Global event - always fire */
      this.dispatchEvent(
        new Event(events.browseExpired, {
          bubbles: true,
          cancelable: false,
          composed: true,
        })
      );
      return;
    }

    if (this.borrowType === 'browsed') {
      // start timer for browsed.
      // when browse is completed, we shows browse-again button
      this.startBrowseTimer();
    }

    // early return if not borrowed or no action-bar
    if (!this.borrowType || this.barType === 'title') {
      this.lendingBarPostInit();
      return;
    }

    this.startLoanTokenPoller();
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
          time=${Number(this.remainingTime)}
          .autoRenewCheckerAtLast=${this.autoRenewTimeConfig.autoRenewCheckerAtLast}
          ?resetTimerCountdown=${this.resetTimerCountdown}
        ></timer-countdown>`
      : nothing;
  }

  get toastMessageTemplate() {
    return html`
      <toast-message
        .texts=${this.toastTexts}
        .dismisOnClick="1"
        ?hideToast=${this.hideToast}
      ></toast-message>
    `;
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
        .autoRenew=${this.autoRenew}
        ?hasAdminAccess=${this.hasAdminAccess}
        ?disabled=${this.disableActionGroup}
        ?browseAgainNow=${this.browseAgainNow}
        @lendingActionError=${this.handleLendingActionError}
        @toggleActionGroup=${this.handleToggleActionGroup}
      >
      </collapsible-action-group>
      ${this.textGroupTemplate} ${this.infoIconTemplate}
      ${this.timerCountdownTemplate} ${this.toastMessageTemplate}
    `;
  }

  /**
   * enable access of borrowed/browsed books
   */
  startLoanTokenPoller() {
    if (this.tokenPoller) {
      window?.Sentry?.captureMessage('startLoanTokenPoller clearing interval');
      this.tokenPoller.disconnectedInterval();
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
      this.tokenDelay // 1000 ms = 1 sec
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
        >`;
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
    return html`<text-group
      textClass=${this.textClass}
      texts=${this.primaryTitle}
    >
    </text-group>`;
  }

  get hasAdminAccess() {
    return !this.lendingStatus.userHasBorrowed && this.lendingStatus.isAdmin;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background: var(--primaryBGColor, #000);
        color: var(--primaryTextColor, #fff);
      }
      .lending-wrapper {
        width: 100%;
        margin: 0 auto;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
      }

      toast-message {
        --messageHeightFromTop: 18%;
      }
    `;
  }
}

window.customElements.define('ia-book-actions', IABookActions);
