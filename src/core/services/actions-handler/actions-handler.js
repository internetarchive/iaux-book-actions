import { LitElement } from 'lit';

import { URLHelper } from '../../config/url-helper.js';
import { sentryLogs } from '../../config/sentry-events.js';

import ActionsHandlerService from './actions-handler-service.js';
import * as Cookies from '../doc-cookies.js';

/**
 * These are callback functions calling from actions-config.js file.
 *
 * ActionsHandlerService is a function being used to execute
 * APIs based of the request made by user. It consist some parameters are as follows:-
 * 1. identifier: book name.
 */

export default class ActionsHandler extends LitElement {
  constructor() {
    super();

    /**
     * wait untill borrow is complete, then refresh the page
     * @type {number}
     */
    this.waitUntillBorrowComplete = 6; // in seconds

    /**
     * counts that we store in cookies to send google analytics
     */
    this.lendingEventCounts = {
      loan_count: 0,
      loan_auto_renew: 0,
      loan_auto_expired: 0,
    };

    // console.log(this.getLoanCountStorageKey)
    this.bindEvents();
  }

  /**
   * reponsible to sent events to GA
   *
   * @param {string} eventCategory
   * @param {string} eventAction
   * @memberof ActionsHandler
   */
  sendEvent(eventCategory, eventAction) {
    window?.archive_analytics?.send_event(
      eventCategory,
      eventAction,
      `identifier=${this.identifier}`
    );
  }

  get getLoanCountStorageKey() {
    return `book-loan-counts-${this.identifier}`;
  }

  bindEvents() {
    this.addEventListener('browseBook', ({ detail }) => {
      this.handleBrowseIt();
      this.setConsecutiveLoanCounts();
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('browseBookAgain', ({ detail }) => {
      this.handleBrowseIt();
      this.setConsecutiveLoanCounts('browseBookAgain');
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('loanRenewNow', ({ detail }) => {
      this.handleLoanRenewNow();
      this.setConsecutiveLoanCounts('loanRenewNow');
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('loanExpired', () => {
      this.setConsecutiveLoanCounts('loanExpired');
    });

    this.addEventListener('returnNow', ({ detail }) => {
      this.handleReturnIt();
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('borrowBook', ({ detail }) => {
      this.handleBorrowIt();
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('loginAndBorrow', ({ detail }) => {
      this.handleLoginOk();
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('leaveWaitlist', ({ detail }) => {
      this.handleRemoveFromWaitingList();
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('joinWaitlist', ({ detail }) => {
      this.handleReserveIt();
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('purchaseBook', ({ detail }) => {
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('adminAccess', ({ detail }) => {
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('exitAdminAccess', ({ detail }) => {
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('bookTitleBar', ({ detail }) => {
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });
  }

  handleBrowseIt() {
    console.log(this.identifier);
    const action = 'browse_book';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        this.setBrowseTimeSession();
        this.handleReadItNow();
      },
      error: data => {
        this.dispatchActionError(action, data);
      },
    });
  }

  handleLoanRenewNow() {
    const action = 'renew_loan';

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: data => {
        this.setBrowseTimeSession();
        this.dispatchEvent(
          new CustomEvent('loanAutoRenewed', {
            detail: { action, data },
          })
        );
      },
      error: data => {
        this.dispatchActionError(action, data);
      },
    });
  }

  handleReturnIt() {
    const action = 'return_loan';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        this.deleteLoanCookies();
        URLHelper.goToUrl(this.returnUrl, true);
      },
      error: data => {
        this.dispatchActionError(action, data);
      },
    });
  }

  handleBorrowIt() {
    const action = 'borrow_book';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        this.handleReadItNow();
      },
      error: data => {
        this.dispatchActionError(action, data);
      },
    });
  }

  handleReserveIt() {
    const action = 'join_waitlist';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        URLHelper.goToUrl(URLHelper.getRedirectUrl(), true);
      },
      error: data => {
        this.dispatchActionError(action, data);
      },
    });
  }

  handleRemoveFromWaitingList() {
    const action = 'leave_waitlist';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        URLHelper.goToUrl(URLHelper.getRedirectUrl(), true);
      },
      error: data => {
        this.dispatchActionError(action, data);
      },
    });
  }

  /**
   * Dispatches event when an error occured on action
   * Notes:- toggle <collapsible-action-group> visibility (enable/disable).
   *
   * @param { String } action - name of action like browse_book, borrow_book
   * @param { Object } data - erroneous response from api call
   *
   * @fires ActionsHandler#lendingActionError
   */
  dispatchActionError(action, data = {}) {
    // send LendingServiceError to GA
    this.sendEvent('LendingServiceError', action);

    this.dispatchEvent(
      new CustomEvent('lendingActionError', {
        detail: { action, data },
      })
    );
  }

  /**
   * Dispatches event when patron is clicked on action buttons.
   * Notes:- toggle <collapsible-action-group> disable/enable.
   *
   * @fires ActionsHandler#toggleActionGroup
   */
  dispatchToggleActionGroup() {
    this.dispatchEvent(new CustomEvent('toggleActionGroup'));
  }

  handleLoginOk() {
    /* eslint class-methods-use-this: "off" */
    const target = `/account/login?referer=${encodeURIComponent(
      URLHelper.getRedirectUrl()
    )}`;
    URLHelper.goToUrl(target, true);
  }

  handleReadItNow(extraParam) {
    const currentParams = new URLSearchParams(window.location.search);

    if (extraParam) {
      // append extraParam key-value in currentParams
      const extraParams = new URLSearchParams(extraParam);
      for (const [key, val] of extraParams.entries()) {
        currentParams.append(key, val);
      }
    }

    const convertedToString = currentParams.toString();
    const newParams = convertedToString ? `?${convertedToString}` : '';

    // get current URL and add query parameters including search
    const redirectTo =
      window.location.origin + window.location.pathname + newParams;

    // redirection on details page after 5 seconds because borrowing book takes time to create item creation.
    setTimeout(() => {
      URLHelper.goToUrl(redirectTo, true);
    }, this.waitUntillBorrowComplete * 1000);
  }

  /**
   * store consecutive one hour loan counts in cookies for GA
   *
   * There are two possible way of consecutive loan
   * - book is browsed again just after getting expired
   * - book loan is auto renewed for another hour
   *
   * @param {string} action - user action on book
   * @return {void}
   * @memberof ActionsHandler
   */
  async setConsecutiveLoanCounts(action = '') {
    try {
      await this.getConsecutiveLoanRecord(action);

      const date = new Date();
      date.setHours(date.getHours() + 2); // 2 hours

      // set new value
      Cookies.setItem(
        this.getLoanCountStorageKey,
        JSON.stringify(this.lendingEventCounts),
        date,
        '/'
      );
    } catch (error) {
      console.log(error);
      window?.Sentry?.captureException(
        `${sentryLogs.setConsecutiveLoanCounts} - Error: ${error}`
      );
      this.sendEvent('Cookies-Error-Actions', error);
    }
  }

  /**
   * Get consecutive loan count records from cookies for GA
   *
   * @param {string} action
   * @return {object} { count, storageKey }
   * @memberof ActionsHandler
   */
  async getConsecutiveLoanRecord(action) {
    let newCount = 1;
    let existingCount = 1;

    // storage key for consecutive loan count
    let storageKey = `loan_count`;

    if (action === 'loanRenewNow') {
      storageKey = `loan_auto_renew`;
    }

    if (action === 'loanExpired') {
      storageKey = `loan_auto_expired`;
    }

    // browseBookAgain and loanRenew events needs to track
    if (['browseBookAgain', 'loanRenewNow', 'loanExpired'].includes(action)) {
      const loanCountRecords = JSON.parse(
        Cookies.getItem(this.getLoanCountStorageKey)
      );
      if (loanCountRecords !== null) {
        existingCount = loanCountRecords[`${storageKey}`];

        // if found existingCount, just increase by 1
        newCount = existingCount ? Number(existingCount) + 1 : 1;

        console.log(existingCount, newCount);
      }
    }

    this.lendingEventCounts[`${storageKey}`] = newCount;
  }

  /**
   * set browse time in indexedDB
   */
  async setBrowseTimeSession() {
    try {
      const expireDate = new Date(
        new Date().getTime() + this.loanTotalTime * 1000
      );

      // set a value
      await this.localCache.set({
        key: `${this.identifier}-loanTime`,
        value: expireDate,
        ttl: Number(this.loanTotalTime),
      });

      // delete pageChangedTime when book is auto renew at nth minute
      await this.localCache.delete(`${this.identifier}-pageChangedTime`);
    } catch (error) {
      console.log(error);
    }
  }

  deleteLoanCookies() {
    const date = new Date();
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000); // one day ago

    Cookies.setItem(
      `loan-${this.identifier}=""`,
      '',
      date,
      '/',
      '.archive.org'
    );
    Cookies.setItem(
      `br-loan-${this.identifier}=""`,
      '',
      date,
      '/',
      '.archive.org'
    );
  }
}
