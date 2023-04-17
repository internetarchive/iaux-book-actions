import { LitElement } from 'lit';

import { URLHelper } from '../../config/url-helper.js';

import ActionsHandlerService from './actions-handler-service.js';
import LoanAnanlytics from '../loan-analytics.js';
import * as Cookies from '../doc-cookies.js';

/**
 * These are callback functions calling from actions-config.js file.
 *
 * ActionsHandlerService is a function being used to execute APIs based of the request made by user.
 *
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
     * bind events for lending bar
     * @type {object}
     */
    this.loanAnanlytics = new LoanAnanlytics();

    /**
     * bind events for lending bar
     * @type {Function}
     */
    this.bindEvents();
  }

  bindEvents() {
    this.addEventListener('browseBook', () => {
      this.handleBrowseIt();
      this.loanAnanlytics?.storeLoanStatsCount(this.identifier, 'browse');
    });

    this.addEventListener('browseBookAgain', () => {
      this.handleBrowseIt();
      this.loanAnanlytics?.storeLoanStatsCount(this.identifier, 'browseagain');
    });

    this.addEventListener('autoRenew', () => {
      this.handleLoanRenewNow();
      this.loanAnanlytics?.storeLoanStatsCount(this.identifier, 'autorenew');
    });

    this.addEventListener('autoReturn', () => {
      this.handleReturnIt();
      this.loanAnanlytics?.storeLoanStatsCount(this.identifier, 'autoreturn');
    });

    this.addEventListener('returnNow', ({ detail }) => {
      // use loan stats count when 1-hour borrow is active
      if (detail?.borrowType === 'browse') {
        this.loanAnanlytics?.storeLoanStatsCount(this.identifier, 'return');
      }

      this.handleReturnIt('returnNow');

      // send these events if 14-day borrow return
      if (detail?.borrowType === 'borrow') {
        const { category, action } = detail.event;
        this.loanAnanlytics?.sendEvent(category, action, this.identifier);
      }
    });

    this.addEventListener('borrowBook', ({ detail }) => {
      this.handleBorrowIt();
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.addEventListener('loginAndBorrow', ({ detail }) => {
      this.handleLoginOk();
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.addEventListener('leaveWaitlist', ({ detail }) => {
      this.handleRemoveFromWaitingList();
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.addEventListener('joinWaitlist', ({ detail }) => {
      this.handleReserveIt();
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.addEventListener('purchaseBook', ({ detail }) => {
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.addEventListener('adminAccess', ({ detail }) => {
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.addEventListener('exitAdminAccess', ({ detail }) => {
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });

    this.addEventListener('bookTitleBar', ({ detail }) => {
      const { category, action } = detail.event;
      this.loanAnanlytics?.sendEvent(category, action, this.identifier);
    });
  }

  handleBrowseIt() {
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

  /**
   * excute function when loan is returning
   *
   * @param {string} type - loan return type returnNow|''
   */
  handleReturnIt(type = '') {
    const action = 'return_loan';

    if (type === 'returnNow') this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        this.deleteLoanCookies();

        if (type === 'returnNow') URLHelper.goToUrl(this.returnUrl, true);
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
    this.loanAnanlytics?.sendEvent('LendingServiceError', action);

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
