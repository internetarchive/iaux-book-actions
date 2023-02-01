import { nothing } from 'lit';
import { ToastConfig } from '@internetarchive/toast-manager';

/**
 * This class is used to determine if use is eligible for auto renew loan.
 */
export class LoanRenewHelper {
  constructor(hasPageChanged, identifier, localCache, loanRenewConfig) {
    this.hasPageChanged = hasPageChanged;
    this.identifier = identifier;
    this.localCache = localCache;
    this.loanRenewConfig = loanRenewConfig;

    // messages for auto return machenism
    this.loanRenewMessage = 'This book has been renewed for 1 hour.';
    this.loanReturnWarning =
      'This book will be automatically returned in #time minutes unless you turn a page.';

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
      return this.autoChecker(); // auto checker at 50th minute
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
      totalTime, // 60
      autoCheckAt, // 50
    } = this.loanRenewConfig;
    const currentTime = new Date();
    const loanTime = await this.localCache.get(`${this.identifier}-loanTime`);

    const lastTimeFrame = this.changeTime(
      loanTime,
      totalTime - autoCheckAt,
      'add'
    );

    // if user viewed new page in last 10 minutes, renew immediately
    if (currentTime >= lastTimeFrame) {
      this.result.texts = this.loanRenewMessage;
      this.result.renewNow = true;
      console.log('manually renewed by page click!');
    }

    this.setPageChangedTime();
    return this.result;
  }

  /**
   * Trigger this function when countdown hits last 10 minutes
   * - if user is open new page, just renew the loan at last 10th minute
   *
   * @returns {this.result}
   */
  async autoChecker() {
    const currentTime = new Date();
    const { pageChangedInLast } = this.loanRenewConfig;
    const lastPageFlipTime = await this.localCache.get(
      `${this.identifier}-pageChangedTime`
    );

    // last 15 min if used flipped a page.
    const lastFlipTimeFrame = this.changeTime(
      currentTime,
      pageChangedInLast,
      'sub'
    ); // 15 seconds

    if (
      lastPageFlipTime === undefined ||
      lastPageFlipTime <= lastFlipTimeFrame
    ) {
      this.result.texts = this.loanReturnWarning;
      this.result.renewNow = false; // not viewed
      console.log('not viewed!');
    } else if (lastPageFlipTime >= lastFlipTimeFrame) {
      this.result.texts = '';
      this.result.renewNow = true; // viewed in last time frame
      console.log('silently renewed!');
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
      ttl: Number(this.loanRenewConfig.totalTime),
    });
  }

  /**
   * Show toast messages on some specific loan renew features. e.g.
   * - show success msg when book is auto renewed
   * - show success msg when book is auto returned
   * - show warninig msg when book is about to auto returned
   */
  async showToastMessage() {
    if (this.hideToast) return false;

    const iaBookActions = document.querySelector('ia-book-actions').shadowRoot;
    let toastTemplate = iaBookActions.querySelector('toast-template');
    if (!toastTemplate) {
      toastTemplate = document.createElement('toast-template');
    }
    await iaBookActions.appendChild(toastTemplate);

    const config = new ToastConfig();
    config.texts = this.result.texts?.replace(/#time/, this.result.timeLeft);
    config.dismisOnClick = true;
    toastTemplate.showToast({
      config,
    });
  }

  /**
   * Helper function to get time difference
   *
   * @param {Date} date
   * @param {Number} minutes
   * @param {String} op
   *
   * @returns {Object} Date
   */
  changeTime(date, minutes, op) {
    if (date === undefined) return null;

    if (op === 'sub') {
      return new Date(date.getTime() - minutes * 1000);
    }

    return new Date(date.getTime() + minutes * 1000);
  }
}
