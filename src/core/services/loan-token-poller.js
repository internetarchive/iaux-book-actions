/* global: window */
import ActionsHandlerService from './actions-handler/actions-handler-service.js';
import LoanAnanlytics from './loan-analytics.js';
import { sentryLogs } from '../config/sentry-events.js';
import log from './log.js';

/**
 * This class is used to create loan token for borrowed books
 *
 * ActionsHandlerService is a function being used to execute
 */
export class LoanTokenPoller {
  constructor(id, borrowType, successCallback, errorCallback, pollerDelay) {
    this.identifier = id;
    this.borrowType = borrowType;
    this.successCallback = successCallback; // callback function to be called after loan token is created
    this.errorCallback = errorCallback; // callback function to be called after loan token is created
    this.pollerDelay = pollerDelay; // value in seconds

    this.loanTokenInterval = undefined;

    /**
     * loan analytics instance
     * @see loan-analytics.js
     */
    this.loanAnalytics = new LoanAnanlytics();

    this.bookAccessed();
  }

  disconnectedCallback() {
    window?.IALendingIntervals?.clearTokenPoller();
  }

  async bookAccessed() {
    if (this.borrowType) {
      // Do an initial token, then set an interval
      this.handleLoanTokenPoller(true);

      // if this.borrowType = adminBorrowed,
      // - we don't want to fetch token on interval
      // - the initial token is enough to set cookies for reading book and readaloud features
      if (this.borrowType !== 'adminBorrowed') {
        /**
         * set interval in window object
         * @see ia-lending-intervals.js
         */
        window.IALendingIntervals.tokenPoller = setInterval(() => {
          this.handleLoanTokenPoller();
        }, this.pollerDelay * 1000);
      }
    } else {
      window?.Sentry?.captureMessage(
        `${sentryLogs.bookAccessed} - not borrowed`
      );

      // if book is not browsed, just clear token polling interval
      this.disconnectedCallback();
    }
  }

  /**
   * @param {boolean} isInitial - the first create_token call right after
   *   bookAccessed()/a renewal, as opposed to a routine interval tick.
   */
  async handleLoanTokenPoller(isInitial = false) {
    const action = 'create_token';
    log('[LoanTokenPoller] create_token requested', {
      identifier: this.identifier,
      isInitial,
    });
    ActionsHandlerService({
      identifier: this.identifier,
      action,
      error: data => this.handleTokenError(data, isInitial),
      success: () => {
        log('[LoanTokenPoller] create_token succeeded', {
          identifier: this.identifier,
          isInitial,
        });
        if (isInitial) this.successCallback();
      },
    });
  }

  /**
   * Reports a create_token failure via errorCallback — no retry, it's
   * treated as terminal on the first failure. Split out from
   * handleLoanTokenPoller so it's directly testable without needing to
   * mock the network call.
   *
   * @param {Object} data - the error payload from ActionsHandlerService.
   * @param {boolean} isInitial
   */
  handleTokenError(data, isInitial) {
    const action = 'create_token';

    log('[LoanTokenPoller] create_token failed', {
      identifier: this.identifier,
      isInitial,
      error: data?.error,
    });

    // isInitial rides along so the consumer can distinguish "the book won't
    // open at all" from "a mid-read refresh blipped" — see
    // IABookActions.handleLendingActionError.
    this.errorCallback({ detail: { action, data, isInitial } });

    // send error to Sentry
    window?.Sentry?.captureMessage(
      `${sentryLogs.handleLoanTokenPoller} - Error: ${JSON.stringify(data)}`
    );

    // send LendingServiceError to GA
    this.loanAnalytics?.sendEvent(
      'LendingServiceLoanError',
      action,
      this.identifier
    );
  }
}
