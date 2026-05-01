import '../types/globals';

/**
 * Collection of methods for managing intervals for the lending system.
 *
 * Two main intervals are tracked here:
 *  - `tokenPoller`     polls `create_token` for borrowed books
 *  - `timerCountdown`  drives loan-auto-renew + auto-return warnings
 *
 * @see TimerCountdown::timerCountdown function
 * @see LoanTokenPoller::bookAccessed function
 */
window.IALendingIntervals = {
  /** store loan token poller interval @see LoanTokenPoller::bookAccessed */
  tokenPoller: 0,

  /** renewal check interval */
  timerCountdown: 0,

  /** expiration timer */
  browseExpireTimeout: 0,

  /** clear interval for create_token api */
  clearTokenPoller(): void {
    if (window.IALendingIntervals?.tokenPoller) {
      window.clearInterval(
        window.IALendingIntervals.tokenPoller as ReturnType<typeof setInterval>,
      );
    }
    if (window.IALendingIntervals) window.IALendingIntervals.tokenPoller = 0;
  },

  /** clear interval for graphic timer for one-hour loan renew */
  clearTimerCountdown(): void {
    if (window.IALendingIntervals?.timerCountdown) {
      window.clearInterval(
        window.IALendingIntervals.timerCountdown as ReturnType<
          typeof setInterval
        >,
      );
    }
    if (window.IALendingIntervals) window.IALendingIntervals.timerCountdown = 0;
  },

  /** clear timeout that fires when a browsed loan auto-expires */
  clearBrowseExpireTimeout(): void {
    if (window.IALendingIntervals?.browseExpireTimeout) {
      window.clearTimeout(
        window.IALendingIntervals.browseExpireTimeout as ReturnType<
          typeof setTimeout
        >,
      );
    }
    if (window.IALendingIntervals)
      window.IALendingIntervals.browseExpireTimeout = 0;
  },

  /** clear all intervals being used across the lending system */
  clearAll(): void {
    window?.IALendingIntervals?.clearTokenPoller();
    window?.IALendingIntervals?.clearTimerCountdown();
    window?.IALendingIntervals?.clearBrowseExpireTimeout();
  },
};
