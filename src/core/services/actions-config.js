// import ActionsHandler from './actions-handler/actions-handler.js';
import { URLHelper } from '../config/url-helper.js';
import {
  analyticsCategories,
  analyticsActions,
} from '../config/analytics-event-and-category.js';

/**
 * This class is reponsible for return different action buttons configurations.
 * e.g. If you want to render borrow button, this class will return
 * {
 *   text: 'Borrow for 14 days',
 *   callback: 'callback function for onclick event',
 *   className: 'primary'
 *   analyticsEvent: {
 *     category: 'category-name',
 *     action: 'action-name',
 *   }
 * }
 *
 * More details of above object keys are as follow
 * 1. text: texts displayed on the button.
 * 2. callback: callback functions being extended from ActionsHandler class below
 *    which contains functions to perform [borrow, browse, return] api calls.
 * 3. className: name of the class for buttons.
 * 4. analyticsEvent: being used to apply event tracking with google analytics
 *    it contains category name and action name to different in tracking.
 */
export default class ActionsConfig {
  constructor(userid, identifier, lendingStatus, bwbPurchaseUrl) {
    this.userid = userid;
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.bwbPurchaseUrl = bwbPurchaseUrl;
    this.analyticsCategories = analyticsCategories;
    this.analyticsActions = analyticsActions;
  }

  browseBookConfig() {
    return {
      id: 'browseBook',
      text: 'Borrow for 1 hour',
      // callback: this.handleBrowseIt(),
      className: 'primary',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.browse,
      },
    };
  }

  returnBookConfig() {
    return {
      id: 'returnNow',
      text: 'Return now',
      // callback: this.handleReturnIt(),
      className: 'danger',
      analyticsEvent: {
        category: this.analyticsCategories.browse,
        action: this.analyticsActions.doneBorrowing,
      },
    };
  }

  borrowBookConfig(disableBorrow = false, analyticsEvent) {
    if (
      !this.lendingStatus.available_to_borrow &&
      !this.lendingStatus.user_is_printdisabled
    )
      return null;

    const borrowEvent = {
      category: this.analyticsCategories.borrow,
      action: this.analyticsActions.borrow,
    };

    return {
      id: 'borrowBook',
      text: 'Borrow for 14 days',
      // callback: this.handleBorrowIt(),
      className: 'primary',
      disabled: disableBorrow,
      analyticsEvent: analyticsEvent || borrowEvent,
    };
  }

  loginAndBorrowBookConfig() {
    return {
      id: 'loginAndBorrow',
      text: 'Log In and Borrow',
      // callback: this.handleLoginOk(),
      className: 'primary',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.login,
      },
    };
  }

  leaveWaitlistConfig() {
    return {
      id: 'leaveWaitlist',
      text: 'Leave Waitlist',
      // callback: this.handleRemoveFromWaitingList(),
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

    let clickAction = 'this.handleLoginOk()';

    if (!bookHasWaitlist || lendingStatus.available_to_borrow) {
      return null;
    }

    const waitlistIsOpen =
      lendingStatus.available_to_waitlist && !lendingStatus.available_to_borrow;

    const waitlistButtonText = !isLoggedIn
      ? 'Log In and Join Waitlist'
      : 'Join Waitlist';

    const analyticsCategory =
      isLoggedIn && lendingStatus.user_has_browsed ? 'browse' : 'preview';
    const analyticsAction = isLoggedIn ? 'waitlistJoin' : 'login';

    if (isLoggedIn && !lendingStatus.user_on_waitlist && waitlistIsOpen) {
      clickAction = 'this.handleReserveIt()';
    }

    const deprioritize =
      lendingStatus.user_has_browsed || lendingStatus.available_to_browse;
    const buttonStyle = deprioritize ? 'dark' : 'warning';
    return {
      id: 'joinWaitlist',
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
      id: 'purchaseBook',
      text: 'Purchase',
      title: 'Purchase',
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
        id: 'adminAccess',
        text: 'Admin Access',
        title: 'You have administrative privileges to read this book',
        url: '?admin=1',
        target: '_self',
        className: 'danger',
        analyticsEvent: {
          category: '',
          action: '',
        },
      };
    }

    return null;
  }

  adminAccessConfig1() {
    if (
      this.lendingStatus.is_printdisabled &&
      this.lendingStatus.user_is_printdisabled
    ) {
      return {
        id: 'adminAccess',
        text: 'Admin Access',
        title: 'You have administrative privileges to read this book',
        url: '?admin=1',
        target: '_self',
        className: 'danger',
        analyticsEvent: {
          category: '',
          action: '',
        },
      };
    }

    return null;
  }

  adminOrPrintDisabledExitConfig() {
    const mode =
      URLHelper.getQueryParam('admin') === '1' ? 'admin' : 'print-disabled';
    const message = `← Exit ${mode} access mode`;

    return {
      id: 'exitAdminAccess',
      text: message,
      url: URLHelper.getBackHref(),
      target: '_self',
      className: 'ia-button',
      analyticsEvent: {
        category: this.analyticsCategories.purchase,
        action: this.analyticsActions.purchase,
      },
    };
  }

  unavailableBookConfig() {
    return {
      id: 'borrowUnavailable',
      text: 'Borrow Unavailable',
      callback: '',
      className: 'primary unavailable',
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
