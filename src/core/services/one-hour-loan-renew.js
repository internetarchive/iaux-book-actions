import { nothing } from 'lit';

/**
 * This class is used to determine if use is eligible for auto renew loan.
 *
 */
export class OneHourLoanRenew {
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
      'This book will be automatically returned in 10 minutes unless you turn a page.';

    // private props
    this.loanRenewResult = {
      texts: null,
      renewNow: false,
    };

    return this.handleLoanRenew();
  }

  handleLoanRenew() {
    try {
      // when user click/flip on book page
      if (this.hasPageChanged) {
        console.log('page changed!!');
        return this.pageChanged(); // user clicked on page
      }

      return this.autoChecker(); // auto checker at 50th minute
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
      console.log('Yes, borrow it again now!');
      this.loanRenewResult.texts = this.loanRenewMessage;
      this.loanRenewResult.renewNow = true;
    }

    this.setPageChangedTime();
    return this.loanRenewResult;
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
      // not viewed
      console.log("Not viewed, don't borrow it!");
      this.loanRenewResult.texts = this.loanReturnWarning;
      this.loanRenewResult.renewNow = false;
    } else if (lastPageFlipTime >= lastFlipTimeFrame) {
      // viewed in last time frame
      console.log('Yes viewed, silently renewed!');
      this.loanRenewResult.texts = null;
      this.loanRenewResult.renewNow = true;
    }

    return this.loanRenewResult;
  }

  // save page changed time in indexedDB
  async setPageChangedTime() {
    await this.localCache.set({
      key: `${this.identifier}-pageChangedTime`,
      value: new Date(), // current time
      ttl: Number(this.loanRenewConfig.totalTime),
    });
  }

  async setLoanRenewedTime() {
    try {
      // last 15 min if used flipped a page.
      const expireDate = this.changeTime(
        new Date(),
        this.loanRenewConfig.totalTime,
        'add'
      ); // 15 seconds

      // set a value
      await this.localCache.set({
        key: `${this.identifier}-loanTime`,
        value: expireDate, // expireDate time
        ttl: Number(this.loanRenewConfig.totalTime),
      });

      // delete pageChangedTime when book is auto renew at nth minute
      await this.localCache.delete(`${this.identifier}-pageChangedTime`);
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
}
