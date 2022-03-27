import { LocalCache } from '@internetarchive/local-cache';
import ActionsHandlerService from './actions-handler/actions-handler-service.js';

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
    this.localCache = new LocalCache();
    this.enableBookAccess();
  }

  disconnectedInterval() {
    clearInterval(this.loanTokenInterval);
    this.loanTokenInterval = undefined;
  }

  async enableBookAccess() {
    let consecutiveLoanCounts = 1;

    if (this.borrowType) {
      // send consecutiveLoanCounts for browsed books only.
      if (this.borrowType === 'browsed') {
        try {
          const existingCount = await this.localCache.get(
            `loan-count-${this.identifier}`
          );
          consecutiveLoanCounts = existingCount ?? 1;
        } catch (error) {
          this.sendEvent('indexedDB-Error-Token', error);
        }
      }

      // Do an initial token, then set an interval
      this.handleLoanTokenPoller(true);

      this.loanTokenInterval = setInterval(() => {
        this.handleLoanTokenPoller();
      }, this.pollerDelay);

      // event category and action for browsing book access
      const category = `${this.borrowType}BookAccess`;
      const action = `${
        this.borrowType === 'browsed' ? 'BrowseCounts-' : 'Counts-'
      }${consecutiveLoanCounts}`;

      this.sendEvent(category, action);
    } else {
      // if book is not browsed, just clear token polling interval
      this.disconnectedInterval(); // stop token fetch api
    }
  }

  sendEvent(eventCategory, eventAction) {
    // eslint-disable-next-line no-console
    console?.log('Book action: ', { eventCategory, eventAction });
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
        this.disconnectedInterval(); // stop token fetch api
        this.errorCallback({ detail: { action, data } });
      },
      success: () => {
        if (isInitial) this.successCallback();
      },
    });
  }
}
