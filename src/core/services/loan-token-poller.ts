import ActionsHandlerService from './actions-handler/actions-handler-service';
import LoanAnanlytics from './loan-analytics';
import { sentryLogs } from '../config/sentry-events';
import type { BorrowType } from '../types/lending-status';
import '../types/globals';

type SuccessCallback = () => void;
type ErrorCallback = (eventLike: {
  detail: { action: string; data: unknown };
}) => void;

/**
 * Polls `create_token` for borrowed/browsed books so the reader cookie
 * stays fresh across the loan window. Owns one repeating interval kept
 * on `window.IALendingIntervals.tokenPoller`.
 */
export class LoanTokenPoller {
  identifier: string;
  borrowType: BorrowType;
  successCallback: SuccessCallback;
  errorCallback: ErrorCallback;
  pollerDelay: number;
  loanTokenInterval: ReturnType<typeof setInterval> | undefined = undefined;
  loanAnalytics: LoanAnanlytics = new LoanAnanlytics();

  constructor(
    id: string,
    borrowType: BorrowType,
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    pollerDelay: number,
  ) {
    this.identifier = id;
    this.borrowType = borrowType;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.pollerDelay = pollerDelay;
    this.bookAccessed();
  }

  disconnectedCallback(): void {
    window?.IALendingIntervals?.clearTokenPoller();
  }

  async bookAccessed(): Promise<void> {
    if (this.borrowType) {
      this.handleLoanTokenPoller(true);

      // adminBorrowed flow only needs the initial token; skip the interval.
      if (this.borrowType !== 'adminBorrowed') {
        if (window.IALendingIntervals) {
          window.IALendingIntervals.tokenPoller = setInterval(() => {
            this.handleLoanTokenPoller();
          }, this.pollerDelay * 1000);
        }
      }
    } else {
      window?.Sentry?.captureMessage(
        `${sentryLogs.bookAccessed} - not borrowed`,
      );
      this.disconnectedCallback();
    }
  }

  async handleLoanTokenPoller(isInitial = false): Promise<void> {
    const action = 'create_token';
    ActionsHandlerService({
      identifier: this.identifier,
      action,
      error: (data: unknown) => {
        this.errorCallback({ detail: { action, data } });

        window?.Sentry?.captureMessage(
          `${sentryLogs.handleLoanTokenPoller} - Error: ${JSON.stringify(data)}`,
        );

        this.loanAnalytics?.sendEvent(
          'LendingServiceLoanError',
          action,
          this.identifier,
        );
      },
      success: () => {
        if (isInitial) this.successCallback();
      },
    });
  }
}
