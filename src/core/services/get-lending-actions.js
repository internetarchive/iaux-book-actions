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

// TODO more normalization in sub-files
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

  isBrowsing() {
    const lendingStatus = this.lendingStatus || [];
    const disableBorrow = lendingStatus.loanCount >= lendingStatus.maxLoans;

    return {
      primaryTitle: this.getBrowseCountdownTitle(
        lendingStatus.secondsLeftOnLoan
      ),
      primaryActions: [
        this.actionsConfig.returnBook(),
        this.actionsConfig.borrowBook(disableBorrow),
        this.actionsConfig.waitlistButton(),
      ],
      primaryColor: 'danger',
      secondaryActions: [this.actionsConfig.purchaseButton()],
    };
  }

  isBorrowing() {
    if (URLHelper.isOnStreamPage()) {
      return nothing;
    }

    const daysLeftStr =
      this.lendingStatus.daysLeftOnLoan > 1
        ? `Your loan of this book has ${this.lendingStatus.daysLeftOnLoan} days left.`
        : 'This is the last day of this loan.';

    return {
      primaryTitle: daysLeftStr,
      primaryActions: [this.actionsConfig.returnBook()],
      primaryColor: 'danger',
      secondaryActions: [],
    };
  }

  readyToRedeemBorrow() {
    const leaveWaitlist = this.actionsConfig.leaveWaitlist();
    const borrowBook = this.actionsConfig.borrowBook();
    const browseBook = this.actionsConfig.browseBook();

    const dropdownOptions = browseBook ? [borrowBook, browseBook] : [];
    const actions = !browseBook ? [borrowBook, leaveWaitlist] : [leaveWaitlist];

    return {
      primaryTitle: 'You are at the top of the waitlist for this book.',
      primaryActions: actions,
      primaryColor: 'danger',
      // secondaryActions: [`(<ia-bwb-purchase>|nothing)`],
      footer: 'printDisabilityLine()',
      prefixActions: dropdownOptions,
    };
  }

  canBorrowPrintDisabled() {
    const lendingStatus = this.lendingStatus || [];

    // if user isn't printDisabled, book is available to browse & borrow, then we
    // redirect to canborrow
    if (
      !lendingStatus.user_is_printdisabled &&
      (lendingStatus.available_to_browse || lendingStatus.available_to_borrow)
    ) {
      return this.canBorrow();
    }

    return {
      primaryTitle: 'You are eligible for print-disabled access.',
      primaryActions: [this.actionsConfig.borrowBook()],
      primaryColor: 'danger',
      // secondaryActions: [`(<ia-bwb-purchase>|nothing)`],
    };
  }

  canBorrow1Hr() {
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

    // one hour borrow logic
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

    const oneHrBorrow = this.actionsConfig.browseBook(
      oneHrBorrowText,
      oneHrBorrowEvent
    );

    const borrow = this.actionsConfig.borrowBook();
    const waitlist = this.actionsConfig.waitlistButton();

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
      secondaryActions: [this.actionsConfig.purchaseButton()],
    };
  }

  canBorrow() {
    const lendingStatus = this.lendingStatus || [];
    const isLoggedIn = !!this.userid;

    if (!isLoggedIn) {
      return this.loggedOutOptions();
    }

    const canBrowse =
      lendingStatus.available_to_browse ||
      (!lendingStatus.available_to_browse && lendingStatus.browsingExpired);
    if (canBrowse) {
      return this.canBorrow1Hr();
    }

    /* Borrow 14day */
    const waitlist = this.actionsConfig.waitlistButton();

    const disableBorrow = lendingStatus.loanCount >= lendingStatus.maxLoans;
    const cantBorrowNorWaitlist =
      !lendingStatus.available_to_borrow && !waitlist;
    const borrow = cantBorrowNorWaitlist
      ? this.actionsConfig.unavailableBook()
      : lendingStatus.available_to_borrow
      ? this.actionsConfig.borrowBook(disableBorrow)
      : null;

    const actions = [borrow, waitlist].filter(function (action) {
      return action !== null;
    });
    const title = waitlist ? 'Another patron is using this book.' : '';

    return {
      primaryTitle: title,
      primaryActions: actions,
      primaryColor: 'primary',
      secondaryActions: [this.actionsConfig.purchaseButton],
    };
  }

  onlyPrintDisabled() {
    return {
      primaryTitle: 'Book available to patrons with print disabilities.',
      primaryActions: [
        !this.lendingStatus.isAdmin ? this.actionsConfig.unavailableBook() : '',
      ],
      primaryColor: 'danger',
    };
  }

  isOnWaitlist() {
    return {
      primaryTitle: 'You are on the waitlist for this book.',
      primaryActions: [this.actionsConfig.leaveWaitlist()],
      primaryColor: 'danger',
    };
  }

  isRestricted() {
    // Visit /details/activemeasuresse0000ridt

    const restrictedDescription =
      '<div class="BookReaderMessage">' +
      'Its access has been restricted.  ' +
      '<a href="/details/inlibrary">Browse our lendable books</a>.' +
      '</div>';

    return {
      primaryTitle: 'This book is not available at this time.',
      primaryActions: [this.actionsConfig.unavailableBook()],
      primaryColor: 'danger',
      footer: restrictedDescription,
    };
  }

  loggedOutOptions() {
    const lendingStatus = this.lendingStatus || [];

    const showCantBorrowPlaceholder =
      !lendingStatus.available_to_waitlist &&
      !lendingStatus.available_to_borrow;

    const borrow =
      lendingStatus.available_to_borrow || lendingStatus.available_to_browse
        ? this.actionsConfig.loginAndBorrowBook()
        : showCantBorrowPlaceholder
        ? this.actionsConfig.unavailableBook()
        : null;

    const actions = [borrow, this.actionsConfig.waitlistButton()].filter(
      function (action) {
        return action !== null;
      }
    );

    const title = lendingStatus.available_to_browse
      ? 'Renewable every hour, pending availability.'
      : lendingStatus.available_to_borrow
      ? 'This book can be borrowed for 14 days.'
      : 'Another patron is using this book.';

    // console.log(actions)
    return {
      primaryTitle: title,
      primaryActions: actions,
      primaryColor: 'danger',
      footer: 'printDisabilityLine()',
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

  isAccessAdminOrPrintDisabled() {
    return {
      primaryActions: [],
      primaryTitle: '',
      secondaryActions: [this.actionsConfig.accessAdminOrPrintDisabled()],
    };
  }

  getCurrentLendingToolbar() {
    let toolbarType;
    const lendingStatus = this.lendingStatus || [];

    // console.log('lendingStatus', lendingStatus)
    const isAdmin =
      URLHelper.getQueryParam('admin') == '1' && lendingStatus.isAdmin;
    const accessPrintDisabled =
      URLHelper.getQueryParam('access') == '1' &&
      lendingStatus.user_is_printdisabled;

    const notBorrowed =
      !lendingStatus.user_has_borrowed || !lendingStatus.user_has_browsed;
    const userCanAccessPrintDisabled =
      lendingStatus.is_printdisabled && lendingStatus.user_is_printdisabled;

    let currentToolbar = '';
    // sequential order of hierarchal access
    // admin -> is borrowing -> is waitlist -> can borrow print disabled -> can borrow -> isOnWaitlist userCanAccessPrintDisabled-> restricted
    if (isAdmin || accessPrintDisabled) {
      toolbarType = this.isAccessAdminOrPrintDisabled();
      currentToolbar = 'isAccessAdminOrPrintDisabled';
    } else if (lendingStatus.user_has_borrowed) {
      toolbarType = this.isBorrowing();
      currentToolbar = 'isBorrowing';
    } else if (lendingStatus.user_has_browsed) {
      toolbarType = this.isBrowsing();
      currentToolbar = 'isBrowsing';
    } else if (lendingStatus.user_can_claim_waitlist) {
      // userHoldIsReady
      toolbarType = this.readyToRedeemBorrow();
      currentToolbar = 'readyToRedeemBorrow';
    } else if (userCanAccessPrintDisabled) {
      toolbarType = this.canBorrowPrintDisabled();
      currentToolbar = 'canBorrowPrintDisabled';
    } else if (
      notBorrowed &&
      lendingStatus.is_lendable &&
      !lendingStatus.user_on_waitlist
    ) {
      toolbarType = this.canBorrow();
      currentToolbar = 'canBorrow';
    } else if (lendingStatus.isPrintDisabledOnly) {
      toolbarType = this.onlyPrintDisabled();
      currentToolbar = 'onlyPrintDisabled';
    } else if (
      !lendingStatus.user_on_waitlist &&
      !lendingStatus.user_can_claim_waitlist
    ) {
      toolbarType = this.isOnWaitlist();
      currentToolbar = 'isOnWaitlist';
    } else {
      toolbarType = this.isRestricted();
      currentToolbar = 'isRestricted';
    }

    console.log(currentToolbar);
    // console.log(toolbarType)
    return toolbarType;
  }
}
