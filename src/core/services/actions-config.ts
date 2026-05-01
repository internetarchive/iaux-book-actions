import { URLHelper } from '../config/url-helper';
import {
  analyticsCategories,
  analyticsActions,
} from '../config/analytics-event-and-category';
import type {
  ActionButtonConfig,
  LendingStatus,
} from '../types/lending-status';

/**
 * Returns a per-button configuration object for each lending action.
 *
 * Button shape (typical):
 * ```
 * {
 *   id: 'borrowBook',
 *   text: 'Borrow for 14 days',
 *   className: 'primary',
 *   analyticsEvent: { category, action },
 * }
 * ```
 */
export default class ActionsConfig {
  userid: string;
  identifier: string;
  lendingStatus: LendingStatus;
  bwbPurchaseUrl: string;
  printDisabilityLink = '/details/printdisabled?tab=about';
  analyticsCategories = analyticsCategories;
  analyticsActions = analyticsActions;

  constructor(
    userid: string,
    identifier: string,
    lendingStatus: LendingStatus = {},
    bwbPurchaseUrl: string,
  ) {
    this.userid = userid;
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.bwbPurchaseUrl = bwbPurchaseUrl;
  }

  firstBrowseConfig(): ActionButtonConfig {
    return {
      id: 'browseBook',
      text: 'Borrow',
      className: 'primary',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.browse,
      },
    };
  }

  browseAgainConfig(): ActionButtonConfig {
    return {
      id: 'browseBookAgain',
      text: 'Borrow',
      className: 'primary',
      analyticsEvent: {
        category: this.analyticsCategories.browse,
        action: this.analyticsActions.browseAgain,
      },
    };
  }

  returnBookConfig(): ActionButtonConfig {
    const eventCategory = this.lendingStatus.user_has_browsed
      ? this.analyticsCategories.browse
      : this.analyticsCategories.borrow;

    return {
      id: 'returnNow',
      text: 'Return now',
      className: 'danger',
      analyticsEvent: {
        category: eventCategory,
        action: this.analyticsActions.doneBorrowing,
      },
      // 'browse' / 'borrow' here is the click-handler hint, distinct from
      // the high-level BorrowType lifecycle state ('browsed' / 'borrowed').
      // Preserved verbatim from the original JS implementation.
      borrowType: this.lendingStatus.user_has_browsed ? 'browse' : 'borrow',
    };
  }

  borrowBookConfig(disableBorrow = false): ActionButtonConfig | null {
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
          : this.analyticsCategories.preview,
        action: this.analyticsActions.borrow,
      },
    };
  }

  loginAndBorrowBookConfig(): ActionButtonConfig {
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

  leaveWaitlistConfig(): ActionButtonConfig {
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

  loginAndWaitlistConfig(): ActionButtonConfig {
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

  waitlistConfig(): ActionButtonConfig | null {
    const isLoggedIn = !!this.userid;
    const lendingStatus = this.lendingStatus || {};

    if (
      !lendingStatus.available_to_waitlist ||
      lendingStatus.available_to_borrow
    ) {
      return null;
    }

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

  purchaseConfig(): ActionButtonConfig | null {
    if (!this.bwbPurchaseUrl) return null;

    return {
      id: 'purchaseBook',
      text: 'Purchase at ',
      subText: 'Better World Books',
      title: 'Purchase',
      url: this.bwbPurchaseUrl,
      target: '_blank',
      className: 'purchase dark',
      analyticsEvent: {
        category: this.analyticsCategories.bookReaderHeader,
        action: this.analyticsActions.purchase,
      },
    };
  }

  printDisabilityConfig(): ActionButtonConfig | null {
    if (this.lendingStatus.user_is_printdisabled) return null;

    return {
      id: 'printDisability',
      text: 'Print Disability Access',
      title: 'Print Disability Access',
      url: this.printDisabilityLink,
      target: '_self',
      className: 'print-disability',
      analyticsEvent: {
        category: this.analyticsCategories.bookReaderHeader,
        action: this.analyticsActions.printDisability,
      },
    };
  }

  adminAccessConfig(): ActionButtonConfig | null {
    if (this.lendingStatus.user_has_borrowed || !this.lendingStatus.isAdmin) {
      return null;
    }
    return {
      id: 'adminAccess',
      text: 'Admin Access',
      title: 'You have administrative privileges to read this book',
      className: 'danger',
      analyticsEvent: {
        category: this.analyticsCategories.adminAccess,
        action: this.analyticsActions.borrow,
      },
    };
  }

  adminOrPrintDisabledExitConfig(): ActionButtonConfig {
    const mode =
      URLHelper.getQueryParam('admin') === '1' ? 'admin' : 'print-disabled';
    return {
      id: 'exitAdminAccess',
      text: `← Exit ${mode} access mode`,
      url: URLHelper.getBackHref(),
      target: '_self',
      className: 'exit-admin',
      analyticsEvent: {
        category: this.analyticsCategories.adminAccess,
        action: this.analyticsActions.doneBorrowing,
      },
    };
  }

  unavailableBookConfig(): ActionButtonConfig {
    return {
      id: 'borrowUnavailable',
      text: 'Borrow Unavailable',
      className: 'primary unavailable',
      disabled: true,
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.unavailable,
      },
    };
  }

  /** Embed-only "title bar" mode (no actions). */
  isEmbed(title: string): {
    primaryTitle: string;
    primaryActions: never[];
    primaryColor: string;
  } {
    const description = `<img src=/images/glogo-jw.png> <a href=/details/${this.identifier}>${title}</a>`;
    return {
      primaryTitle: description,
      primaryActions: [],
      primaryColor: '',
    };
  }
}
