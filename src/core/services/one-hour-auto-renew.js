import { nothing } from 'lit';

/**
 * This class is used to determine if use is eligible for auto renew loan.
 *
 */
export class OneHourAutoRenew {
  constructor(
    isPageClick,
    identifier,
    localCache,
    autoRenewConfig,
    userHasBrowsed
  ) {
    this.isPageClick = isPageClick;
    this.identifier = identifier;
    this.localCache = localCache;
    this.autoRenewConfig = autoRenewConfig;
    this.userHasBrowsed = userHasBrowsed;

    // messages for auto return machenism
    this.autoRenewMessage = 'This book has been renewed for another hour.';
    this.autoReturnMessage =
      'This book has been auto-returned due to inactivity.';
    this.autoReturnWarning =
      'This book will be auto-returned in 10 minutes unless you turn a page.';

    // private props
    this.resultRes = {
      toastTexts: '',
      hideToast: true,
      renewNow: false,
      browseAgainNow: false,
    };

    return this.handleBookAutoRenew();
  }

  handleBookAutoRenew() {
    try {
      // if page is not clicked in last 15 minutes,
      // instantaly renew it if user viewed new page in last 10 minutes
      if (this.isPageClick) {
        console.log('page flipped!!');
        return this.userFlippedBookPage(); // user clicked on page
      }
      console.log('auto checker!');
      return this.autoCheckerTimer(); // auto checker at 50th minute
    } catch (error) {
      console.log(error);
    }

    return nothing;
  }

  async setPageFlippedTime() {
    // set pageFlipTime time in localStorage
    await this.localCache.set({
      key: `${this.identifier}-pageFlipTime`,
      value: new Date(), // current time
      ttl: Number(this.autoRenewConfig.totalTime),
    });
  }

  async userFlippedBookPage() {
    const {
      totalTime, // 60
      autoCheckAt, // 50
    } = this.autoRenewConfig;
    const currentTime = new Date();
    const loanTime = await this.localCache.get(`${this.identifier}-loanTime`);

    const lastTimeFrame = this.changeTime(
      loanTime,
      totalTime - autoCheckAt,
      'add'
    ); // 50 seconds

    if (currentTime >= lastTimeFrame) {
      console.log('1 YES NOW BORROW IT AGAIN NOW!');
      this.resultRes.toastTexts = this.autoRenewMessage;
      this.resultRes.hideToast = false;
      this.resultRes.renewNow = true;
      this.resultRes.browseAgainNow = true;

      this.setNewBrowseTime();
    }

    this.setPageFlippedTime();
    return this.resultRes;
  }

  async autoCheckerTimer() {
    const currentTime = new Date();
    const { FlippedInLast } = this.autoRenewConfig;
    const lastPageFlipTime = await this.localCache.get(
      `${this.identifier}-pageFlipTime`
    );

    // last 15 min if used flipped a page.
    const lastFlipTimeFrame = this.changeTime(
      currentTime,
      FlippedInLast,
      'sub'
    ); // 15 seconds

    if (
      lastPageFlipTime === undefined ||
      lastPageFlipTime <= lastFlipTimeFrame
    ) {
      // not viewed
      console.log('2 not viewed, warning message!');
      this.resultRes.toastTexts = this.autoReturnWarning;
      this.resultRes.hideToast = false;
    } else if (lastPageFlipTime >= lastFlipTimeFrame) {
      // viewed in last time frame
      console.log('3 viewed, auto renew and message!');
      this.resultRes.toastTexts = this.autoRenewMessage;
      this.resultRes.browseAgainNow = true;
      this.resultRes.hideToast = false;
      this.resultRes.renewNow = true;

      this.setNewBrowseTime();
    }

    return this.resultRes;
  }

  async setNewBrowseTime() {
    try {
      // last 15 min if used flipped a page.
      const expireDate = this.changeTime(
        new Date(),
        this.autoRenewConfig.totalTime,
        'add'
      ); // 15 seconds

      // set a value
      await this.localCache.set({
        key: `${this.identifier}-loanTime`,
        value: expireDate, // expireDate time
        ttl: Number(this.autoRenewConfig.totalTime),
      });

      // delete pageFlipTime when book is auto renew at nth minute
      await this.localCache.delete(`${this.identifier}-pageFlipTime`);
    } catch (error) {
      console.log(error);
    }
  }

  changeTime(date, minutes, op) {
    if (date === undefined) return nothing;

    if (op === 'sub') {
      return new Date(date.getTime() - minutes * 1000);
    }

    return new Date(date.getTime() + minutes * 1000);
  }

  sendEvent(eventCategory, eventAction) {
    window?.archive_analytics?.send_event(
      eventCategory,
      eventAction,
      `identifier=${this.identifier}`
    );
  }
}
