import ActionsHandlerService from './actions-handler/actions-handler-service.js';

/**
 * This class is used to determine if use is eligible for auto renew loan.
 *
 * ActionsHandlerService is a function being used to execute
 */
export class OneHourAutoRenew {
  constructor(pageClick, identifier, localCache, autoRenewTimeConfig) {
    this.pageClick = pageClick;
    this.identifier = identifier;
    this.localCache = localCache;
    this.autoRenewTimeConfig = autoRenewTimeConfig;

    // private props
    this.resultRes = {
      toastTexts: '',
      hideToast: true,
      renewNow: false,
    };

    // messages for auto return machenism
    this.autoRenewMessage = 'This book has been renewed for another hour.';
    this.autoReturnMessage = 'This book has been auto-returned due to inactivity.';
    this.autoReturnWarning = 'This book will be auto-returned in 10 minutes unless you turn a page.';

    return this.handleBookAutoRenew();
  }

  async handleBookAutoRenew() {
    try {
      // if page is not flipped in last 15 minutes,
      // instantaly renew it if user viewed new page in last 10 minutes
      if (this.pageClick === true) {
        console.log('page flipped!!')
        return this.userFlippedBookPage(); // user clicked on page
      } else {
        console.log('auto checker!!')
        return this.autoCheckerTimer(); // auto checker at 50th minute
      }
    } catch (error) {
      console.log(error)
    }
  }

  async userFlippedBookPage() {
    const {
      totalTime, // 60
      autoCheckAt, // 50
    } = this.autoRenewTimeConfig;
    const currentDate = new Date();
    const loanTime = await this.localCache.get(`${this.identifier}-loanTime`);

    const lastTimeFrame = await this.changeTime(
      loanTime,
      totalTime - autoCheckAt,
      'add'
    ); // 50 seconds

    if (currentDate >= lastTimeFrame) {
      console.log('1 YES NOW BORROW IT AGAIN NOW!');
      this.resultRes.toastTexts = this.autoRenewMessage;
      this.resultRes.browseAgainNow = true;
      this.resultRes.hideToast = false;
      this.resultRes.renewNow = true;
    }

    return this.resultRes;
  }

  async autoCheckerTimer() {
    const currentDate = new Date();
    const { FlippedInLast } = this.autoRenewTimeConfig;
    const lastPageFlipTime = await this.localCache.get(`${this.identifier}-pageFlipTime`);

    // last 15 min if used flipped a page.
    const lastFlipTimeFrame = await this.changeTime(
      currentDate,
      FlippedInLast,
      'sub'
    ); // 15 seconds

    if (lastPageFlipTime === undefined || lastPageFlipTime <= lastFlipTimeFrame) { // not viewed
      console.log('2 DON\'T BORROW IT!');
      this.resultRes.toastTexts = this.autoReturnWarning;
      this.resultRes.hideToast = false;
    } else if (lastPageFlipTime >= lastFlipTimeFrame) { // viewed in last time frame
      console.log('3 YES BORROW IT AGAIN!');
      this.resultRes.toastTexts = this.autoRenewMessage;
      this.resultRes.browseAgainNow = true;
      this.resultRes.hideToast = false;
      this.resultRes.renewNow = true;
    }

    return this.resultRes;
  }

  async changeTime(date, minutes, op) {
    if (date === undefined) return undefined;
    
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

  async handleAutoRenew() {
    const action = 'renew_loan';
    ActionsHandlerService({
      identifier: this.identifier,
      action,
      error: data => {
        window?.Sentry?.captureMessage(
          'handleAutoRenew error',
          JSON.stringify(data)
        );
        // this.errorCallback({ detail: { action, data } });
        // send LendingServiceError to GA
        this.sendEvent('handleAutoRenew', action);
      },
      success: () => {
        return 'success';
      },
    });
  }
}
