/**
 * Analytics categories and events. Used when building actions in
 */
export const sentryLogs = {
  disconnectedCallback: 'IABookActions:disconnectedCallback',
  bookHasRenewed:
    'IABookActions:handleLoanAutoRenewed - book has renewed for next one hour',
  browseHasExpired:
    'IABookActions:browseHasExpired - one-hour loan has been expired',
  bookWasExpired:
    'IABookActions:setupLendingToolbarActions - book was expired at intial, no tokenPoller',
  clearTokenPoller:
    'IABookActions:startLoanTokenPoller - clearing token poller interval',
  clearOneHourTimer:
    'IABookActions:timerCountdown - one-hour timer interval cleared',
  enableBookAccess: 'IABookActions:enableBookAccess',
  handleLoanTokenPoller: 'IABookActions:handleLoanTokenPoller',
  setConsecutiveLoanCounts: 'IABookActions:setConsecutiveLoanCounts',
  actionsHandlerService: 'IABookActions:actionsHandlerService',
};
