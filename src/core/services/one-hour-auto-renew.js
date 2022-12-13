import { nothing } from 'lit';

import ActionsHandlerService from './actions-handler/actions-handler-service.js';
import * as Cookies from './doc-cookies.js';

/**
 * This class is used to create loan token for borrowed books
 *
 * ActionsHandlerService is a function being used to execute
 */
export class OneHourAutoRenew {
  constructor(pageClick, identifier, localCache, autoRenewTimeConfig) {
    this.pageClick = pageClick;
    this.identifier = identifier;
    this.localCache = localCache;
    this.autoRenewTimeConfig = autoRenewTimeConfig; // callback function to be called after loan token is created

    this.autoReturnMessage = 'This book will be automatically returned in 15 seconds unless you turn a page.';
    this.autoRenewMessage = 'This book has been renewed for another hour.';


    this.resultRes = {
      toastTexts: '',
      hideToast: true,
    };

    return this.dd();
  }

  async dd() {
    try {
      const currentDate = new Date();

      const {
        totalTime, // 60
        autoRenewCheckerAtLast, // 50
        autoRenewVisitedInLast, // 15
      } = this.autoRenewTimeConfig;

      const loanTime = await this.localCache.get(`${this.identifier}-loanTime`);
      const lastPageFlipTime = await this.localCache.get(`${this.identifier}-pageFlipTime`);

      const lastFlipTimeFrame = await this.changeTime(
        currentDate,
        autoRenewVisitedInLast,
        'sub'
      ); // 15 seconds

      console.log(lastPageFlipTime, lastFlipTimeFrame)

      // if page is not flipped in last 15 minutes,
      // instantaly renew it if user viewed new page in last 10 minutes
      if (this.pageClick === true) {
        const lastTimeFrame = await this.changeTime(
          loanTime,
          totalTime - autoRenewCheckerAtLast,
          'add'
        ); // 50 seconds
        console.log('page flipped!')

        if (currentDate >= lastTimeFrame) {
          console.log('1 YES NOW BORROW IT AGAIN NOW!');
          this.toastTexts = this.autoRenewMessage;
          this.hideToast = false;
        }

        return nothing // early return
      }

      console.log(lastPageFlipTime, lastFlipTimeFrame)
      if (lastPageFlipTime === undefined) { // not viewed
        console.log('2 DON\'T BORROW IT!');
        this.resultRes.toastTexts = this.autoReturnMessage;
        this.resultRes.hideToast = false;
      } else if (lastPageFlipTime >= lastFlipTimeFrame) { // viewed in last time frame
        console.log('3 YES BORROW IT AGAIN!');
        this.resultRes.toastTexts = this.autoRenewMessage;
        this.resultRes.hideToast = false;
        this.toastTexts = this.autoRenewMessage;
        // this.browseAgainNow = true;
        this.hideToast = false;
        // await this.browseHasRenew();
      } else if (lastPageFlipTime <= lastFlipTimeFrame) { // viewed but not in last time frame
        console.log('4 DON\'T BORROW IT!');
        this.resultRes.toastTexts = this.autoReturnMessage;
        this.resultRes.hideToast = false;
      }

      // console.log(this.resultRes)
      return this.resultRes;

    } catch (error) {
      console.log(error)
    }
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
