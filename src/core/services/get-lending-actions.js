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

/**
 * This is the main controller/service class helps to fetch different action buttons
 * from a lendable item.
 *
 * We are showing action button in two column
 * 1. primaryAction: contains primary action button like Browse, Borrow, Return, Waitlist etc...
 * 2. secondaryActions: container secondary action button like Admin Access, Purchase link etc...
 *
 * Response of this class contain an object as follows:-
 * {
 *   primaryTitle: 'Renewable every hour, pending availability.',
 *   primaryActions: [this.actionsConfig.returnBookConfig()],
 *   primaryColor: 'primary',
 *   secondaryActions: [this.actionsConfig.purchaseConfig()],
 * }
 *
 * Explanation of above fields are as follows:-
 * 1. primaryTitle: Describe current loan status of this book.
 * 2. primaryActions: Consists an array of action buttons (Browse, Borrow, Return) based on loanStatus.
 *    The action buttons configuration is coming from ActionsConfig class.
 * 3. primaryColor: Color of initial action button and dropdown button on mobile devices.
 * 4. secondaryActions: Consists an array of action buttons (Admin Acess, Purchase Link) based on availability.
 *    The action buttons configuration is coming from ActionsConfig class.
 */

export default class GetLendingActions {
  constructor(userid, identifier, lendingStatus, bwbPurchaseUrl) {
    this.userid = userid;
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.bwbPurchaseUrl = bwbPurchaseUrl;
    this.analyticsCategories = analyticsCategories;
    this.analyticsActions = analyticsActions;
    this.actionsConfig = new ActionsConfig(
      this.userid,
      this.identifier,
      this.lendingStatus,
      this.bwbPurchaseUrl
    );
  }

  onlyAdminAction() {
    return {
      primaryTitle: 'You have administrative privileges to read this book.',
      primaryActions: [],
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  adminOrPrintDisabledReadingAction() {
    return {
      primaryTitle: '',
      primaryActions: [],
      secondaryActions: [this.actionsConfig.adminOrPrintDisabledExitConfig()],
    };
  }

  patronIsReadingAction() {
    const lendingStatus = this.lendingStatus || {};
    const disableBorrow = lendingStatus.loanCount >= lendingStatus.maxLoans;

    let primaryTitleText = '';
    if (lendingStatus.user_has_browsed) {
      primaryTitleText = this.getBrowseCountdownTitle();
    } else {
      primaryTitleText = `Your loan of this book has ${lendingStatus.daysLeftOnLoan} days left.`;
    }

    return {
      primaryTitle: primaryTitleText,
      primaryActions: [
        this.actionsConfig.returnBookConfig(),
        this.actionsConfig.borrowBookConfig(disableBorrow),
        this.actionsConfig.waitlistConfig(),
        this.actionsConfig.printDisabilityConfig(),
      ],
      primaryColor: 'danger',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  leaveWaitlistAction() {
    const lendingStatus = this.lendingStatus || {};

    const leaveWaitlist = this.actionsConfig.leaveWaitlistConfig();
    const borrowBook = this.actionsConfig.borrowBookConfig();
    const browseBook = lendingStatus.available_to_browse
      ? this.actionsConfig.firstBrowseConfig()
      : null;

    const dropdownOptions = browseBook ? [browseBook, borrowBook] : [];
    const actions = !browseBook ? [borrowBook, leaveWaitlist] : [leaveWaitlist];

    return {
      primaryTitle: 'You are at the top of the waitlist for this book',
      primaryActions: actions.concat(dropdownOptions),
      primaryColor: 'primary',
      footer: 'printDisabilityLine()',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  borrowPrintDisabledAction() {
    return {
      primaryTitle: 'You are eligible for print-disabled access.',
      primaryActions: [this.actionsConfig.borrowBookConfig()],
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  onlyPrintDisabledAction() {
    const unavailable = !this.lendingStatus.isAdmin
      ? this.actionsConfig.unavailableBookConfig()
      : [];
    return {
      primaryTitle: 'Book available to patrons with print disabilities.',
      primaryActions: [unavailable],
      primaryColor: 'primary',
    };
  }

  onWaitlistAction() {
    return {
      primaryTitle: 'You are on the waitlist for this book.',
      primaryActions: [
        this.actionsConfig.leaveWaitlistConfig(),
        this.actionsConfig.firstBrowseConfig(),
      ],
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  // check restricted item behaviour here /activemeasuresse0000ridt
  restrictedAction() {
    const lendingStatus = this.lendingStatus || {};
    const anotherPatronUsing =
      lendingStatus.max_browsable_copies &&
      !lendingStatus.available_lendable_copies;
    const title = anotherPatronUsing
      ? 'Another patron is using this book. Please check back later.'
      : 'This book is not available at this time.';

    return {
      primaryTitle: title,
      primaryActions: [this.actionsConfig.unavailableBookConfig()],
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  loggedOutOptions() {
    const lendingStatus = this.lendingStatus || {};

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

    const printDisability = this.actionsConfig.printDisabilityConfig();

    const actions = [borrow, waitlist, printDisability].filter(action => {
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
      primaryColor: 'primary',
      footer: 'printDisabilityLine()',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  borrow1HrAction() {
    const lendingStatus = this.lendingStatus || {};

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
    const oneHrBorrow = browsingHasExpired
      ? this.actionsConfig.browseAgainConfig()
      : this.actionsConfig.firstBrowseConfig();

    const borrow = this.actionsConfig.borrowBookConfig();
    const waitlist = this.actionsConfig.waitlistConfig();
    const printDisability = this.actionsConfig.printDisabilityConfig();

    const dropdownOptions = canBrowseAndBorrow
      ? [oneHrBorrow, borrow, printDisability]
      : canBrowseHasWaitlist
      ? [oneHrBorrow, waitlist, printDisability]
      : [];
    const actions = canBrowseCantBorrowCantWaitlist
      ? [oneHrBorrow, printDisability]
      : dropdownOptions;

    return {
      primaryTitle: title,
      primaryActions: actions,
      primaryColor: 'primary',
      footer: 'printDisabilityLine()',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  borrowAction() {
    const lendingStatus = this.lendingStatus || {};
    const isLoggedIn = !!this.userid;

    if (!isLoggedIn) {
      return this.loggedOutOptions();
    }

    if (lendingStatus.available_to_browse || lendingStatus.browsingExpired) {
      return this.borrow1HrAction();
    }

    /* Borrow 14day */
    let borrow = null;

    const waitlist = this.actionsConfig.waitlistConfig();
    const printDisability = this.actionsConfig.printDisabilityConfig();

    const disableBorrow = lendingStatus.loanCount >= lendingStatus.maxLoans;
    const cantBorrowNorWaitlist =
      !lendingStatus.available_to_borrow && !waitlist;

    if (cantBorrowNorWaitlist) {
      borrow = this.actionsConfig.unavailableBookConfig();
    } else if (lendingStatus.available_to_borrow) {
      borrow = this.actionsConfig.borrowBookConfig(disableBorrow);
    }

    const actions = [borrow, waitlist, printDisability].filter(function (
      action
    ) {
      return action !== null;
    });

    return {
      primaryTitle: waitlist ? 'Another patron is using this book.' : '',
      primaryActions: actions,
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  /**
   * Builds the countdown toolbar title.
   *
   * @return string innerHTML for the dialogOpts title attribute
   */
  getBrowseCountdownTitle() {
    const secondsRemaining = this.lendingStatus.secondsLeftOnLoan;

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
    const lendingStatus = this.lendingStatus || {};

    const isAdminReading =
      URLHelper.getQueryParam('admin') == '1' && lendingStatus.isAdmin;
    const userIsPrintdisabledReading =
      URLHelper.getQueryParam('access') == '1' &&
      lendingStatus.user_is_printdisabled;

    const patronIsReading =
      lendingStatus.user_has_borrowed ||
      (lendingStatus.user_has_browsed && !lendingStatus.browsingExpired);

    const notBorrowed =
      !lendingStatus.user_has_borrowed && !lendingStatus.user_has_browsed;
    const notBorrowable =
      !lendingStatus.available_to_borrow && !lendingStatus.available_to_browse;

    const userCanAccessPrintDisabled =
      lendingStatus.is_printdisabled && lendingStatus.user_is_printdisabled;

    const canBorrow =
      (lendingStatus.available_to_browse ||
        lendingStatus.available_to_borrow) &&
      notBorrowed &&
      !lendingStatus.user_on_waitlist;

    // sequential order of hierarchal access from lendingStatus
    // - admin or print-disabled reading
    // - partron reading (browsing/borrowing)
    // - leave waitlist
    // - can borrow print-disabled
    // - can borrow
    // - only print-disabled access
    // - is on waitlist
    // - restricted items

    if (isAdminReading || userIsPrintdisabledReading) {
      lendingActions = this.adminOrPrintDisabledReadingAction();
    } else if (lendingStatus.isAdmin && notBorrowed && notBorrowable) {
      lendingActions = this.onlyAdminAction();
    } else if (patronIsReading) {
      lendingActions = this.patronIsReadingAction();
    } else if (lendingStatus.user_can_claim_waitlist) {
      lendingActions = this.leaveWaitlistAction();
    } else if (userCanAccessPrintDisabled) {
      lendingActions = this.borrowPrintDisabledAction();
    } else if (canBorrow || lendingStatus.browsingExpired) {
      lendingActions = this.borrowAction();
    } else if (lendingStatus.isPrintDisabledOnly) {
      lendingActions = this.onlyPrintDisabledAction();
    } else if (lendingStatus.user_on_waitlist) {
      lendingActions = this.onWaitlistAction();
    } else {
      lendingActions = this.restrictedAction();
    }

    // debugging console
    console.log(lendingActions.primaryTitle);
    return lendingActions;
  }
}
