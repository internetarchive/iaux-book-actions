/* eslint class-methods-use-this: "off" */
/* eslint no-console: "off" */
import { URLHelper } from '../config/url-helper.js';

export default class ActionHandlers {
  constructor() {
    this.userid = '@neeraj-archive';
  }

  handleReturnIt() {
    console.log('Book is returned successfully!');
  }

  borrowPrintDisabledBook() {
    console.log('borrowPrintDisabledBook');
  }

  handleBorrowIt() {
    console.log('Book is borrowed successfully!');
  }

  handleBrowseIt() {
    console.log('Book is browsed successfully!');
  }

  handleReserveIt() {
    console.log('Book added in waitlist!');
  }

  handleRemoveFromWaitingList() {
    console.log('removed you from waitlist!!');
  }

  handleLoginOk() {
    const target = `/account/login?referer=${encodeURIComponent(
      URLHelper.getRedirectUrl()
    )}`;
    URLHelper.goToUrl(target, true);
  }
}
