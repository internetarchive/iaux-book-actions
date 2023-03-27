/* eslint-disable class-methods-use-this */

import { nothing } from 'lit';

/**
 * This class is used to determine if use is eligible for auto renew loan.
 */
export class LoanRenewHelper {
  constructor(hasPageChanged, identifier, localCache, loanRenewTimeConfig) {
    this.hasPageChanged = hasPageChanged;
    this.identifier = identifier;
    this.localCache = localCache;
    this.loanRenewTimeConfig = loanRenewTimeConfig;

    // messages for auto return machenism
    this.loanRenewMessage =
      'This book has been renewed for #time #unitsOfTime.';
    this.loanReturnWarning =
      'This book will be automatically returned in #time #unitsOfTime unless you turn a page.';

    // private props
    this.result = {
      texts: null,
      renewNow: false,
    };
  }

  handleLoanRenew() {
    try {
      if (this.hasPageChanged) {
        return this.pageChanged(); // user clicked on page
      }
      return this.autoChecker(); // auto checker at last 10th minute
    } catch (error) {
      console.log(error);
    }

    return nothing;
  }

  /**
   * Trigger this function when user has browsed a book and change the post
   * - every time user change the page, we set current time in indexedDB
   * - also check if need to auto renew current loan
   *
   * @returns {this.result}
   */
  async pageChanged() {
    const {
      loanRenewAtLast, // 50
    } = this.loanRenewTimeConfig;
    const currentTime = new Date();
    const loanTime = await this.localCache.get(`${this.identifier}-loanTime`);

    const lastTimeFrame = this.changeTime(loanTime, loanRenewAtLast, 'sub');

    // if user viewed new page in last 10 minutes, renew immediately
    if (lastTimeFrame !== null && currentTime >= lastTimeFrame) {
      this.result.texts = this.loanRenewMessage;
      this.result.renewNow = true;
    }

    this.setPageChangedTime();
    return this.result;
  }

  /**
   * Trigger this function when countdown hits at last 10th minute
   * - if user is active, just renew the loan at last 10th minute
   *
   * @returns {this.result}
   */
  async autoChecker() {
    const { pageChangedInLast } = this.loanRenewTimeConfig;
    const pageChangedTime = await this.localCache.get(
      `${this.identifier}-pageChangedTime`
    );

    // in last 15 min if user make any activity.
    const pageChangeTimeFrame = this.changeTime(
      new Date(),
      pageChangedInLast,
      'sub'
    ); // 15 seconds

    if (
      pageChangedTime === undefined ||
      pageChangedTime <= pageChangeTimeFrame
    ) {
      this.result.texts = this.loanReturnWarning;
      this.result.renewNow = false; // not viewed
    } else if (pageChangedTime >= pageChangeTimeFrame) {
      this.result.texts = '';
      this.result.renewNow = true; // viewed in last time frame
    }

    return this.result;
  }

  /**
   * set current time in indexedDB when user viewed a new page
   */
  async setPageChangedTime() {
    await this.localCache.set({
      key: `${this.identifier}-pageChangedTime`,
      value: new Date(), // current time
      ttl: Number(this.loanRenewTimeConfig.loanTotalTime),
    });
  }

  /**
   * Texts we want to show in toast template including remaining time
   * - eg. 1 minute, 2 minutes
   *
   * @param {String} texts
   * @param {Number} secondsLeft
   *
   * @returns {String} // texts will be appear in toast template
   */
  getMessageTexts(texts, secondsLeft) {
    let unitOfTime = 'minute';

    let toastTexts = texts;
    let timeLeft = secondsLeft;

    // convert time from second to minute
    timeLeft = Math.ceil(timeLeft / 60);

    // convert time from minute to hour
    if (timeLeft > 59) {
      timeLeft = 1; // 1 hour
      unitOfTime = 'hour';
    }

    // replace #time variable with remaining time
    toastTexts = toastTexts?.replace(/#time/, timeLeft);

    // replace #unitsOfTime variable with minute/minutes
    return toastTexts?.replace(
      /#unitsOfTime/,
      timeLeft !== 1 ? `${unitOfTime}s` : unitOfTime
    );
  }

  /**
   * Helper function to get time difference
   *
   * @param {Date} date
   * @param {Number} seconds
   * @param {String} op - like sub, add, mul, sub
   *
   * @returns {Object} Date
   */
  changeTime(date, seconds, op) {
    if (date === undefined) return null;

    if (op === 'sub') {
      return new Date(date.getTime() - seconds * 1000);
    }

    return new Date(date.getTime() + seconds * 1000);
  }
}
