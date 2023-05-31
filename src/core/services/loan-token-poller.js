/* global: window */
import ActionsHandlerService from './actions-handler/actions-handler-service.js';
import LoanAnanlytics from './loan-analytics.js';
import { sentryLogs } from '../config/sentry-events.js';

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

  async handleLoanTokenPoller(isInitial = false) {
    const action = 'create_token';
    ActionsHandlerService({
      identifier: this.identifier,
      action,
      error: data => {
        this.errorCallback({ detail: { action, data } });

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
      },
      success: () => {
        if (isInitial) this.successCallback();
      },
    });
  }
}
