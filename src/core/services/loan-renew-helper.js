import { nothing } from 'lit';
import { ToastConfig } from '@internetarchive/toast-manager';

/**
 * This class is used to determine if use is eligible for auto renew loan.
 *
 */
export class LoanRenewHelper {
  constructor(hasPageChanged, identifier, localCache, loanRenewConfig) {
    this.hasPageChanged = hasPageChanged;
    this.identifier = identifier;
    this.localCache = localCache;
    this.loanRenewConfig = loanRenewConfig;

    // messages for auto return machenism
    this.loanRenewMessage = 'This book has been renewed for 1 hour.';
    this.loanReturnMessage =
      'This book has been automatically returned due to inactivity.';
    this.loanReturnWarning =
      'This book will be automatically returned in #time minutes unless you turn a page.';

    // private props
    this.result = {
      texts: null,
      renewNow: false,
    };

    this.timerMsgInterval = undefined
  }

  disconnectedInterval() {
    clearInterval(this.timerMsgInterval);
  }

  handleLoanRenew() {
    try {
      if (this.hasPageChanged) { // when user click/flip on book page
        return this.pageChanged(); // user clicked on page
      } else {
        return this.autoChecker(); // auto checker at 50th minute
      }
    } catch (error) {
      console.log(error);
    }

    return nothing;
  }

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
      this.showToastMessage();
    }

    this.setPageChangedTime();
    return this.result;
  }

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
      this.showToastMessage();
    } else if (lastPageFlipTime >= lastFlipTimeFrame) {
      this.result.texts = null;
      this.result.renewNow = true; // viewed in last time frame
    }

    return this.result;
  }

  // save page changed time in indexedDB
  async setPageChangedTime() {
    await this.localCache.set({
      key: `${this.identifier}-pageChangedTime`,
      value: new Date(), // current time
      ttl: Number(this.loanRenewConfig.totalTime),
    });
  }

  async showToastMessage() {
    this.disconnectedInterval();

    const iaBookActions = document.querySelector('ia-book-actions').shadowRoot;
    let toastTemplate =  iaBookActions.querySelector('toast-template')
    if (!toastTemplate) {
      toastTemplate = document.createElement('toast-template');
    }
    await iaBookActions.appendChild(toastTemplate);

    // change remaining time on warning message
    let remainingTime = this.loanRenewConfig.autoCheckAt;

    this.timerMsgInterval = setInterval(() => {
      remainingTime -= 1;

      const config = new ToastConfig();
      config.texts = this.result.texts?.replace(/#time/, remainingTime);
      config.dismisOnClick = true;
      toastTemplate.showToast({
        config,
      });

      // clear the interval
      if (remainingTime === 0 || this.result.renewNow === true) {
        clearInterval(this.timerMsgInterval);
      }
    }, 1000);
  }

  changeTime(date, minutes, op) {
    if (date === undefined) return nothing;

    if (op === 'sub') {
      return new Date(date.getTime() - minutes * 1000);
    }

    return new Date(date.getTime() + minutes * 1000);
  }
}
