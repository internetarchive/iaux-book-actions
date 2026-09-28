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
     * Lending::do_renew() (backend) deletes the old loan record and
     * writes a brand-new one on every renewal — this poller's initial
     * create_token call (fired right after a renewal re-establishes the
     * reading session) can race that write's propagation and come back
     * with "you do not currently have this book borrowed" even though
     * the loan is genuinely valid. Retry a few times with backoff instead
     * of giving up on the first attempt.
     */
    this.maxTokenRetries = 3;
    this.tokenRetryDelay = 1000; // ms, multiplied by attempt number

    /**
     * Handle for a pending retry, so teardown can cancel it. It's a bare
     * setTimeout rather than an IALendingIntervals entry, so without this
     * a retry scheduled just before the loan is returned would still fire
     * its create_token afterwards.
     */
    this.retryTimeout = undefined;

    /**
     * loan analytics instance
     * @see loan-analytics.js
     */
    this.loanAnalytics = new LoanAnanlytics();

    this.bookAccessed();
  }

  disconnectedCallback() {
    window?.IALendingIntervals?.clearTokenPoller();
    clearTimeout(this.retryTimeout);
    this.retryTimeout = undefined;
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
    log('[LoanTokenPoller] create_token requested', {
      identifier: this.identifier,
      isInitial,
      retryCount,
    });
    ActionsHandlerService({
      identifier: this.identifier,
      action,
      error: data => this.handleTokenError(data, isInitial, retryCount),
      success: () => {
        log('[LoanTokenPoller] create_token succeeded', {
          identifier: this.identifier,
          isInitial,
          retryCount,
        });
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

    log('[LoanTokenPoller] create_token failed', {
      identifier: this.identifier,
      isInitial,
      retryCount,
      isStaleLoanReadError,
      error: data?.error,
    });

    // The renewal write can be mid-propagation for an interval refresh too,
    // not just the initial call — a routine tick landing moments after a
    // renewal hits the same race. Retry both; isInitial only decides how a
    // final failure is reported, not whether it's worth retrying.
    if (isStaleLoanReadError && retryCount < this.maxTokenRetries) {
      const delay = this.tokenRetryDelay * (retryCount + 1);
      log(
        '[LoanTokenPoller] retrying create_token after stale-loan-read error',
        {
          identifier: this.identifier,
          nextRetryCount: retryCount + 1,
          delay,
        }
      );
      clearTimeout(this.retryTimeout);
      this.retryTimeout = setTimeout(() => {
        this.retryTimeout = undefined;
        this.handleLoanTokenPoller(isInitial, retryCount + 1);
      }, delay);
      return;
    }

    log('[LoanTokenPoller] giving up on create_token, reporting error', {
      identifier: this.identifier,
      isInitial,
      retryCount,
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
