/**
 * Collection of methods for managing intervals for lending system
 *
 * There are mainly two intervals being used
 * - tokenPoller :- used to create_token for borrowed book
 * - timerCountdown :- reponsible for loan-auto-renew and auto returned warning message
 *
 * @see TimerCountdown::timerCountdown function
 * @see LoanTokenPoller::bookAccessed function
 *
 * @type {Object}
 */
window.IALendingIntervals = {
  /**
   * clear interval for create_token api
   */
  clearTokenPoller: () => {
    window.clearInterval(window?.IALendingIntervals?.tokenPoller);
  },

  /**
   * clear interval for graphic timer for one-hour loan renew
   */
  clearTimerCountdown: () => {
    window.clearInterval(window.IALendingIntervals.timerCountdown);
  },

  /**
   * clear all intervals being used acros lending system
   */
  clearAll: () => {
    window.clearInterval(window?.IALendingIntervals?.tokenPoller);
    window.clearInterval(window?.IALendingIntervals?.timerCountdown);
  },
};
