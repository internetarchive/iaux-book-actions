import { LitElement } from 'lit';

import { URLHelper } from '../../config/url-helper';
import { sentryLogs } from '../../config/sentry-events';
import log from '../log';

import ActionsHandlerService from './actions-handler-service';
import LoanAnanlytics from '../loan-analytics';
import {
  analyticsCategories,
  analyticsActions,
  analyticsLabels,
} from '../../config/analytics-event-and-category';
import * as Cookies from '../doc-cookies';
import type { ActionEventDetail } from '../../types/lending-status';
import '../../types/globals';

interface LocalCacheLike {
  set(opts: { key: string; value: unknown; ttl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

/**
 * Base class for components that dispatch and listen to lending action
 * events. Holds the shared analytics/cookies/loan-renew plumbing so the
 * `<collapsible-action-group>` and `<book-title-bar>` components can stay
 * focused on rendering.
 */
export default class ActionsHandler extends LitElement {
  /** wait until borrow is complete (in seconds) before reloading the page */
  waitUntillBorrowComplete = 6;

  loanAnanlytics: LoanAnanlytics = new LoanAnanlytics();

  /**
   * Identifier of the book in question — set by the consuming component
   * (provided as a Lit `@property` on `IABookActions` and forwarded down).
   */
  identifier!: string;

  /** URL we redirect to after returning the book. */
  returnUrl?: string;

  /** Total seconds for a 1-hour loan; used by `setBrowseTimeSession`. */
  loanTotalTime?: number;

  /**
   * `LocalCache` instance from `@internetarchive/local-cache`. Set by
   * the parent component before action handlers fire.
   */
  localCache?: LocalCacheLike;

  constructor() {
    super();
    this.bindEvents();
  }

  bindEvents(): void {
    this.addEventListener('browseBook', async () => {
      this.handleBrowseIt();
      await this.loanAnanlytics?.storeLoanStatsCount(this.identifier, 'browse');
    });

    this.addEventListener('browseBookAgain', async () => {
      this.handleBrowseIt();
      await this.loanAnanlytics?.storeLoanStatsCount(
        this.identifier,
        'browseagain',
      );
    });

    this.addEventListener('autoRenew', async event => {
      const detail = (event as CustomEvent<ActionEventDetail>).detail;
      this.handleLoanRenewNow();
      await this.loanAnanlytics?.storeLoanStatsCount(
        this.identifier,
        'autorenew',
      );

      const analyticsLabel =
        detail?.renewType === 'auto'
          ? analyticsLabels.browseAutoRenew
          : analyticsLabels.browseManualRenew;
      this.loanAnanlytics?.sendEvent(
        analyticsCategories.browse,
        analyticsActions.browseRenew,
        analyticsLabel,
        { identifier: this.identifier },
      );
    });

    this.addEventListener('autoReturn', async () => {
      this.handleReturnIt();
      await this.loanAnanlytics?.storeLoanStatsCount(
        this.identifier,
        'autoreturn',
      );

      this.loanAnanlytics?.sendEvent(
        analyticsCategories.browse,
        analyticsActions.browseReturn,
        analyticsLabels.browseAutoReturn,
        { identifier: this.identifier },
      );
    });

    this.addEventListener('returnNow', event => {
      const detail = (event as CustomEvent<ActionEventDetail>).detail;
      if ((detail?.borrowType as string) === 'browse') {
        this.loanAnanlytics?.storeLoanStatsCount(this.identifier, 'return');
        this.loanAnanlytics?.sendEvent(
          analyticsCategories.browse,
          analyticsActions.browseReturn,
          analyticsLabels.browseManualReturn,
          { identifier: this.identifier },
        );
      }

      this.handleReturnIt('returnNow');

      if ((detail?.borrowType as string) === 'borrow' && detail.event) {
        const { category, action } = detail.event;
        this.loanAnanlytics?.sendEvent(category, action, this.identifier);
      }
    });

    this.addEventListener('borrowBook', event => {
      const detail = (event as CustomEvent<ActionEventDetail>).detail;
      this.handleBorrowIt();
      if (detail?.event) {
        const { category, action } = detail.event;
        this.loanAnanlytics?.sendEvent(category, action, this.identifier);
      }
    });

    this.addEventListener('loginAndBorrow', event => {
      const detail = (event as CustomEvent<ActionEventDetail>).detail;
      this.handleLoginOk();
      if (detail?.event) {
        const { category, action } = detail.event;
        this.loanAnanlytics?.sendEvent(category, action, this.identifier);
      }
    });

    this.addEventListener('leaveWaitlist', event => {
      const detail = (event as CustomEvent<ActionEventDetail>).detail;
      this.handleRemoveFromWaitingList();
      if (detail?.event) {
        const { category, action } = detail.event;
        this.loanAnanlytics?.sendEvent(category, action, this.identifier);
      }
    });

    this.addEventListener('joinWaitlist', event => {
      const detail = (event as CustomEvent<ActionEventDetail>).detail;
      this.handleReserveIt();
      if (detail?.event) {
        const { category, action } = detail.event;
        this.loanAnanlytics?.sendEvent(category, action, this.identifier);
      }
    });

    this.addEventListener('purchaseBook', event => {
      const detail = (event as CustomEvent<ActionEventDetail>).detail;
      if (detail?.event) {
        const { category, action } = detail.event;
        this.loanAnanlytics?.sendEvent(category, action, this.identifier);
      }
    });

    this.addEventListener('adminAccess', event => {
      const detail = (event as CustomEvent<ActionEventDetail>).detail;
      if (detail?.event) {
        const { category, action } = detail.event;
        this.loanAnanlytics?.sendEvent(category, action, this.identifier);
      }

      this.setStickyAdminAccess(true);

      const url = new URL(window.location.href);
      url.searchParams.append('admin', '1');
      window.location.search = url.search;
    });

    this.addEventListener('exitAdminAccess', event => {
      const detail = (event as CustomEvent<ActionEventDetail>).detail;
      if (detail?.event) {
        const { category, action } = detail.event;
        this.loanAnanlytics?.sendEvent(category, action, this.identifier);
      }
      this.setStickyAdminAccess(false);
    });

    this.addEventListener('bookTitleBar', event => {
      const detail = (event as CustomEvent<ActionEventDetail>).detail;
      if (detail?.event) {
        const { category, action } = detail.event;
        this.loanAnanlytics?.sendEvent(category, action, this.identifier);
      }
    });
  }

  handleBrowseIt(): void {
    const action = 'browse_book';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        this.setBrowseTimeSession();
        this.handleReadItNow();
      },
      error: data => {
        this.dispatchActionError(action, data as Record<string, unknown>);
      },
    });
  }

  handleLoanRenewNow(): void {
    const action = 'renew_loan';

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: data => {
        const responseData = data as {
          loan?: { renewal?: boolean };
        };
        log(
          'RENEW_LOAN --- ',
          data,
          action,
          responseData?.loan,
          this.identifier,
        );
        const activeLoan = responseData?.loan;
        const isRenewal = activeLoan?.renewal;

        if (activeLoan && isRenewal) {
          this.setBrowseTimeSession();
        } else {
          log('RENEW_LOAN ERROR --- ', {
            action,
            isRenewal,
            activeLoan,
            data,
            id: this.identifier,
          });
          window?.Sentry?.captureMessage(
            `${sentryLogs.bookRenewFailed} - Error: ${JSON.stringify(data)}`,
          );
          this.dispatchActionError(action, {
            data,
            error: true,
            message: 'Loan renewal failed: no loan active.',
          });
        }

        this.dispatchEvent(
          new CustomEvent('loanAutoRenewed', {
            detail: { action, data: { ...(data as object), loan: activeLoan } },
          }),
        );
      },
      error: data => {
        this.dispatchActionError(action, data as Record<string, unknown>);
      },
    });
  }

  /** @param type loan return type: `'returnNow'` or `''` */
  handleReturnIt(type = ''): void {
    const action = 'return_loan';
    if (type === 'returnNow') this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        this.deleteLoanCookies();
        if (type === 'returnNow' && this.returnUrl) {
          URLHelper.goToUrl(this.returnUrl, true);
        }
      },
      error: data => {
        this.dispatchActionError(action, data as Record<string, unknown>);
      },
    });
  }

  handleBorrowIt(): void {
    const action = 'borrow_book';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        this.handleReadItNow();
      },
      error: data => {
        this.dispatchActionError(action, data as Record<string, unknown>);
      },
    });
  }

  handleReserveIt(): void {
    const action = 'join_waitlist';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        URLHelper.goToUrl(URLHelper.getRedirectUrl(), true);
      },
      error: data => {
        this.dispatchActionError(action, data as Record<string, unknown>);
      },
    });
  }

  handleRemoveFromWaitingList(): void {
    const action = 'leave_waitlist';
    this.dispatchToggleActionGroup();

    ActionsHandlerService({
      action,
      identifier: this.identifier,
      success: () => {
        URLHelper.goToUrl(URLHelper.getRedirectUrl(), true);
      },
      error: data => {
        this.dispatchActionError(action, data as Record<string, unknown>);
      },
    });
  }

  /**
   * Dispatch `lendingActionError` and toggle the action group disabled.
   * @fires ActionsHandler#lendingActionError
   */
  dispatchActionError(
    action: string,
    data: Record<string, unknown> = {},
  ): void {
    this.loanAnanlytics?.sendEvent('LendingServiceError', action);

    this.dispatchEvent(
      new CustomEvent('lendingActionError', {
        detail: { action, data },
      }),
    );
  }

  /** @fires ActionsHandler#toggleActionGroup */
  dispatchToggleActionGroup(): void {
    this.dispatchEvent(new CustomEvent('toggleActionGroup'));
  }

  handleLoginOk(): void {
    const target = `/account/login?referer=${encodeURIComponent(
      URLHelper.getRedirectUrl(),
    )}`;
    URLHelper.goToUrl(target, true);
  }

  handleReadItNow(extraParam?: string): void {
    const currentParams = new URLSearchParams(window.location.search);

    if (extraParam) {
      const extraParams = new URLSearchParams(extraParam);
      for (const [key, val] of extraParams.entries()) {
        currentParams.append(key, val);
      }
    }

    const convertedToString = currentParams.toString();
    const newParams = convertedToString ? `?${convertedToString}` : '';

    const redirectTo =
      window.location.origin + window.location.pathname + newParams;

    setTimeout(() => {
      URLHelper.goToUrl(redirectTo, true);
    }, this.waitUntillBorrowComplete * 1000);
  }

  /** persist the loan-end time so other tabs / page loads can resume the timer */
  async setBrowseTimeSession(): Promise<void> {
    if (!this.localCache) return;
    try {
      const expireDate = new Date(
        new Date().getTime() + (this.loanTotalTime ?? 0) * 1000,
      );

      await this.localCache.set({
        key: `${this.identifier}-loanTime`,
        value: expireDate,
        ttl: Number(this.loanTotalTime ?? 0),
      });

      await this.localCache.delete(`${this.identifier}-pageChangedTime`);
    } catch (error) {
      log(error);
    }
  }

  deleteLoanCookies(): void {
    const date = new Date();
    date.setTime(date.getTime() - 24 * 60 * 60 * 1000);

    Cookies.setItem(
      `loan-${this.identifier}=""`,
      '',
      date,
      '/',
      '.archive.org',
    );
    Cookies.setItem(
      `br-loan-${this.identifier}=""`,
      '',
      date,
      '/',
      '.archive.org',
    );
  }

  /**
   * Set sticky admin access on or off.
   * @see WEBDEV-6835
   */
  setStickyAdminAccess(value: boolean): void {
    const domain =
      window.location.hostname === 'localhost' ? 'localhost' : '.archive.org';
    Cookies.setItem(
      'sticky-admin-access',
      String(value),
      undefined,
      '/',
      domain,
    );
  }
}
