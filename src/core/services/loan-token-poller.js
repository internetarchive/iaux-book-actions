import ActionsHandlerService from './actions-handler/actions-handler-service.js';
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
    this.pollerDelay = pollerDelay; // value in ms (1000 ms = 1 sec)

    this.loanTokenInterval = undefined;
    this.enableBookAccess();
  }

  disconnectedInterval() {
    clearInterval(this.loanTokenInterval);
    this.loanTokenInterval = undefined;

    // temporary disabling sentry notice
    // as message is informational, not critical nor an error.
    // also, as of 11/28/2022, JS build maps are not working properly on petabox
    // and as a result, this comment is not properly grouped.
    // if (window.Sentry) {
    //   window?.Sentry?.captureMessage('loan token interval cleared');
    // }
  }

  async enableBookAccess() {
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
          window?.Sentry?.captureException(error);
          this.sendEvent('Cookies-Error-Token', error);
        }
      }

      // Do an initial token, then set an interval
      this.handleLoanTokenPoller(true);

      // if this.borrowType = adminBorrowed,
      // - we don't want to fetch token on interval
      // - the initial token is enough to set cookies for reading book and readaloud features
      if (this.borrowType !== 'adminBorrowed') {
        this.loanTokenInterval = setInterval(() => {
          this.handleLoanTokenPoller();
        }, this.pollerDelay);
      }

      // event category and action for browsing book access
      const category = `${this.borrowType}BookAccess`;
      const action = `${
        this.borrowType === 'browsed' ? 'BrowseCounts-' : 'Counts-'
      }${consecutiveLoanCounts}`;

      this.sendEvent(category, action);
    } else {
      window?.Sentry?.captureMessage('enableBookAccess error');
      // if book is not browsed, just clear token polling interval
      this.disconnectedInterval(); // stop token fetch api
    }
  }

  sendEvent(eventCategory, eventAction) {
    window?.archive_analytics?.send_event(
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
        window?.Sentry?.captureMessage(
          'handleLoanTokenPoller error',
          JSON.stringify(data)
        );
        this.disconnectedInterval(); // stop token fetch api
        this.errorCallback({ detail: { action, data } });
        // send LendingServiceError to GA
        this.sendEvent('LendingServiceLoanError', action);
      },
      success: () => {
        if (isInitial) this.successCallback();
      },
    });
  }
}
