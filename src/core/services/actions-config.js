import ActionsHandler from './actions-handler/actions-handler.js';
import { URLHelper } from '../config/url-helper.js';
import {
  analyticsCategories,
  analyticsActions,
} from '../config/analytics-event-and-category.js';

export default class ActionsConfig extends ActionsHandler {
  constructor(userid, identifier, lendingStatus, bwbPurchaseUrl) {
    super();
    this.userid = userid;
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.bwbPurchaseUrl = bwbPurchaseUrl;
    this.analyticsCategories = analyticsCategories;
    this.analyticsActions = analyticsActions;

    /* eslint-disable no-new */
    new ActionsHandler(this.identifier, this.lendingStatus);
  }

  browseBookConfig() {
    return {
      text: 'Borrow for 1 hour',
      callback: this.handleBrowseIt(),
      className: 'primary',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.browse,
      },
    };
  }

  returnBookConfig() {
    return {
      text: 'Return now',
      callback: this.handleReturnIt(),
      className: 'danger',
      analyticsEvent: {
        category: this.analyticsCategories.browse,
        action: this.analyticsActions.doneBorrowing,
      },
    };
  }

  borrowBookConfig(disableBorrow = false, analyticsEvent) {
    if (!this.lendingStatus.available_to_borrow) return null;

    const borrowEvent = {
      category: this.analyticsCategories.borrow,
      action: this.analyticsActions.borrow,
    };

    return {
      text: 'Borrow for 14 days',
      callback: this.handleBorrowIt(),
      className: 'primary',
      disabled: disableBorrow,
      analyticsEvent: analyticsEvent || borrowEvent,
    };
  }

  loginAndBorrowBookConfig() {
    return {
      text: 'Log In and Borrow',
      callback: this.handleLoginOk(),
      className: 'primary',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.login,
      },
    };
  }

  leaveWaitlistConfig() {
    return {
      text: 'Leave waitlist',
      callback: this.handleRemoveFromWaitingList(),
      className: 'dark',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.waitlistLeave,
      },
    };
  }

  waitlistConfig() {
    const isLoggedIn = !!this.userid;

    const lendingStatus = this.lendingStatus || [];
    const bookHasWaitlist = lendingStatus.available_to_waitlist;

    let clickAction = this.handleLoginOk();

    if (!bookHasWaitlist || lendingStatus.available_to_borrow) {
      return null;
    }

    const waitlistIsOpen =
      lendingStatus.available_to_waitlist && !lendingStatus.available_to_borrow;

    const waitlistButtonText = !isLoggedIn
      ? 'Log In and Join waitlist'
      : 'Join waitlist for 14 day borrow';

    const analyticsCategory =
      isLoggedIn && lendingStatus.user_has_browsed ? 'browse' : 'preview';
    const analyticsAction = isLoggedIn ? 'waitlistJoin' : 'login';

    if (isLoggedIn && !lendingStatus.user_on_waitlist && waitlistIsOpen) {
      clickAction = this.handleReserveIt();
    }

    const deprioritize =
      lendingStatus.user_has_browsed || lendingStatus.available_to_browse;
    const buttonStyle = deprioritize ? 'btn-dark' : 'btn-warning';
    return {
      text: waitlistButtonText,
      callback: clickAction,
      className: buttonStyle,
      analyticsEvent: {
        category: this.analyticsCategories[analyticsCategory],
        action: this.analyticsActions[analyticsAction],
      },
    };
  }

  purchaseConfig() {
    if (!this.bwbPurchaseUrl || this.bwbPurchaseUrl === '') return null;

    return {
      text: 'Better World Books',
      title: 'Better World Books',
      url: this.bwbPurchaseUrl,
      target: '_blank',
      className: 'purchase dark',
      analyticsEvent: {
        category: this.analyticsCategories.purchase,
        action: this.analyticsActions.purchase,
      },
    };
  }

  adminAccessConfig() {
    if (!this.lendingStatus.userHasBorrowed && this.lendingStatus.isAdmin) {
      return {
        text: 'Admin Access',
        title: 'You have administrative privileges to read this book',
        url: '?admin=1',
        className: 'danger',
        analyticsEvent: {
          category: '',
          action: '',
        },
      };
    }

    return null;
  }

  adminOrPrintDisabledConfig() {
    const mode =
      URLHelper.getQueryParam('admin') === '1' ? 'admin' : 'print-disabled';
    const message = `← Exit ${mode} access mode`;

    return {
      text: message,
      url: URLHelper.getBackHref(),
      target: '_blank',
      className: 'ia-button',
      analyticsEvent: {
        category: this.analyticsCategories.purchase,
        action: this.analyticsActions.purchase,
      },
    };
  }

  unavailableBookConfig() {
    return {
      text: 'Borrow unavailable',
      callback: '',
      className: 'primary',
      disabled: true,
      analyticsEvent: {
        category: this.analyticsCategories.unavailable,
        action: this.analyticsActions.unavailable,
      },
    };
  }

  isEmbed(title) {
    const description = `<img src=/images/glogo-jw.png> <a href=/details/${this.identifier}>${title}</a>`;
    return {
      primaryTitle: description,
      primaryActions: [],
      primaryColor: '',
    };
  }
}
