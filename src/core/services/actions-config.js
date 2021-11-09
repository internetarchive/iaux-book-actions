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
 *   className: 'primary'
 *   analyticsEvent: {
 *     category: 'category-name',
 *     action: 'action-name',
 *   }
 * }
 *
 * More details of above object keys are as follow
 * 1. text: texts displayed on the button.
 * 2. className: name of the class for buttons.
 * 3. analyticsEvent: being used to apply event tracking with google analytics
 *    it contains category name and action name to different in tracking.
 */
export default class ActionsConfig {
  constructor(userid, identifier, lendingStatus = {}, bwbPurchaseUrl) {
    this.userid = userid;
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.bwbPurchaseUrl = bwbPurchaseUrl;
    this.printDisabilityLink = '/details/printdisabled?tab=about';
    this.analyticsCategories = analyticsCategories;
    this.analyticsActions = analyticsActions;
  }

  browseBookConfig() {
    return {
      id: 'browseBook',
      text: 'Borrow for 1 hour',
      className: 'primary',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.browse,
      },
    };
  }

  returnBookConfig() {
    const eventCategory = this.lendingStatus.user_has_browsed
      ? 'browse'
      : 'borrow';

    return {
      id: 'returnNow',
      text: 'Return now',
      className: 'danger',
      analyticsEvent: {
        category: eventCategory,
        action: this.analyticsActions.doneBorrowing,
      },
    };
  }

  borrowBookConfig(disableBorrow = false) {
    const notBorrowableNorPrintDisabled =
      (!this.lendingStatus.available_to_borrow &&
        !this.lendingStatus.user_is_printdisabled) ||
      this.lendingStatus.user_has_borrowed;

    if (notBorrowableNorPrintDisabled) return null;

    return {
      id: 'borrowBook',
      text: 'Borrow for 14 days',
      className: 'primary',
      disabled: disableBorrow,
      analyticsEvent: {
        category: this.lendingStatus.user_has_browsed
          ? this.analyticsCategories.browse
          : this.analyticsCategories.borrow,
        action: this.analyticsActions.borrow,
      },
    };
  }

  loginAndBorrowBookConfig() {
    return {
      id: 'loginAndBorrow',
      text: 'Log In and Borrow',
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
      className: 'dark',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.waitlistLeave,
      },
    };
  }

  loginAndWaitlistConfig() {
    return {
      id: 'loginAndWaitlist',
      text: 'Log In and Join Waitlist',
      className: 'warning',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.login,
      },
    };
  }

  waitlistConfig() {
    const isLoggedIn = !!this.userid;
    const lendingStatus = this.lendingStatus || {};

    // early exit if
    // - not available for waitlist
    // - book is available for borrow (14 days borrow)
    if (
      !lendingStatus.available_to_waitlist ||
      lendingStatus.available_to_borrow
    ) {
      return null;
    }

    // early exit to logged out config if user is absent
    if (!isLoggedIn) {
      return this.loginAndWaitlistConfig();
    }

    return {
      id: 'joinWaitlist',
      text: 'Join Waitlist',
      className: 'warning',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.waitlistJoin,
      },
    };
  }

  purchaseConfig() {
    if (!this.bwbPurchaseUrl) return null;

    return {
      id: 'purchaseBook',
      text: 'Purchase at',
      subText: 'Better World Books',
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

  printDisabilityConfig() {
    // if user has PD access, let just not render PD access link
    if (this.lendingStatus.user_is_printdisabled) return null;

    return {
      id: 'printDisability',
      text: 'Print Disability Access',
      title: 'Print Disability Access',
      url: this.printDisabilityLink,
      target: '_self',
      className: 'print-disability',
      analyticsEvent: {
        category: this.analyticsCategories.purchase,
        action: this.analyticsActions.purchase,
      },
    };
  }

  adminAccessConfig() {
    // if book is borrowed, not showing Admin access he already have full book access
    if (this.lendingStatus.user_has_borrowed || !this.lendingStatus.isAdmin)
      return null;

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
