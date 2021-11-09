import { LitElement } from 'lit-element';
import { URLHelper } from '../../config/url-helper.js';
import ActionsHandlerService from './actions-handler-service.js';

/**
 * These are callback functions calling from actions-config.js file.
 *
 * ActionsHandlerService is a function being used to execute
 * APIs based of the request made by user. It consist some parameters are as follows:-
 * 1. action: action name like browse_book, return_book, borrow_book etc...
 * 2. identifier: book name.
 * 3. success: This is callback function which will be executed after the API request
 *    return reponse as a success.
 */

export default class ActionsHandler extends LitElement {
  constructor(identifier) {
    super();
    this.identifier = identifier;
    this.ajaxTimeout = 5000;
    this.bindEvents();
  }

  bindEvents() {
    this.addEventListener('browseBook', ({ detail }) => {
      this.handleBrowseIt();
      console?.log(`Analytics click fired: ${detail.event}`);
    });

    this.addEventListener('returnNow', ({ detail }) => {
      this.handleReturnIt(detail.bookUrl);
      console?.log(`Analytics click fired: ${detail.event}`);
    });

    this.addEventListener('borrowBook', ({ detail }) => {
      this.handleBorrowIt();
      console?.log(`Analytics click fired: ${detail.event}`);
    });

    this.addEventListener('loginAndBorrow', ({ detail }) => {
      this.handleLoginOk();
      console?.log(`Analytics click fired: ${detail.event}`);
    });

    this.addEventListener('leaveWaitlist', ({ detail }) => {
      this.handleRemoveFromWaitingList();
      console?.log(`Analytics click fired: ${detail.event}`);
    });

    this.addEventListener('joinWaitlist', ({ detail }) => {
      this.handleReserveIt();
      console?.log(`Analytics click fired: ${detail.event}`);
    });

    this.addEventListener('purchaseBook', ({ detail }) => {
      console?.log(`Analytics click fired: ${detail.event}`);
    });

    this.addEventListener('adminAccess', ({ detail }) => {
      console?.log(`Analytics click fired: ${detail.event}`);
    });

    this.addEventListener('exitAdminAccess', ({ detail }) => {
      console?.log(`Analytics click fired: ${detail.event}`);
    });
  }

  handleBrowseIt() {
    ActionsHandlerService({
      action: 'browse_book',
      identifier: this.identifier,
      success: () => {
        this.handleReadItNow();
      },
    });
  }

  handleReturnIt() {
    ActionsHandlerService({
      action: 'return_loan',
      identifier: this.identifier,
      success: () => {
        this.deleteLoanCookies();
        URLHelper.goToUrl(`/details/${this.identifier}`, true);
      },
    });
  }

  handleBorrowIt() {
    ActionsHandlerService({
      action: 'borrow_book',
      identifier: this.identifier,
      success: () => {
        this.handleReadItNow();
      },
    });
  }

  handleReserveIt() {
    ActionsHandlerService({
      action: 'join_waitlist',
      identifier: this.identifier,
      success: () => {
        URLHelper.goToUrl(URLHelper.getRedirectUrl(), true);
      },
    });
  }

  handleRemoveFromWaitingList() {
    ActionsHandlerService({
      action: 'leave_waitlist',
      identifier: this.identifier,
      success: () => {
        URLHelper.goToUrl(URLHelper.getRedirectUrl(), true);
      },
    });
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

    // Delete the ?q= parameter just after borrow a book. see: WEBDEV-3979
    currentParams.delete('q');

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
