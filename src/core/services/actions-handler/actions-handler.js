/* eslint class-methods-use-this: "off" */
/* eslint no-console: "off" */
import { URLHelper } from '../../config/url-helper.js';
import ActionsHandlerService from './actions-handler-service.js';

export default class ActionsHandler {
  constructor(identifier, lendingStatus) {
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.userid = '@neeraj-archive';
  }

  handleBrowseIt() {
    return () => {
      ActionsHandlerService({
        action: 'browse_book',
        identifier: this.identifier,
        success: () => {
          this.handleReadItNow();
        },
      });
      console.log('Book is browsed successfully!');
    };
  }

  handleReturnIt() {
    return () => {
      ActionsHandlerService({
        action: 'return_loan',
        identifier: this.identifier,
        success: () => {
          this.deleteLoanCookies();
          URLHelper.goToUrl(this.lendingStatus.bookUrl, true);
        },
      });
      console.log('Book is returned successfully!');
    };
  }

  handleBorrowIt() {
    return () => {
      ActionsHandlerService({
        action: 'borrow_book',
        identifier: this.identifier,
        success: () => {
          this.handleReadItNow();
        },
      });
      console.log('Book is borrowed successfully!');
    };
  }

  handleReserveIt() {
    return () => {
      ActionsHandlerService({
        action: 'join_waitlist',
        identifier: this.identifier,
        success: () => {
          URLHelper.goToUrl(URLHelper.getRedirectUrl(), true);
        },
      });
      console.log('Book added in waitlist!');
    };
  }

  handleRemoveFromWaitingList() {
    return () => {
      ActionsHandlerService({
        action: 'leave_waitlist',
        identifier: this.identifier,
        success: () => {
          URLHelper.goToUrl(URLHelper.getRedirectUrl(), true);
        },
      });
      console.log('removed you from waitlist!!');
    };
  }

  handleLoginOk() {
    return () => {
      const target = `/account/login?referer=${encodeURIComponent(
        URLHelper.getRedirectUrl()
      )}`;
      URLHelper.goToUrl(target, true);
    };
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
    URLHelper.goToUrl(redirectTo, true);
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
