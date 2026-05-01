import log from './log';
import type {
  LoanRenewResult,
  LoanRenewTimeConfig,
} from '../types/lending-status';

interface LocalCacheLike {
  get<T = unknown>(key: string): Promise<T | undefined>;
  set(opts: { key: string; value: unknown; ttl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

/**
 * Helper that decides whether a browsed loan is eligible for auto-renew.
 *
 * Two entry points:
 *   - `pageChanged()` — driven by BookReader page-turn events
 *   - `autoChecker()` — driven by the timer countdown
 *
 * The decision is captured on `this.result` and also returned for callers
 * that want to react inline.
 */
export class LoanRenewHelper {
  hasPageChanged: boolean;
  identifier: string;
  localCache: LocalCacheLike;
  loanRenewTimeConfig: LoanRenewTimeConfig;

  loanRenewMessage = 'This book has been renewed for #time #unitsOfTime.';
  loanReturnWarning =
    'With no action, this book will be auto-returned in #time #unitsOfTime.';

  result: LoanRenewResult = {
    texts: '',
    renewNow: false,
    renewType: '',
  };

  constructor(
    hasPageChanged: boolean,
    identifier: string,
    localCache: LocalCacheLike,
    loanRenewTimeConfig: LoanRenewTimeConfig,
  ) {
    this.hasPageChanged = hasPageChanged;
    this.identifier = identifier;
    this.localCache = localCache;
    this.loanRenewTimeConfig = loanRenewTimeConfig;
  }

  async handleLoanRenew(): Promise<LoanRenewResult> {
    try {
      if (this.hasPageChanged) {
        return await this.pageChanged();
      }
      return await this.autoChecker();
    } catch (error) {
      log(error);
    }
    return this.result;
  }

  /**
   * Trigger when user has browsed a book and changed the page.
   * - every page change updates the page-changed timestamp in indexedDB
   * - also checks if the loan is eligible for immediate auto-renew
   */
  async pageChanged(): Promise<LoanRenewResult> {
    const { loanRenewAtLast } = this.loanRenewTimeConfig;
    const currentTime = new Date();
    const loanTime = await this.localCache.get<Date>(
      `${this.identifier}-loanTime`,
    );

    const lastTimeFrame = this.changeTime(loanTime, loanRenewAtLast, 'sub');

    // if user viewed new page in last 10 minutes, renew immediately
    if (lastTimeFrame !== null && currentTime >= lastTimeFrame) {
      this.result = {
        texts: this.loanRenewMessage,
        renewNow: true,
        renewType: 'auto',
      };
    }

    this.setPageChangedTime();
    return this.result;
  }

  /**
   * Trigger when countdown hits the last 10th minute.
   * - if user is active, renew the loan; otherwise show return warning.
   */
  async autoChecker(): Promise<LoanRenewResult> {
    const { pageChangedInLast } = this.loanRenewTimeConfig;
    const pageChangedTime = await this.localCache.get<Date>(
      `${this.identifier}-pageChangedTime`,
    );

    const pageChangeTimeFrame = this.changeTime(
      new Date(),
      pageChangedInLast,
      'sub',
    );

    if (
      pageChangedTime === undefined ||
      (pageChangeTimeFrame !== null && pageChangedTime <= pageChangeTimeFrame)
    ) {
      this.result = {
        texts: this.loanReturnWarning,
        renewNow: false,
        renewType: '',
      };
    } else if (
      pageChangeTimeFrame !== null &&
      pageChangedTime >= pageChangeTimeFrame
    ) {
      this.result = {
        texts: '',
        renewNow: true,
        renewType: 'auto',
      };
    }

    return this.result;
  }

  /** persist the time we noticed user activity */
  async setPageChangedTime(): Promise<void> {
    await this.localCache.set({
      key: `${this.identifier}-pageChangedTime`,
      value: new Date(),
      ttl: Number(this.loanRenewTimeConfig.loanTotalTime),
    });
  }

  /**
   * Substitute `#time` and `#unitsOfTime` in toast strings with the
   * remaining time, e.g. "1 minute" / "2 minutes" / "1 hour".
   */
  getMessageTexts(texts: string, secondsLeft: number): string {
    let unitOfTime = 'minute';
    let timeLeft = Math.ceil(secondsLeft / 60);
    if (timeLeft > 59) {
      timeLeft = 1;
      unitOfTime = 'hour';
    }
    return (texts ?? '')
      .replace(/#time/, String(timeLeft))
      .replace(/#unitsOfTime/, timeLeft !== 1 ? `${unitOfTime}s` : unitOfTime);
  }

  /** date arithmetic helper: returns null when the input date is missing */
  changeTime(
    date: Date | undefined,
    seconds: number,
    op: 'sub' | 'add',
  ): Date | null {
    if (date === undefined) return null;
    if (op === 'sub') {
      return new Date(date.getTime() - seconds * 1000);
    }
    return new Date(date.getTime() + seconds * 1000);
  }
}
