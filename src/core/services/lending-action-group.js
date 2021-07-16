// import { URLHelper } from './url-helper';
import { html } from 'lit-element';

import { URLHelper } from '../config/url-helper';

import {
  analyticsCategories, analyticsActions
} from '../config/analytics-event-and-category';

export default class LendingActionGroup {
  constructor(lendingStatus, width) {
    this.userid = lendingStatus.userid;
    this.texts = '';
    this.title = '';
    this.width = width;
    this.lendingStatus = lendingStatus;
    this.actions = [];
    this.stateByLoanStatus = '';
    this.analyticsCategories = analyticsCategories;
    this.analyticsActions = analyticsActions;
    this.getCurrentLendingStatus();
    // this.purchaseButton = this.renderPurchaseButton();
  }

  getCurrentLendingStatus() {
    console.log(this.width)
    const lendingState = this.getLendingStateByLoanStatus();

    console.log('lendingState:- ', lendingState)

    if (lendingState === 'accessAdminOrPrintDisabled') {
      this.accessAdminOrPrintDisabled();
    }

    if (lendingState === 'isBorrowing') {
      this.isBorrowing();
    }

    if (lendingState === 'isBrowsing') {
      this.isBrowsing();
    }

    if (lendingState === 'readyToRedeemBorrow') {
      this.readyToRedeemBorrow();
    }

    if (lendingState === 'canBorrow') {
      this.canBorrow();
    }

    if (lendingState === 'canBorrowPrintDisabled') {
      this.canBorrowPrintDisabled();
    }

    if (lendingState === 'onlyPrintDisabled') {
      this.onlyPrintDisabled();
    }

    if (lendingState === 'isOnWaitlist') {
      this.isOnWaitlist();
    }

    if (lendingState === 'isRestricted') {
      this.isRestricted();
    }

    if (lendingState === 'isOnWaitlist') {
      this.isOnWaitlist();
    }
  }

  purchaseButton() {
    return {
      text: 'Purchase',
      title: 'Purchase',
      url: 'https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863',
      target: '_blank',
      className: 'ia-button purchase dark',
      analyticsEvent: {
        category: this.analyticsCategories.purchase,
        action: this.analyticsActions.purchase
      }
    };
  }

  accessAdminOrPrintDisabled() {
    var backHref = URLHelper.getBackHref();
    // console.log(backHref)

    var mode = URLHelper.get_query_param('admin') == '1' ? 'admin' : 'print-disabled';
    var message = '← Exit ' + mode + ' access mode';

    // this.title = html`<a href=${backHref}>${message}</a>`;
    this.title = message;
  }

  isBorrowing() {
    if (URLHelper.isOnStreamPage()) { return; }

    var daysLeftStr = this.lendingStatus.daysLeftOnLoan > 1
      ? 'Your loan of this book has ' + this.lendingStatus.daysLeftOnLoan + ' days left.'
      : 'This is the last day of this loan.';

    this.title = daysLeftStr;
    var actionConfig = {
      title: daysLeftStr,
      actions: [{
        text: 'Return now',
        callback: 'self.handleReturnIt', // todo: pass cb as arg
        className: 'ia-button danger 12',
        analyticsEvent: {
          category: this.analyticsCategories.borrow,
          action: this.analyticsActions.doneBorrowing
        }
      }]
    };

    this.actions = actionConfig;
    return;
  }


  /**
   * Constructs config object used to render borrows button via `buildActionButton`
   * in bookreader/BookReaderHelpers.js.
   *
   * @param function callback function called on button click
   * @param boolean disableBorrow represents the HTML boolean disabled property
   * @return object actions config
   */
  deprioritizedBorrowButton(callback, disableBorrow, analyticsEvent) {
    return {
      text: 'Borrow for 14 days',
      callback: callback,
      className: 'ia-button primary 16',
      disabled: disableBorrow,
      analyticsEvent: analyticsEvent,
    };
  }

  waitlistButton() {
    var isLoggedIn = !!this.userid;
    var mustLogIn = true;

    var lendingStatus = this.lendingStatus || {};
    var bookHasWaitlist = lendingStatus.available_to_waitlist;
    var clickAction = 'mustLogIn';

    if (!bookHasWaitlist || lendingStatus.available_to_borrow) {
      return null;
    }

    var waitlistIsOpen = lendingStatus.available_to_waitlist && !lendingStatus.available_to_borrow;
    var waitlistButtonText = !isLoggedIn
      ? 'Log In and Join waitlist'
      : 'Join waitlist for 14 day borrow';
    var analyticsCategory = isLoggedIn && lendingStatus.user_has_browsed ? 'browse' : 'preview';
    var analyticsAction = isLoggedIn ? 'waitlistJoin' : 'login';

    if (isLoggedIn && !lendingStatus.user_on_waitlist && waitlistIsOpen) {
      var clickAction = 'reserveBook';
    }

    var deprioritize = lendingStatus.user_has_browsed || lendingStatus.available_to_browse;
    var buttonStyle = deprioritize ? 'ia-button danger' : 'ia-button danger';

    return {
      text: waitlistButtonText,
      callback: clickAction,
      className: buttonStyle,
      analyticsEvent: {
        category: this.analyticsCategories[analyticsCategory],
        action: this.analyticsActions[analyticsAction]
      }
    };
  };


  isBrowsing() {
    var lendingStatus = this.lendingStatus;
    var disableBorrow = lendingStatus.loanCount >= lendingStatus.maxLoans;
    var returnBook = {
      text: 'Return now',
      callback: function() { 'self.handleReturnIt();' },
      className: 'ia-button danger 15',
      analyticsEvent: {
        category: this.analyticsCategories.browse,
        action: this.analyticsActions.doneBorrowing
      }
    };
    var deprioritizedBorrowAnalytics = {
      category: this.analyticsCategories.browse,
      action: this.analyticsActions.borrow
    };
    var borrowBook = lendingStatus.available_to_borrow
      ? this.deprioritizedBorrowButton('self.handleBorrowIt', disableBorrow, deprioritizedBorrowAnalytics)
      : null;

    var actions = [returnBook, borrowBook, this.waitlistButton()].filter(function (button) { return button !== null});
    // var title = this.getBrowseCountdownTitle(lendingStatus.secondsLeftOnLoan);
    // startBrowseCountdown();

    var actionConfig = {
      title: 'title + LendingStatelessUI.moreInfoIcon',
      foot: 'printDisabilityLine()',
      actions: actions,
    };

    this.title = actionConfig.title;
    this.actions = actionConfig
  }

  readyToRedeemBorrow() {
    var lendingStatus = this.lendingStatus || {};
    var waitlist = {
      text: 'Leave waitlist',
      callback: 'self.handleRemoveFromWaitingList',
      className: 'ia-button dark',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.waitlistLeave
      }
    };
    var borrow = {
      text: 'Borrow for 14 days',
      callback: 'self.handleBorrowFromHold',
      className: 'ia-button primary',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.borrow
      }
    };
    var browse = lendingStatus.available_to_browse
      ? {
        text: 'Borrow for 1 hour',
        callback: 'self.handleBrowseIt',
        analyticsEvent: {
          category: this.analyticsCategories.preview,
          action: this.analyticsActions.browse
        }
      }
      : null;

    var dropdownOptions = browse ? [borrow, browse] : [];
    var actions = !browse ? [borrow, waitlist]: [waitlist];

    var actionConfig = {
      title: 'You are at the top of the waitlist for this book.',
      foot: 'printDisabilityLine()',
      prefixActions: dropdownOptions,
      actions: actions
    };

    this.title = actionConfig.title;
    
    this.actions = actionConfig
  }

  canBorrowPrintDisabled() {
    var lendingStatus = this.lendingStatus || {};

    // if user isn't printDisabled, book is available to browse & borrow, then we
    // redirect to canborrow
    if (
      !lendingStatus.user_is_printdisabled && 
      (lendingStatus.available_to_browse || lendingStatus.available_to_borrow)
    ) {
      // return this.canBorrow();
    }

    var actionConfig =  {
      title: 'You are eligible for print-disabled access.',
      actions: [{
        text: 'Borrow for 14 days',
        callback: self.handleBorrowIt,
        className: 'ia-button primary',
        title: 'You are eligible for print-disabled access.',
        analyticsEvent: {
          category: this.analyticsCategories.preview,
          action: this.analyticsActions.borrow
        }
      }]
    };
    this.title = actionConfig.title;

    this.actions = actionConfig;
  }

  canBorrow1Hr() {
    var lendingStatus = this.lendingStatus || {};

    var possibleTitles = {
      one_hour: 'Renewable every hour, pending availability.',
      session_tryagain: 'Another patron is using this book. Please check back later.',
      session_expired: 'Your loan has expired.'
    };
    // assess borrowable state
    var browsingHasExpired = (!lendingStatus.available_to_browse && lendingStatus.browsingExpired);
    var canBrowse = lendingStatus.available_to_browse || browsingHasExpired;
    var canBrowseAndBorrow = canBrowse && lendingStatus.available_to_borrow;
    var canBrowseHasWaitlist = canBrowse && (!lendingStatus.available_to_borrow && lendingStatus.available_to_waitlist);
    var canBrowseCantBorrowCantWaitlist = canBrowse && (!lendingStatus.available_to_borrow && !lendingStatus.available_to_waitlist);
    var allBrowsableCopiesTaken = (lendingStatus.available_browsable_copies < 1)
      && (lendingStatus.available_browsable_copies < lendingStatus.max_browsable_copies);
    // end config

    console.log('1hr')
    var title = browsingHasExpired
    ? possibleTitles.session_expired
    : (!canBrowse && allBrowsableCopiesTaken)
      ? possibleTitles.session_tryagain
      : (!canBrowse && lendingStatus.available_to_waitlist)
        ? possibleTitles.waitlist
        : possibleTitles.one_hour;

    // console.log('1hr')

    /* Borrowable 1hr */
    var oneHourBorrowHandler = function () { self.handleBrowseIt() };
    var oneHourBorrowText = browsingHasExpired ? 'Borrow again' : 'Borrow for 1 hour';
    var currentAnalyticsCategory = browsingHasExpired ? 'browse' : 'preview';
    var browseAgainEvent = {
      category: this.analyticsCategories.browse,
      action: this.analyticsActions.browseAgain
    };
    // console.log('1hr')

    var firstBrowseEvent = {
      category: this.analyticsCategories.preview,
      action: this.analyticsActions.browse
    };
    var oneHrBorrow = {
      text: oneHourBorrowText,
      callback: oneHourBorrowHandler,
      analyticsEvent: browsingHasExpired ? browseAgainEvent : firstBrowseEvent
    };
    // console.log('1hr1')

    var oneHrBorrowPrimary = Object.assign({}, oneHrBorrow, { className: 'btn-primary' });
    var fourteenDayBorrow = {
      text: 'Borrow for 14 days',
      callback: function () { self.handleBorrowIt() },
      analyticsEvent: {
        category: this.analyticsCategories[currentAnalyticsCategory],
        action: this.analyticsActions.borrow
      }
    };
    // console.log('1hr')

    var waitlist = {
      text: 'Join waitlist for 14 day borrow',
      callback: function () { 'self.handleReserveIt()' },
      analyticsEvent: {
        category: this.analyticsCategories[currentAnalyticsCategory],
        action: this.analyticsActions.waitlistJoin
      }
    };
    // console.log('1hr')

    var dropdownOptions = canBrowseAndBorrow
      ? [oneHrBorrow, fourteenDayBorrow]
      : canBrowseHasWaitlist
        ? [oneHrBorrow, waitlist]
        : [];
    var actions = canBrowseCantBorrowCantWaitlist ? [oneHrBorrowPrimary] : [];

    console.log(canBrowseCantBorrowCantWaitlist)
    console.log(dropdownOptions)
// 
    this.title = title + 'LendingStatelessUI.moreInfoIcon';
    this.actions = actions;
// 
    // return {
    //   title: title + 'LendingStatelessUI.moreInfoIcon',
    //   foot: 'printDisabilityLine()',
    //   prefixActions: dropdownOptions,
    //   actions: actions
    // };
  }

  canBorrow() {
    var lendingStatus = this.lendingStatus || {};
    var isLoggedIn = !!this.userid;

    // console.log('ss')

    if (!isLoggedIn) {
      return this.loggedOutOptions();
    }
    // console.log('ss1')

    var canBrowse = lendingStatus.available_to_browse || (!lendingStatus.available_to_browse && lendingStatus.browsingExpired);
    if (!canBrowse) {
      return this.canBorrow1Hr();
    }

    // console.log('ss2')
    /* Borrow 14day */
    var waitlist = !!this.waitlistButton();

    // console.log(waitlist)
    var disableBorrow = lendingStatus.loanCount >= lendingStatus.maxLoans;
    var cantBorrowNorWaitlist = !lendingStatus.available_to_borrow && !waitlist;
    var borrow = cantBorrowNorWaitlist
      ? {
          text: 'Borrow unavailable',
          callback: function () {},
          className: 'ia-button primary',
          disabled: true,
        }
      : lendingStatus.available_to_borrow
        ? {
          text: 'Borrow for 14 days',
          callback: this.handleBorrowIt,
          className: 'ia-button primary',
          disabled: disableBorrow,
          analyticsEvent: {
            category: this.analyticsCategories.borrow,
            action: this.analyticsActions.borrow
          }
        }
        : null;
    var actions = [borrow, this.waitlistButton()].filter(function (action) { return action !== null});
    var title = this.waitlistButton() ? ('Another patron is using this book.' + 'LendingStatelessUI.moreInfoIcon') : '';

    var actionConfig =  {
      title: 'title',
      foot: 'printDisabilityLine()',
      actions: actions,
    };
    // console.log(actionConfig)
    this.actions = actionConfig
  }

  handleBorrowIt() {
    // alert('hello')
    console.log('sss');
  }

  onlyPrintDisabled() {
    var actions = !this.lendingInfo.isAdmin ? [{
      text: 'Borrow unavailable',
      callback: function () {},
      className: 'btn-primary',
      disabled: true
    }] : [];

    const actionConfig = {
      title: 'Book available to patrons with print disabilities.',
      foot: printDisabilityLine(),
      actions: actions
    };
    this.actions = actionConfig;
  }

  isOnWaitlist() {
    const actionConfig = {
      title: ('You are on the waitlist for this book.' + 'LendingStatelessUI.moreInfoIcon'),
      // foot: $('<div>')
      //   .addClass('muted')
      //   .text('You will be notified via email when your loan is ready.')
      //   .append(printDisabilityLink()),
      actions: [{
        text: 'Leave waitlist',
        callback: self.handleRemoveFromWaitingList,
        className: 'ia-button primary',
        analyticsEvent: {
          category: this.analyticsCategories.preview,
          action: this.analyticsActions.waitlistLeave
        }
      }]
    };

    this.actions = actionConfig;
  }

  isEmbed(identifier, title) {      
    var description = '<img src=/images/glogo-jw.png> <a href=/details/' + identifier + '>' + title + '</a>';
    return {
      title: description,
      foot: '',
      actions: []
    };
  }

  isRestricted() {
    // Visit /details/activemeasuresse0000ridt
    var restrictedDescription = '<div class="BookReaderMessage">' +
      'Its access has been restricted.  ' +
      '<a href="/details/inlibrary">Browse our lendable books</a>.' +
      '</div>';

    this.actions = {
      title: 'This book is not available at this time.',
      foot: restrictedDescription,
      actions: [{
        text: 'Borrow unavailable',
        callback: function () {},
        className: 'ia-button primary',
        disabled: true
      }]
    };
  }

  loggedOutOptions() {
    var lendingStatus = this.lendingStatus || {};

    var showCantBorrowPlaceholder = !lendingStatus.available_to_waitlist && !lendingStatus.available_to_borrow;

    var borrow = lendingStatus.available_to_borrow || lendingStatus.available_to_browse
    ? {
        text: 'Log In and Borrow',
        callback: 'self.handleLoginOk',
        className: 'ia-button primary',
        analyticsEvent: {
          category: this.analyticsCategories.preview,
          action: this.analyticsActions.login
        }
      }
      : showCantBorrowPlaceholder
      ? {
          text: 'Borrow unavailable',
          callback: function () {},
          className: 'ia-button primary',
          disabled: true
        }
        : null;

    // console.log(borrow)
    var actions = [borrow, this.waitlistButton()].filter(function (action) { return action !== null; });
    console.log(actions)

    var title = lendingStatus.available_to_browse
    ? 'Renewable every hour, pending availability.'
    : lendingStatus.available_to_borrow
      ? 'This book can be borrowed for 14 days.'
      : 'Another patron is using this book.';

    const actionConfig = {
      title: '(title + LendingStatelessUI.moreInfoIcon)',
      foot: 'printDisabilityLine()',
      actions: actions,
    };
    this.actions = actionConfig;
  }



  getBrowseCountdownTitle(secondsRemaining) {
    var borrowEndTime = new Date(+(new Date()) + secondsRemaining * 1000);
    var hour = borrowEndTime.getHours() % 12;
    var minute = ('' + borrowEndTime.getMinutes()).replace(/^(\d{1})$/, '0$1');
    var ampm = borrowEndTime.getHours() > 11 ? ' PM' : ' AM';
    if (hour === 0) { hour = 12; }
    return 'Borrow ends at ' + hour + ':' + minute + ampm;
  }

  startBrowseCountdown() {
    var secondsRemaining = self.lendingInfo.secondsLeftOnLoan;
    var stopCountdown = function() {
      clearInterval(self.browseCountdownInterval);
      self.browseCountdownInterval = null;
    }

    if (!secondsRemaining) {
      if (self.browseCountdownInterval) {
        stopCountdown();
      }
      renderBrowseAgainToolbar();
      addTheaterOverlay();
      return;
    }
    self.browseCountdownInterval = setInterval(function() {
      secondsRemaining--;
      if (!secondsRemaining) {
        stopCountdown();
        renderBrowseAgainToolbar();
        addTheaterOverlay();
        return;
      }
    }, 1000);
  }



  static userOnWaitList1() {
    if (this.lendingStatus.is_printdisabled) {
      var item = {
        url: '/account/login',
        title: 'Join Waitlist',
        analyticsEvent: 'JoinWaitlist',
      };
    }
 
    this.actions.push(item);
  }

  static printDisabled() {
    if (this.lendingStatus.is_printdisabled) {
      var item = {
        url: '/account/login',
        title: 'Print Disabled Access',
        analyticsEvent: 'PrintDisabled',
      };
    }

    this.actions.push(item);
  }

  getLendingStateByLoanStatus() {
    var toolbarType;

    var lendingStatus = this.lendingStatus || {};

    // console.log('lendingStatus', lendingStatus)
    var isAdmin = URLHelper.get_query_param('admin') == '1' && lendingStatus.isAdmin;
    var accessPrintDisabled = URLHelper.get_query_param('access') == '1' && lendingStatus.user_is_printdisabled;

    // console.log(lendingStatus)
    var notBorrowed = !lendingStatus.user_has_borrowed || !lendingStatus.user_has_browsed;
    var userCanAccessPrintDisabled = lendingStatus.is_printdisabled && lendingStatus.user_is_printdisabled;
  
    // sequential order of hierarchal access
    // admin -> is borrowing -> is waitlist -> can borrow print disabled -> can borrow -> isOnWaitlist userCanAccessPrintDisabled-> restricted
    if (isAdmin || accessPrintDisabled) {
      toolbarType = 'accessAdminOrPrintDisabled';
    } else if (lendingStatus.user_has_borrowed) {
      toolbarType = 'isBorrowing';
    } else if (lendingStatus.user_has_browsed) {
      toolbarType = 'isBrowsing';
    } else if (lendingStatus.user_can_claim_waitlist) { // userHoldIsReady
      toolbarType = 'readyToRedeemBorrow';
    } else if (userCanAccessPrintDisabled) {
      toolbarType = 'canBorrowPrintDisabled';
    } else if (notBorrowed && lendingStatus.is_lendable && !lendingStatus.user_on_waitlist) {
      toolbarType = 'canBorrow';
    } else if (lendingStatus.isPrintDisabledOnly) {
      toolbarType = 'onlyPrintDisabled';
    } else if (!lendingStatus.user_on_waitlist && !lendingStatus.user_can_claim_waitlist) {
      toolbarType = 'isOnWaitlist'
    } else {
      toolbarType = 'isRestricted';
    }
  
    return toolbarType;
  }
}
