import ActionsHandlerService from './actions-handler/actions-handler-service.js';
import { sentryLogs } from '../config/sentry-events.js';

import * as Cookies from './doc-cookies.js';

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
    this.bookAccessed();
  }

  disconnectedCallback() {
    window?.IALendingIntervals?.clearTokenPoller();
  }

  async bookAccessed() {
    let consecutiveLoanCounts = 1;

    if (this.borrowType) {
      // send consecutiveLoanCounts for browsed books only.
      if (this.borrowType === 'browsed') {
        try {
          const existingCount = Cookies.getItem(
            `loan-count-${this.identifier}`
          );
          consecutiveLoanCounts = existingCount ?? 1;
        } catch (error) {
          window?.Sentry?.captureException(
            `${sentryLogs.enableBookAcces} - CookieError: ${error}`
          );
          this.sendEvent('Cookies-Error-Token', error);
        }
      }

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

      // event category and action for browsing book access
      const category = `${this.borrowType}BookAccess`;
      const action = `${
        this.borrowType === 'browsed' ? 'BrowseCounts-' : 'Counts-'
      }${consecutiveLoanCounts}`;

      this.sendEvent(category, action);
    } else {
      window?.Sentry?.captureMessage(
        `${sentryLogs.bookAccessed} - not borrowed`
      );

      // if book is not browsed, just clear token polling interval
      this.disconnectedCallback();
    }
  }

  sendEvent(eventCategory, eventAction) {
    window?.archive_analytics?.send_event_no_sampling(
      eventCategory,
      eventAction,
      `identifier=${this.identifier}`
    );
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
        this.sendEvent('LendingServiceLoanError', action);
      },
      success: () => {
        if (isInitial) this.successCallback();
      },
    });
  }
}
