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
     * Lending::do_renew() (backend) deletes the old loan record and
     * writes a brand-new one on every renewal — this poller's initial
     * create_token call (fired right after a renewal re-establishes the
     * reading session) can race that write's propagation and come back
     * with "you do not currently have this book borrowed" even though
     * the loan is genuinely valid. Retry a few times with backoff instead
     * of giving up on the first attempt.
     */
    this.maxInitialTokenRetries = 3;
    this.initialTokenRetryDelay = 1000; // ms, multiplied by attempt number

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
   * @param {number} retryCount - internal, counts retries of the initial call.
   */
  async handleLoanTokenPoller(isInitial = false, retryCount = 0) {
    const action = 'create_token';
    ActionsHandlerService({
      identifier: this.identifier,
      action,
      error: data => this.handleTokenError(data, isInitial, retryCount),
      success: () => {
        if (isInitial) this.successCallback();
      },
    });
  }

  /**
   * Decide whether a create_token failure should be retried (a stale
   * read of the loan record right after a renewal, see the constructor
   * comment) or reported via errorCallback. Split out from
   * handleLoanTokenPoller so it's directly testable without needing to
   * mock the network call.
   *
   * @param {Object} data - the error payload from ActionsHandlerService.
   * @param {boolean} isInitial
   * @param {number} retryCount
   */
  handleTokenError(data, isInitial, retryCount) {
    const action = 'create_token';
    const isStaleLoanReadError =
      typeof data?.error === 'string' &&
      /do not currently have this book borrowed/i.test(data.error);

    if (
      isInitial &&
      isStaleLoanReadError &&
      retryCount < this.maxInitialTokenRetries
    ) {
      const delay = this.initialTokenRetryDelay * (retryCount + 1);
      setTimeout(() => {
        this.handleLoanTokenPoller(true, retryCount + 1);
      }, delay);
      return;
    }

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
  }
}
