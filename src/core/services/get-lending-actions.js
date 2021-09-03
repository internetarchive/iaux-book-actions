/* eslint class-methods-use-this: "off" */
/* eslint no-console: "off" */
/* eslint no-nested-ternary: "off" */
/* eslint-disable */

import { nothing } from 'lit-html';
import { URLHelper } from '../config/url-helper.js';
import {
  analyticsCategories,
  analyticsActions,
} from '../config/analytics-event-and-category.js';
import ActionsConfig from './actions-config.js';

export default class GetLendingActions {
  constructor(lendingStatus, bwbPurchaseUrl) {
    this.userid = lendingStatus.userid;
    this.lendingStatus = lendingStatus;
    this.bwbPurchaseUrl = bwbPurchaseUrl;
    this.analyticsCategories = analyticsCategories;
    this.analyticsActions = analyticsActions;
    this.actionsConfig = new ActionsConfig(
      this.lendingStatus,
      this.bwbPurchaseUrl
    );
  }

  // done
  adminAccessOrPrintDisabledAction() {
    return {
      primaryTitle: '',
      primaryActions: [],
      secondaryActions: [this.actionsConfig.adminOrPrintDisabledConfig()],
    };
  }

  // done
  borrowingAction() {
    if (URLHelper.isOnStreamPage()) return nothing;

    const daysLeftStr =
      this.lendingStatus.daysLeftOnLoan > 1
        ? `Your loan of this book has ${this.lendingStatus.daysLeftOnLoan} days left.`
        : 'This is the last day of this loan.';

    return {
      primaryTitle: daysLeftStr,
      primaryActions: [this.actionsConfig.returnBookConfig()],
      primaryColor: 'danger',
      secondaryActions: [this.actionsConfig.purchaseConfig()],
    };
  }

  // done
  browsingAction() {
    const lendingStatus = this.lendingStatus || [];
    const disableBorrow = lendingStatus.loanCount >= lendingStatus.maxLoans;

    const deprioritizedBorrowAnalytics = {
      category: this.analyticsCategories.browse,
      action: this.analyticsActions.borrow,
    };

    return {
      primaryTitle: this.getBrowseCountdownTitle(
        lendingStatus.secondsLeftOnLoan
      ),
      primaryActions: [
        this.actionsConfig.returnBookConfig(),
        this.actionsConfig.borrowBookConfig(
          disableBorrow,
          deprioritizedBorrowAnalytics
        ),
        this.actionsConfig.waitlistConfig(),
      ],
      primaryColor: 'danger',
      secondaryActions: [this.actionsConfig.purchaseConfig()],
    };
  }

  // done
  redeemBorrowAction() {
    const lendingStatus = this.lendingStatus || [];

    const leaveWaitlist = this.actionsConfig.leaveWaitlistConfig(); // ok
    const borrowBook = this.actionsConfig.borrowBookConfig(); // ok
    const browseBook = lendingStatus.available_to_browse
      ? this.actionsConfig.browseBookConfig()
      : null;

    const dropdownOptions = browseBook ? [borrowBook, browseBook] : [];
    const actions = !browseBook ? [borrowBook, leaveWaitlist] : [leaveWaitlist];

    return {
      primaryTitle: 'You are at the top of the waitlist for this book',
      primaryActions: actions,
      primaryColor: 'ia-button primary',
      footer: 'printDisabilityLine()',
      prefixActions: dropdownOptions,
    };
  }

  // done
  borrowPrintDisabledAction() {
    return {
      primaryTitle: 'You are eligible for print-disabled access.',
      primaryActions: [this.actionsConfig.borrowBookConfig()],
      primaryColor: 'danger',
      secondaryActions: [this.actionsConfig.purchaseConfig()],
    };
  }

  // done
  onlyPrintDisabledAction() {
    const unavailable = !this.lendingStatus.isAdmin
      ? this.actionsConfig.unavailableBookConfig()
      : [];
    return {
      primaryTitle: 'Book available to patrons with print disabilities.',
      primaryActions: [unavailable],
      primaryColor: 'danger',
    };
  }

  // done
  onWaitlistAction() {
    return {
      primaryTitle: 'You are on the waitlist for this book.',
      primaryActions: [this.actionsConfig.leaveWaitlistConfig()],
      primaryColor: 'danger',
      secondaryActions: [this.actionsConfig.purchaseConfig()],
    };
  }

  restrictedAction() {
    // Visit /details/activemeasuresse0000ridt

    const restrictedDescription =
      '<div class="BookReaderMessage">' +
      'Its access has been restricted.  ' +
      '<a href="/details/inlibrary">Browse our lendable books</a>.' +
      '</div>';

    return {
      primaryTitle: 'This book is not available at this time.',
      primaryActions: [this.actionsConfig.unavailableBookConfig()],
      primaryColor: 'primary',
      footer: restrictedDescription,
      secondaryActions: [this.actionsConfig.purchaseConfig()],
    };
  }

  // done
  loggedOutOptions() {
    const lendingStatus = this.lendingStatus || [];

    const showCantBorrowPlaceholder =
      !lendingStatus.available_to_waitlist &&
      !lendingStatus.available_to_borrow;

    const waitlist = this.actionsConfig.waitlistConfig();
    let borrow = null;

    if (
      lendingStatus.available_to_borrow ||
      lendingStatus.available_to_browse
    ) {
      borrow = this.actionsConfig.loginAndBorrowBookConfig();
    } else if (showCantBorrowPlaceholder) {
      borrow = this.actionsConfig.unavailableBookConfig();
    }

    const actions = [borrow, waitlist].filter(action => {
      return action !== null;
    });

    const title = lendingStatus.available_to_browse
      ? 'Renewable every hour, pending availability.'
      : lendingStatus.available_to_borrow
      ? 'This book can be borrowed for 14 days.'
      : 'Another patron is using this book.';

    return {
      primaryTitle: title,
      primaryActions: actions,
      primaryColor: 'danger',
      footer: 'printDisabilityLine()',
      secondaryActions: [this.actionsConfig.purchaseConfig()],
    };
  }

  // done
  borrow1HrAction() {
    const lendingStatus = this.lendingStatus || [];

    const possibleTitles = {
      one_hour: 'Renewable every hour, pending availability.',
      session_tryagain:
        'Another patron is using this book. Please check back later.',
      session_expired: 'Your loan has expired.',
    };

    // assess borrowable state
    const browsingHasExpired =
      !lendingStatus.available_to_browse && lendingStatus.browsingExpired;
    const canBrowse = lendingStatus.available_to_browse || browsingHasExpired;
    const canBrowseAndBorrow = canBrowse && lendingStatus.available_to_borrow;

    const canBrowseHasWaitlist =
      canBrowse &&
      !lendingStatus.available_to_borrow &&
      lendingStatus.available_to_waitlist;

    const canBrowseCantBorrowCantWaitlist =
      canBrowse &&
      !lendingStatus.available_to_borrow &&
      !lendingStatus.available_to_waitlist;

    const allBrowsableCopiesTaken =
      lendingStatus.available_browsable_copies < 1 &&
      lendingStatus.available_browsable_copies <
        lendingStatus.max_browsable_copies;
    // end config

    const title = browsingHasExpired
      ? possibleTitles.session_expired
      : !canBrowse && allBrowsableCopiesTaken
      ? possibleTitles.session_tryagain
      : !canBrowse && lendingStatus.available_to_waitlist
      ? possibleTitles.waitlist
      : possibleTitles.one_hour;

    // one hour borrow config
    const oneHrBorrowText = browsingHasExpired
      ? 'Borrow again'
      : 'Borrow for 1 hour';
    const browseAgainEvent = {
      category: this.analyticsCategories.browse,
      action: this.analyticsActions.browseAgain,
    };
    const firstBrowseEvent = {
      category: this.analyticsCategories.preview,
      action: this.analyticsActions.browse,
    };
    const oneHrBorrowEvent = browsingHasExpired
      ? browseAgainEvent
      : firstBrowseEvent;

    const oneHrBorrow = this.actionsConfig.browseBookConfig(
      oneHrBorrowText,
      oneHrBorrowEvent
    );

    const borrow = this.actionsConfig.borrowBookConfig();
    const waitlist = this.actionsConfig.waitlistConfig();

    const dropdownOptions = canBrowseAndBorrow
      ? [oneHrBorrow, borrow]
      : canBrowseHasWaitlist
      ? [oneHrBorrow, waitlist]
      : [];
    const actions = canBrowseCantBorrowCantWaitlist
      ? [oneHrBorrow]
      : dropdownOptions;

    return {
      primaryTitle: title,
      primaryActions: actions,
      primaryColor: 'ia-button primary',
      footer: 'printDisabilityLine()',
      secondaryActions: [this.actionsConfig.purchaseConfig()],
    };
  }

  // done
  borrowAction() {
    const lendingStatus = this.lendingStatus || [];
    const isLoggedIn = !!this.userid;

    if (!isLoggedIn) {
      return this.loggedOutOptions();
    }

    const canBrowse =
      lendingStatus.available_to_browse ||
      (!lendingStatus.available_to_browse && lendingStatus.browsingExpired);
    if (canBrowse) {
      return this.borrow1HrAction();
    }

    /* Borrow 14day */
    let borrow = null;

    const waitlist = this.actionsConfig.waitlistConfig();

    const disableBorrow = lendingStatus.loanCount >= lendingStatus.maxLoans;
    const cantBorrowNorWaitlist =
      !lendingStatus.available_to_borrow && !waitlist;
    if (cantBorrowNorWaitlist) {
      borrow = this.actionsConfig.unavailableBookConfig();
    } else if (lendingStatus.available_to_borrow) {
      borrow = this.actionsConfig.borrowBookConfig(disableBorrow);
    }

    const actions = [borrow, waitlist].filter(function (action) {
      return action !== null;
    });
    const title = waitlist ? 'Another patron is using this book.' : '';

    return {
      primaryTitle: title,
      primaryActions: actions,
      primaryColor: 'primary',
      secondaryActions: [this.actionsConfig.purchaseButton],
      foot: 'printDisabilityLine()',
    };
  }

  /**
   * Builds the countdown toolbar title.
   *
   * @param integer secondsRemaining
   * @return string innerHTML for the dialogOpts title attribute
   */
  getBrowseCountdownTitle(secondsRemaining) {
    var borrowEndTime = new Date(+new Date() + secondsRemaining * 1000);
    var hour = borrowEndTime.getHours() % 12;
    var minute = ('' + borrowEndTime.getMinutes()).replace(/^(\d{1})$/, '0$1');
    var ampm = borrowEndTime.getHours() > 11 ? ' PM' : ' AM';
    if (hour === 0) {
      hour = 12;
    }
    return 'Borrow ends at ' + hour + ':' + minute + ampm;
  }

  getCurrentLendingActions() {
    let lendingActions;
    const lendingStatus = this.lendingStatus || [];

    const isAdmin =
      URLHelper.getQueryParam('admin') == '1' && lendingStatus.isAdmin;
    const accessPrintDisabled =
      URLHelper.getQueryParam('access') == '1' &&
      lendingStatus.user_is_printdisabled;

    const notBorrowed =
      !lendingStatus.user_has_borrowed || !lendingStatus.user_has_browsed;
    const userCanAccessPrintDisabled =
      lendingStatus.is_printdisabled && lendingStatus.user_is_printdisabled;

    // tests variable
    let currentToolbar = '';

    console.log(lendingStatus);
    // sequential order of hierarchal access
    // admin -> is browsing/borrowing -> is waitlist -> can borrow print disabled -> can borrow -> isOnWaitlist -> userCanAccessPrintDisabled-> restricted
    if (isAdmin || accessPrintDisabled) {
      lendingActions = this.adminAccessOrPrintDisabledAction();
      currentToolbar = 'adminAccessOrPrintDisabledAction';
    } else if (lendingStatus.user_has_borrowed) {
      lendingActions = this.borrowingAction();
      currentToolbar = 'borrowingAction';
    } else if (lendingStatus.user_has_browsed) {
      lendingActions = this.browsingAction();
      currentToolbar = 'browsingAction';
    } else if (lendingStatus.user_can_claim_waitlist) {
      lendingActions = this.redeemBorrowAction();
      currentToolbar = 'redeemBorrowAction';
    } else if (userCanAccessPrintDisabled) {
      lendingActions = this.borrowPrintDisabledAction();
      currentToolbar = 'borrowPrintDisabledAction';
    } else if (
      notBorrowed &&
      lendingStatus.is_lendable &&
      !lendingStatus.user_on_waitlist
    ) {
      lendingActions = this.borrowAction();
      currentToolbar = 'borrowAction';
    } else if (lendingStatus.isPrintDisabledOnly) {
      lendingActions = this.onlyPrintDisabledAction();
      currentToolbar = 'onlyPrintDisabledAction';
    } else if (
      !lendingStatus.user_on_waitlist &&
      !lendingStatus.user_can_claim_waitlist
    ) {
      lendingActions = this.onWaitlistAction();
      currentToolbar = 'onWaitlistAction';
    } else {
      lendingActions = this.restrictedAction();
      currentToolbar = 'restrictedAction';
    }

    console.log(currentToolbar);
    // console.log(lendingActions)
    return lendingActions;
  }
}
