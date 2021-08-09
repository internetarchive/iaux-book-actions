/* eslint class-methods-use-this: "off" */
/* eslint no-console: "off" */
/* eslint no-nested-ternary: "off" */
/* eslint-disable */

import { nothing } from 'lit-html';
import ActionHandlers from './actions-handlers.js';
import { URLHelper } from '../config/url-helper.js';
import {
  analyticsCategories,
  analyticsActions,
} from '../config/analytics-event-and-category.js';

export default class ActionsConfig extends ActionHandlers {
  constructor(lendingStatus, bwbPurchaseUrl) {
    super();
    this.lendingStatus = lendingStatus;
    this.bwbPurchaseUrl = bwbPurchaseUrl;
    this.analyticsCategories = analyticsCategories;
    this.analyticsActions = analyticsActions;
  }

  returnBookConfig() {
    return {
      text: 'Return now',
      callback: this.handleReturnIt,
      className: 'ia-button danger 10',
      analyticsEvent: {
        category: this.analyticsCategories.browse,
        action: this.analyticsActions.doneBorrowing,
      },
    };
  }

  borrowBookConfig(disableBorrow = false) {
    return {
      text: 'Borrow for 14 days',
      callback: this.handleBorrowIt,
      className: 'ia-button primary 11',
      disabled: disableBorrow,
      analyticsEvent: {
        category: this.analyticsCategories.browse,
        action: this.analyticsActions.borrow,
      },
    };
  }

  loginAndBorrowBookConfig() {
    return {
      text: 'Log In and Borrow',
      callback: this.handleLoginOk,
      className: 'ia-button primary',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.login,
      },
    };
  }

  browseBookConfig() {
    return {
      text: 'Borrow for 1 hour',
      callback: this.handleBrowseIt,
      className: 'ia-button primary 12',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.browse,
      },
    };
  }

  leaveWaitlistConfig() {
    return {
      text: 'Leave waitlist',
      callback: this.handleRemoveFromWaitingList,
      className: 'ia-button dark',
      analyticsEvent: {
        category: this.analyticsCategories.preview,
        action: this.analyticsActions.waitlistLeave,
      },
    };
  }

  waitlistConfig() {
    const isLoggedIn = !!this.userid;
    const mustLogIn = true;

    const lendingStatus = this.lendingStatus || [];
    const bookHasWaitlist = lendingStatus.available_to_waitlist;

    let clickAction = this.handleLoginOk;

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
      clickAction = this.handleReserveIt;
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
    if (!this.bwbPurchaseUrl || this.bwbPurchaseUrl == '') return;

    return {
      text: 'Better World Books',
      title: 'Better World Books',
      url: this.bwbPurchaseUrl,
      // target: '_blank',
      className: 'ia-button purchase dark',
      analyticsEvent: {
        category: this.analyticsCategories.purchase,
        action: this.analyticsActions.purchase,
      },
    };
  }

  adminOrPrintDisabledConfig() {
    const mode =
      URLHelper.getQueryParam('admin') === '1' ? 'admin' : 'print-disabled';
    const message = `← Exit ${mode} access mode`;

    return {
      title: message,
      url: URLHelper.getBackHref(),
      target: '_blank',
      className: 'ia-button danger',
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
      className: 'ia-button primary',
      disabled: true,
    };
  }

  isEmbed(identifier, title) {
    const description = `<img src=/images/glogo-jw.png> <a href=/details/${identifier}>${title}</a>`;
    return {
      primaryTitle: description,
      primaryActions: [],
      primaryColor: '',
    };
  }
}
