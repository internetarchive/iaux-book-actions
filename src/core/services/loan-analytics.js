/* eslint-disable class-methods-use-this */

import { analyticsCategories } from '../config/analytics-event-and-category.js';
import * as Cookies from './doc-cookies.js';

/**
 * This class is used to send different GA events for loan system.
 */
export default class LoanAnanlytics {
  constructor() {
    this.identifier = undefined;

    /**
     * contains the counts we send to GA
     * @type {object}
     * - @param {number} - browse count
     * - @param {number} - renew count
     * - @param {number} - expire count
     */
    this.gaStats = {};
  }

  /**
   * store loan stats count in cookies to remember the count we need to sent GA
   *
   * @param {string} identifier - book id
   * @param {string} action - user action on book
   * @return {void}
   * @memberof ActionsHandler
   */
  async storeLoanStatsCount(idetifier, action = '') {
    this.identifier = idetifier;

    try {
      await this.getLoanStatsCount(action);

      const date = new Date();
      date.setHours(date.getHours() + 2); // 2 hours

      // set new value
      await Cookies.setItem(
        this.getLoanCountStorageKey,
        JSON.stringify(this.lendingEventCounts),
        date,
        '/'
      );
    } catch (error) {
      console.log(error);
      this.sendEvent('Cookies-Error-Actions', error, this.identifier);
    }
  }

  /**
   * get loan stats count from cookies for GA
   *
   * @param {string} action browse|autorenew|etc...
   * @memberof ActionsHandler
   */
  async getLoanStatsCount(action) {
    this.lendingEventCounts = JSON.parse(
      await Cookies.getItem(this.getLoanCountStorageKey)
    );

    this.gaStats = this.lendingEventCounts ?? {
      browse: 0,
      renew: 0,
      expire: 0,
    };

    let browse = this.lendingEventCounts?.browse ?? 0;
    let renew = this.lendingEventCounts?.renew ?? 0;
    let expire = this.lendingEventCounts?.expire ?? 0;

    switch (action) {
      case 'browse' || 'browseagain':
        browse = browse ? Number(browse) + 1 : 1;
        this.gaStats.browse = browse;

        // reset renew and expire count
        renew = 0;
        expire = 0;
        break;

      case 'autorenew':
        renew = renew ? Number(renew) + 1 : 1;
        this.gaStats.renew = renew;
        break;

      case 'return' || 'autoreturn':
        expire = expire ? Number(expire) + 1 : 1;
        this.gaStats.expire = expire;

        // reset renew and expire count
        renew = 0;
        expire = 0;
        break;
      default:
        break;
    }

    // store these counts in cookies
    this.lendingEventCounts = { browse, renew, expire };

    // obtain GA category, event
    const category = analyticsCategories.browse;
    const event = `browse${this.paddedNumber(
      this.gaStats?.browse
    )}-autorenew${this.paddedNumber(this.gaStats?.renew)}:${action}`;

    // send google analytics events
    this.sendEvent(category, event, this.identifier);
  }

  /**
   * get zero padded number
   *
   * @param {number} number
   * @return {string} 001|010
   * @memberof LoanAnanlytics
   */
  paddedNumber(number) {
    if (number) return number.toString().padStart(3, '0');

    return '000';
  }

  /**
   * get storage key for loan stats count
   *
   * @readonly
   * @memberof LoanAnanlytics
   */
  get getLoanCountStorageKey() {
    return `br-browse-${this.identifier}`;
  }

  /**
   * reponsible to sent events to GA
   *
   * @param {*} eventCategory
   * @param {*} eventAction
   * @param {*} label
   * @param {*} extraParams
   * @memberof LoanAnanlytics
   */
  sendEvent(eventCategory, eventAction, label, extraParams) {
    console.log(
      'eventCategory:-',
      eventCategory,
      '\t||\teventAction:-',
      eventAction,
      '\t||\tlabel:-',
      label
    );

    window?.archive_analytics?.send_event_no_sampling(
      eventCategory,
      eventAction,
      label || this.identifier,
      extraParams
    );
  }
}
