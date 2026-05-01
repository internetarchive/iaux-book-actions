import { analyticsCategories } from '../config/analytics-event-and-category';
import * as Cookies from './doc-cookies';
import log from './log';
import '../types/globals';

interface LendingEventCounts {
  browse: number;
  renew: number;
  expire: number;
}

/**
 * Sends GA events for the loan system. Maintains per-loan counts in a
 * cookie so that consecutive auto-renews can be reported as a series
 * (e.g. `browse001-autorenew001`).
 */
export default class LoanAnanlytics {
  identifier?: string;

  /** counts we send to GA: browse, renew, expire */
  gaStats: Partial<LendingEventCounts> = {};

  lendingEventCounts: LendingEventCounts | null = null;

  /**
   * Persist the next loan-stats count and forward a matrix-stats event
   * to GA. Reads the existing cookie first so consecutive actions tally.
   */
  async storeLoanStatsCount(identifier: string, action = ''): Promise<void> {
    this.identifier = identifier;

    try {
      await this.getLoanStatsCount(action);

      this.sendMatrixStatsEvents(action);

      const date = new Date();
      date.setHours(date.getHours() + 2); // 2 hours

      Cookies.setItem(
        this.getLoanCountStorageKey,
        JSON.stringify(this.lendingEventCounts),
        date,
        '/',
      );
    } catch (error) {
      log(error);
      this.sendEvent('Cookies-Error-Actions', String(error), this.identifier);
    }
  }

  /** read counts from cookie, mutate `gaStats` + `lendingEventCounts`. */
  async getLoanStatsCount(action: string): Promise<void> {
    const raw = Cookies.getItem(this.getLoanCountStorageKey);
    this.lendingEventCounts = raw
      ? (JSON.parse(raw) as LendingEventCounts)
      : null;

    this.gaStats = this.lendingEventCounts ?? {
      browse: 0,
      renew: 0,
      expire: 0,
    };

    let browse = this.lendingEventCounts?.browse ?? 0;
    let renew = this.lendingEventCounts?.renew ?? 0;
    let expire = this.lendingEventCounts?.expire ?? 0;

    // NOTE: original JS had `case 'browse' || 'browseagain':` and
    // `case 'return' || 'autoreturn':`. Those expressions evaluate at
    // parse time to just `'browse'` and `'return'` (since `'browse'`
    // is truthy), so `'browseagain'` and `'autoreturn'` actions never
    // matched any case — they fell through to `default` and were no-ops.
    // Preserving that behavior verbatim. If `'browseagain'` /
    // `'autoreturn'` should actually count, that's a real bug worth
    // fixing in a separate ticket rather than silently in this migration.
    switch (action) {
      case 'browse':
        browse = browse ? Number(browse) + 1 : 1;
        this.gaStats.browse = browse;
        renew = 0;
        expire = 0;
        break;
      case 'autorenew':
        renew = renew ? Number(renew) + 1 : 1;
        this.gaStats.renew = renew;
        break;
      case 'return':
        expire = expire ? Number(expire) + 1 : 1;
        this.gaStats.expire = expire;
        renew = 0;
        expire = 0;
        break;
      default:
        break;
    }

    this.lendingEventCounts = { browse, renew, expire };
  }

  /**
   * Send a matrix stats event to GA, e.g.
   *  - browse001-autorenew000:browse
   *  - browse001-autorenew001:autorenew
   */
  sendMatrixStatsEvents(action: string): void {
    const category = analyticsCategories.browse;
    const event = `browse${this.paddedNumber(
      this.gaStats?.browse,
    )}-autorenew${this.paddedNumber(this.gaStats?.renew)}:${action}`;
    this.sendEvent(category, event, this.identifier);
  }

  /** zero-padded `001` / `010` / `100` */
  paddedNumber(num: number | undefined): string {
    if (num) return num.toString().padStart(3, '0');
    return '000';
  }

  get getLoanCountStorageKey(): string {
    return `br-browse-${this.identifier}`;
  }

  sendEvent(
    eventCategory: string,
    eventAction: string,
    label?: string,
    extraParams?: Record<string, unknown>,
  ): void {
    log(
      'eventCategory:-',
      eventCategory,
      '||\teventAction:-',
      eventAction,
      '||\tlabel:-',
      label,
      '||\textraParams:-',
      extraParams,
    );

    window?.archive_analytics?.send_event_no_sampling(
      eventCategory,
      eventAction,
      label || this.identifier,
      extraParams,
    );
  }
}
