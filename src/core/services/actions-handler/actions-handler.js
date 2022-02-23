import { LitElement } from 'lit-element';
import { URLHelper } from '../../config/url-helper.js';
import ActionsHandlerService from './actions-handler-service.js';

/**
 * These are callback functions calling from actions-config.js file.
 *
 * ActionsHandlerService is a function being used to execute
 * APIs based of the request made by user. It consist some parameters are as follows:-
 * 1. identifier: book name.
 */

export default class ActionsHandler extends LitElement {
  constructor(identifier) {
    super();
    this.identifier = identifier;
    this.ajaxTimeout = 7000;
    this.loanTokenPollingDelay =
      window.location.pathname === '/demo/' ? 2000 : 120000; // 120000 ms = 2 min
    this.loanTokenInterval = undefined;
    this.bindEvents();
  }

  disconnectedCallback() {
    this.loanTokenInterval = undefined;
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

  bindEvents() {
    this.addEventListener('browseBook', ({ detail }) => {
      this.handleBrowseIt();
      this.setConsecutiveLoanCounts();
      const { category, action } = detail.event;
      this.sendEvent(category, action);
    });

    this.addEventListener('browseBookAgain', ({ detail }) => {
      this.handleBrowseIt();
      this.setConsecutiveLoanCounts('browseAgain');
      const { category, action } = detail.event;
      this.sendEvent(category, action);
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

    this.addEventListener('enableBookAccess', ({ detail }) => {
      const borrowType = detail?.borrowType;

      // fetch loan token for browsed/borrowed book and set an interval
      if (borrowType) {
        this.loanTokenInterval = setInterval(() => {
          this.handleLoanTokenPoller();
        }, this.loanTokenPollingDelay);

        const { category, action } = detail?.event;
        this.sendEvent(category, action);
      } else {
        // if book is not browsed, just clear token polling interval
        clearInterval(this.loanTokenInterval);
      }
    });
  }

  handleBrowseIt() {
    const action = 'browse_book';
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

  handleReturnIt() {
    const action = 'return_loan';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        this.deleteLoanCookies();
        URLHelper.goToUrl(`/details/${this.identifier}`, true);
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

  handleLoanTokenPoller() {
    const action = 'create_token';
    ActionsHandlerService({
      identifier: this.identifier,
      action,
      error: data => {
        this.dispatchActionError(action, data);
        clearInterval(this.loanTokenInterval); // stop token fetch api
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
    }, this.ajaxTimeout);
  }

  // save consecutive loan count for borrow
  setConsecutiveLoanCounts(action = '') {
    const { localStorage } = window;
    if (localStorage) {
      let newCount = 1;
      const storageKey = `consecutive-loan-count`;
      const existingCount = Number(localStorage.getItem(storageKey));

      // want to increase browse-count by 1 if,
      // you consecutive reading a book.
      if (action === 'browseAgain') {
        newCount = existingCount ? existingCount + 1 : 1;
      }
      localStorage.setItem(storageKey, newCount);
    }
  }

  deleteLoanCookies() {
    const date = new Date();
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000); // one day ago
    const expiry = date.toGMTString();
    let cookie = `loan-${this.identifier}=""`;
    cookie += `; expires=${expiry}`;
    cookie += '; path=/; domain=.archive.org;';
    document.cookie = cookie;

    cookie = `br-loan-${this.identifier}=""`;
    cookie += `; expires=${expiry}`;
    cookie += '; path=/; domain=.archive.org;';
    document.cookie = cookie;
  }
}
