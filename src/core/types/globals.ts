/**
 * Ambient global augmentations for `window` properties that
 * petabox/Sentry/GA scripts inject at runtime.
 */

export interface IALendingIntervals {
  tokenPoller: ReturnType<typeof setInterval> | 0;
  timerCountdown: ReturnType<typeof setInterval> | 0;
  browseExpireTimeout: ReturnType<typeof setTimeout> | 0;
  clearTokenPoller: () => void;
  clearTimerCountdown: () => void;
  clearBrowseExpireTimeout: () => void;
  clearAll: () => void;
}

export interface ArchiveAnalytics {
  send_event_no_sampling: (
    category: string,
    action: string,
    label?: string,
    extra?: Record<string, unknown>,
  ) => void;
}

export interface SentryGlobal {
  captureMessage: (msg: string) => void;
  captureException: (err: unknown) => void;
}

declare global {
  interface Window {
    IALendingIntervals?: IALendingIntervals;
    archive_analytics?: ArchiveAnalytics;
    Sentry?: SentryGlobal;
  }
}

// Make this a module so the `declare global` augmentation is applied.
export {};
