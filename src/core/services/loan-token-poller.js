import { LitElement } from 'lit-element';
import { LocalCache } from '@internetarchive/local-cache';

import ActionsHandlerService from './actions-handler/actions-handler-service.js';

/**
 * This class is used to create loan token for borrowed books
 *
 * ActionsHandlerService is a function being used to execute
 */
export class LoanTokenPoller extends LitElement {
  constructor() {
    super();
    this.identifier = '';
    this.callback = () => {};
    this.loanTokenPollingDelay =
      window.location.pathname === '/demo/' ? 2000 : 120000; // 120000 ms = 2 min
    this.loanTokenInterval = undefined;
    this.localCache = new LocalCache();
  }

  disconnectedCallback() {
    this.loanTokenInterval = undefined;
  }

  async enableBookAccess(identifier, borrowType, callback) {
    this.identifier = identifier;
    this.callback = callback;
    let consecutiveLoanCounts = 1;

    if (borrowType) {
      // send consecutiveLoanCounts for browsed books only.
      if (borrowType === 'browsed') {
        try {
          const existingCount = await this.localCache.get(
            'consecutive-loan-count'
          );
          consecutiveLoanCounts = existingCount ?? 1;
        } catch (error) {
          console.log(error);
        }
      }

      // Do an initial token, then set an interval
      this.handleLoanTokenPoller();

      this.loanTokenInterval = setInterval(() => {
        this.handleLoanTokenPoller();
      }, this.loanTokenPollingDelay);

      // event category and action for browsing book access
      const category = `${borrowType}BookAccess`;
      const action = `${
        borrowType === 'browsed' ? 'BrowseCounts-' : 'Counts-'
      }${consecutiveLoanCounts}`;
      console.log(consecutiveLoanCounts);
      this.sendEvent(category, action);
    } else {
      // if book is not browsed, just clear token polling interval
      clearInterval(this.loanTokenInterval);
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

  async handleLoanTokenPoller() {
    const action = 'create_token';
    // await new Promise(r => setTimeout(r, 3000));
    console.log(this.callback);
    ActionsHandlerService({
      identifier: this.identifier,
      action,
      error: data => {
        console.log('error', data);
        this.handleLendingActionError({ detail: { action, data } });
        clearInterval(this.loanTokenInterval); // stop token fetch api
        this.callback();
      },
      success: () => {
        this.callback();
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
    console.log('disptaced');
    this.dispatchEvent(
      new CustomEvent('lendingActionError', {
        detail: { action, data },
      })
    );
  }
}
