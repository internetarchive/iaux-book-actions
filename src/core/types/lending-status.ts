/**
 * Shared types for the lending action bar.
 *
 * These describe the shapes that `ia-book-actions` consumes from
 * petabox + dispatches between its internal components. Everything is
 * marked optional unless verified always present, since the lending
 * status object is assembled server-side from several sources.
 */

export type BorrowType = 'browsed' | 'borrowed' | 'adminBorrowed' | null;

export interface LendingStatus {
  is_lendable?: boolean;
  is_browsable?: boolean;
  available_to_browse?: boolean;
  available_to_borrow?: boolean;
  available_to_waitlist?: boolean;
  user_has_browsed?: boolean;
  userHasBorrowed?: boolean;
  isAdmin?: boolean;
  browsingExpired?: boolean;
  secondsLeftOnLoan?: number;
  loan_id?: string | null;
  num_waitlist?: number;
  user_on_waitlist?: boolean;
  daysLeftOnLoan?: number;
  user_can_borrow?: boolean;
  loan?: { until?: string; [k: string]: unknown };
  // Many other flags exist in the wild — keep open-ended.
  [key: string]: unknown;
}

/**
 * Configuration emitted by `ActionsConfig` for each rendered button.
 *
 * Most fields are populated by the per-action factory methods; the
 * exact subset depends on the action.
 */
export interface ActionButtonConfig {
  text: string;
  className: string;
  id?: string;
  url?: string;
  target?: string;
  analyticsEvent?: AnalyticsEventPayload;
  count?: number;
  /**
   * Click-handler hint — historically `'browse'` / `'borrow'` (action
   * verbs), distinct from the lifecycle `BorrowType` (`'browsed'` /
   * `'borrowed'`). Kept loose because the consumer uses string equality.
   */
  borrowType?: string;
  /**
   * Allow extra keys for forward-compat — individual buttons may
   * carry extra metadata not modeled here.
   */
  [key: string]: unknown;
}

export interface ActionsResult {
  primaryTitle: string;
  primaryActions: Array<ActionButtonConfig | null>;
  primaryColor?: string;
  secondaryActions: Array<ActionButtonConfig | null>;
  borrowType?: BorrowType;
}

export interface AnalyticsEventPayload {
  category: string;
  action: string;
  label?: string;
}

/**
 * Result of `LoanRenewHelper.handleLoanRenew()`. Mutated in place via
 * the public `result` property on the helper instance.
 */
export interface LoanRenewResult {
  texts: string;
  renewNow: boolean;
  secondsLeft?: number;
  renewType?: string;
}

export interface LoanRenewTimeConfig {
  /** total seconds a loan does have */
  loanTotalTime: number;
  /** check for loan renew at last (seconds) */
  loanRenewAtLast: number;
  /** consider loan renew eligible if viewed new page (seconds) */
  pageChangedInLast: number;
}

/**
 * The subset of `@internetarchive/local-cache`'s `LocalCache` that this
 * package actually uses. Kept structurally minimal so consumers can pass
 * any equivalent cache (test fakes, alternate IndexedDB wrappers, …).
 */
export interface LocalCacheLike {
  get<T = unknown>(key: string): Promise<T | undefined>;
  set(opts: { key: string; value: unknown; ttl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

/**
 * Detail payload dispatched by ActionsHandler-derived components
 * when an internal lending action fires.
 */
export interface ActionEventDetail {
  action?: string;
  category?: string;
  data?: {
    action?: string;
    error?: string;
    loan?: unknown;
    [k: string]: unknown;
  };
  event?: AnalyticsEventPayload;
  borrowType?: BorrowType;
  renewType?: string;
}
