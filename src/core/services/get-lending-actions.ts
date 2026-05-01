import { URLHelper } from '../config/url-helper';
import {
  analyticsCategories,
  analyticsActions,
} from '../config/analytics-event-and-category';
import ActionsConfig from './actions-config';
import type {
  ActionButtonConfig,
  ActionsResult,
  LendingStatus,
} from '../types/lending-status';

/**
 * Builds the action set rendered by `<ia-book-actions>`.
 *
 * Returns an `ActionsResult` describing:
 *  - `primaryTitle`     loan-state line ("Renews automatically...")
 *  - `primaryActions`   primary buttons (Browse, Borrow, Return, Waitlist)
 *  - `primaryColor`     button-group color
 *  - `secondaryActions` secondary buttons (Admin Access, Purchase Link)
 *  - `borrowType`       the active borrow flavor, when known
 */

/** Enum-ish lookup of book title strings */
export const bookTitles = {
  available_1hr: 'Renews automatically with continued use.',
  available_14d: 'This book can be borrowed for 14 days.',
  available_pd: 'Book available to patrons with print disabilities.',
  available_waitlist: 'A waitlist is available.',
  admin_access: 'You have administrative privileges to read this book.',
  claim_waitlist: 'You are at the top of the waitlist for this book.',
  being_borrowed: 'Another patron is using this book. Please check back later.',
  eligible_pd: 'You are eligible for print-disabled access.',
  on_waitlist: 'You are on the waitlist for this book.',
  session_expired: 'Renews automatically with continued use.',
  unavailable: 'This book is not available at this time.',
} as const;

export class GetLendingActions {
  userid: string;
  identifier: string;
  lendingStatus: LendingStatus;
  bwbPurchaseUrl: string;
  analyticsCategories = analyticsCategories;
  analyticsActions = analyticsActions;
  actionsConfig: ActionsConfig;

  constructor(
    userid: string,
    identifier: string,
    lendingStatus: LendingStatus,
    bwbPurchaseUrl: string,
  ) {
    this.userid = userid;
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.bwbPurchaseUrl = bwbPurchaseUrl;
    this.actionsConfig = new ActionsConfig(
      this.userid,
      this.identifier,
      this.lendingStatus,
      this.bwbPurchaseUrl,
    );
  }

  onlyAdminAction(): ActionsResult {
    return {
      primaryTitle: bookTitles.admin_access,
      primaryActions: [],
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  adminOrPrintDisabledReadingAction(): ActionsResult {
    return {
      primaryTitle: '',
      primaryActions: [],
      secondaryActions: [this.actionsConfig.adminOrPrintDisabledExitConfig()],
      borrowType: 'adminBorrowed',
    };
  }

  patronIsReadingAction(): ActionsResult {
    const lendingStatus = this.lendingStatus || {};
    const loanCount = (lendingStatus.loanCount as number) ?? 0;
    const maxLoans = (lendingStatus.maxLoans as number) ?? 0;
    const disableBorrow = loanCount >= maxLoans;

    let primaryTitleText = '';
    const isBrowsing =
      !!lendingStatus.user_has_browsed && !lendingStatus.browsingExpired;
    if (isBrowsing) {
      primaryTitleText = bookTitles.available_1hr;
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
      borrowType: isBrowsing ? 'browsed' : 'borrowed',
    };
  }

  claimWaitlistAction(): ActionsResult {
    const lendingStatus = this.lendingStatus || {};

    const leaveWaitlist = this.actionsConfig.leaveWaitlistConfig();
    const borrowBook = this.actionsConfig.borrowBookConfig();
    const browseBook = lendingStatus.available_to_browse
      ? this.actionsConfig.firstBrowseConfig()
      : null;

    const actions: Array<ActionButtonConfig | null> = [borrowBook];
    if (browseBook) actions.push(browseBook);
    actions.push(leaveWaitlist);

    return {
      primaryTitle: bookTitles.claim_waitlist,
      primaryActions: actions,
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  borrowPrintDisabledAction(): ActionsResult {
    return {
      primaryTitle: bookTitles.eligible_pd,
      primaryActions: [this.actionsConfig.borrowBookConfig()],
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  onlyPrintDisabledAction(): ActionsResult {
    const unavailable = !this.lendingStatus.isAdmin
      ? this.actionsConfig.unavailableBookConfig()
      : null;
    return {
      primaryTitle: bookTitles.available_pd,
      primaryActions: [unavailable],
      primaryColor: 'primary',
      secondaryActions: [],
    };
  }

  onWaitlistAction(): ActionsResult {
    return {
      primaryTitle: bookTitles.on_waitlist,
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

  /** see `/activemeasuresse0000ridt` for restricted-item behavior */
  restrictedAction(): ActionsResult {
    const lendingStatus = this.lendingStatus || {};
    const anotherPatronUsing =
      !!lendingStatus.max_browsable_copies &&
      !lendingStatus.available_lendable_copies;
    const title = anotherPatronUsing
      ? bookTitles.being_borrowed
      : bookTitles.unavailable;

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

  loggedOutOptions(): ActionsResult {
    const lendingStatus = this.lendingStatus || {};

    const showCantBorrowPlaceholder =
      !lendingStatus.available_to_waitlist &&
      !lendingStatus.available_to_borrow;

    const waitlist = this.actionsConfig.waitlistConfig();
    let borrow: ActionButtonConfig | null = null;

    if (
      lendingStatus.available_to_borrow ||
      lendingStatus.available_to_browse
    ) {
      borrow = this.actionsConfig.loginAndBorrowBookConfig();
    } else if (showCantBorrowPlaceholder) {
      borrow = this.actionsConfig.unavailableBookConfig();
    }

    const printDisability = this.actionsConfig.printDisabilityConfig();
    const actions = [borrow, waitlist, printDisability].filter(
      action => action !== null,
    );

    const title = lendingStatus.available_to_browse
      ? bookTitles.available_1hr
      : lendingStatus.available_to_borrow
        ? bookTitles.available_14d
        : bookTitles.unavailable;

    return {
      primaryTitle: title,
      primaryActions: actions,
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  borrow1HrAction(): ActionsResult {
    const lendingStatus = this.lendingStatus || {};

    const browsingHasExpired =
      !lendingStatus.available_to_browse && !!lendingStatus.browsingExpired;
    const canBrowse = !!lendingStatus.available_to_browse || browsingHasExpired;
    const canBrowseAndBorrow = canBrowse && !!lendingStatus.available_to_borrow;
    const canBrowseHasWaitlist =
      canBrowse &&
      !lendingStatus.available_to_borrow &&
      !!lendingStatus.available_to_waitlist;
    const canBrowseCantBorrowCantWaitlist =
      canBrowse &&
      !lendingStatus.available_to_borrow &&
      !lendingStatus.available_to_waitlist;

    const availableBrowsable =
      (lendingStatus.available_browsable_copies as number) ?? 0;
    const maxBrowsable = (lendingStatus.max_browsable_copies as number) ?? 0;
    const allBrowsableCopiesTaken =
      availableBrowsable < 1 && availableBrowsable < maxBrowsable;

    const title = browsingHasExpired
      ? bookTitles.session_expired
      : !canBrowse && allBrowsableCopiesTaken
        ? bookTitles.being_borrowed
        : !canBrowse && lendingStatus.available_to_waitlist
          ? bookTitles.available_waitlist
          : bookTitles.available_1hr;

    const oneHrBorrow = browsingHasExpired
      ? this.actionsConfig.browseAgainConfig()
      : this.actionsConfig.firstBrowseConfig();

    const borrow = this.actionsConfig.borrowBookConfig();
    const waitlist = this.actionsConfig.waitlistConfig();
    const printDisability = this.actionsConfig.printDisabilityConfig();

    const dropdownOptions: Array<ActionButtonConfig | null> = canBrowseAndBorrow
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
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  borrowAction(): ActionsResult {
    const lendingStatus = this.lendingStatus || {};
    const isLoggedIn = !!this.userid;

    if (!isLoggedIn) {
      return this.loggedOutOptions();
    }

    if (lendingStatus.available_to_browse || lendingStatus.browsingExpired) {
      return this.borrow1HrAction();
    }

    let borrow: ActionButtonConfig | null = null;
    const waitlist = this.actionsConfig.waitlistConfig();
    const printDisability = this.actionsConfig.printDisabilityConfig();

    const loanCount = (lendingStatus.loanCount as number) ?? 0;
    const maxLoans = (lendingStatus.maxLoans as number) ?? 0;
    const disableBorrow = loanCount >= maxLoans;
    const cantBorrowNorWaitlist =
      !lendingStatus.available_to_borrow && !waitlist;

    if (cantBorrowNorWaitlist) {
      borrow = this.actionsConfig.unavailableBookConfig();
    } else if (lendingStatus.available_to_borrow) {
      borrow = this.actionsConfig.borrowBookConfig(disableBorrow);
    }

    const actions = [borrow, waitlist, printDisability].filter(
      action => action !== null,
    );

    return {
      primaryTitle: waitlist ? bookTitles.being_borrowed : '',
      primaryActions: actions,
      primaryColor: 'primary',
      secondaryActions: [
        this.actionsConfig.adminAccessConfig(),
        this.actionsConfig.purchaseConfig(),
      ],
    };
  }

  /**
   * @deprecated
   * Builds the countdown toolbar title.
   */
  getBrowseCountdownTitle(): string {
    const secondsRemaining =
      (this.lendingStatus.secondsLeftOnLoan as number) ?? 0;
    const borrowEndTime = new Date(+new Date() + secondsRemaining * 1000);
    let hour = borrowEndTime.getHours() % 12;
    const minute = ('' + borrowEndTime.getMinutes()).replace(
      /^(\d{1})$/,
      '0$1',
    );
    const ampm = borrowEndTime.getHours() > 11 ? ' PM' : ' AM';
    if (hour === 0) hour = 12;
    return `Borrow ends at ${hour}:${minute}${ampm}`;
  }

  getCurrentLendingActions(): ActionsResult | undefined {
    let lendingActions: ActionsResult | undefined;
    const lendingStatus = this.lendingStatus || {};

    const isAdminReading =
      URLHelper.getQueryParam('admin') === '1' && !!lendingStatus.isAdmin;
    const userIsPrintdisabledReading =
      URLHelper.getQueryParam('access') === '1' &&
      !!lendingStatus.user_is_printdisabled;

    const patronIsReading =
      !!lendingStatus.user_has_borrowed ||
      (!!lendingStatus.user_has_browsed && !lendingStatus.browsingExpired);

    const notBorrowed =
      !lendingStatus.user_has_borrowed && !lendingStatus.user_has_browsed;
    const notBorrowable =
      !lendingStatus.available_to_borrow && !lendingStatus.available_to_browse;

    const userCanAccessPrintDisabled =
      !!lendingStatus.is_printdisabled && !!lendingStatus.user_is_printdisabled;

    const canBorrow =
      (!!lendingStatus.available_to_browse ||
        !!lendingStatus.available_to_borrow) &&
      notBorrowed &&
      !lendingStatus.user_on_waitlist;

    if (isAdminReading || userIsPrintdisabledReading) {
      lendingActions = this.adminOrPrintDisabledReadingAction();
    } else if (lendingStatus.isAdmin && notBorrowed && notBorrowable) {
      lendingActions = this.onlyAdminAction();
    } else if (patronIsReading) {
      lendingActions = this.patronIsReadingAction();
    } else if (lendingStatus.user_can_claim_waitlist) {
      lendingActions = this.claimWaitlistAction();
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

    return lendingActions;
  }
}
