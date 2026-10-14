/* eslint-disable */
import { sentryLogs } from '../../config/sentry-events.js';
import {
  sentryCaptureMessage,
  sentryCaptureException,
} from '../sentry-report.js';
import log from '../log.js';

/**
 * Patron-facing messages for failures that never reached the lending
 * service's own JSON error handling.
 */
export const unexpectedResponseError = status =>
  `Unexpected response from the lending service (HTTP ${status}). Please try again.`;
export const networkError =
  'Could not reach the lending service. Please check your connection and try again.';
export const unexpectedError =
  'Something went wrong handling the lending service response. Please try again.';

/**
 * Helper to call loan service
 * @param {Object} options
 */
export default async function ActionsHandlerService(options) {
  const option = {
    action: null,
    identifier: '',
    success() {},
    error() {},
    ...options,
  };

  let baseHost = '/services/loans/loan';
  const location = window?.location;

  const tokenError = 'loan token not found. please try again later.';
  const borrowError =
    'This book is not available to borrow at this time. Please try again later.';
  const erroneousActions = [
    'browse_book',
    'borrow_book',
    'create_token',
    'renew_loan',
    'return_loan',
  ];
  const searchParams = new URLSearchParams(location?.search);
  // ?error=true fails every erroneous action (e.g. simulates the book
  // already being borrowed by someone else). ?failAction=create_token (or
  // any action name) fails ONLY that action, so a renew_loan can succeed
  // and the immediately-following create_token can be made to fail —
  // reproducing WEBDEV-8322's "renewed, but create_token failed" bug
  // without needing a real book.
  const shouldReturnError =
    location?.hostname !== 'archive.org' &&
    erroneousActions.includes(option?.action) &&
    (searchParams.get('error') === 'true' ||
      searchParams.get('failAction') === option?.action);

  const testHostname = ['localhost', 'internetarchive.github.io'];
  let isTest = false;
  if (testHostname.includes(location.hostname)) {
    isTest = true;
    baseHost = location.href;
  }

  let formData = new FormData();
  formData.append('action', option.action);
  formData.append('identifier', option.identifier);

  // Set once a response arrives, so the catch below can tell a failed fetch
  // (a real network problem) from anything thrown afterwards — including by
  // the caller's own success/error callback, which run inside this try.
  let reachedResponse = false;

  try {
    await fetch(baseHost, {
      method: 'POST',
      body: formData,
    })
      .then(async response => {
        reachedResponse = true;

        // intentional error on localhost
        if (shouldReturnError) {
          return {
            success: false,
            error: option?.action === 'create_token' ? tokenError : borrowError,
          };
        }

        // return success response for localhost server...
        if (isTest) {
          if (
            option?.action == 'renew_loan' ||
            option?.action == 'return_loan'
          ) {
            // wait a few seconds so that the user can see the loading state
            await new Promise(resolve => setTimeout(resolve, 5000));
            return {
              success: true,
              loan: { renewal: true },
            };
          }
          return {
            success: true,
            message: 'operation executed successfully!',
          };
        }

        return parseServiceResponse(response, option);
      })
      .then(data => {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        if (!data?.error) {
          log(`[IABookActions] ✓ ${option.action} succeeded`, data);
          option?.success(data);
        } else {
          log(`[IABookActions] ✗ ${option.action} failed`, data);
          option?.error(data);
        }
      });
  } catch (error) {
    sentryCaptureException(error, {
      identifier: option.identifier,
      action: option.action,
      extra: {
        message: `${sentryLogs.actionsHandlerService} - ${option.action} ${
          reachedResponse ? 'threw' : 'fetch failed'
        }`,
      },
    });

    /**
     * Report it, don't just swallow it. A rejected fetch (offline, dropped
     * connection) lands here — a non-JSON body no longer does, see
     * parseServiceResponse() — as does anything thrown after the response
     * arrived; calling neither `success` nor `error` leaves every caller
     * waiting on a callback that never comes. Only the former is a network
     * problem, so only that one says so.
     *
     * For renew_loan that's not merely a missing modal: IABookActions
     * clears its loanRenewInProgress guard from these callbacks, so a
     * silent failure latched it on for good and every later renewal
     * attempt became a no-op. Backgrounding a tab on a flaky mobile
     * connection is exactly when this fires.
     */
    log(`[IABookActions] ✗ ${option.action} threw`, error);
    // networkFailure marks "the service never answered" (like
    // nonJsonResponse in parseServiceResponse) — see
    // IABookActions.handleLendingActionError.
    option?.error?.({
      error: reachedResponse ? unexpectedError : networkError,
      detail: String(error),
      ...(reachedResponse ? {} : { networkFailure: true }),
    });
  }
}

/**
 * Parse a lending service response without ever surfacing a raw
 * `SyntaxError` to the patron. Anything in front of PHP (the WAF, or nginx
 * swapping in /about/400.html or a 5xx page) can answer with HTML instead
 * of the service's JSON; that becomes a readable error carrying the HTTP
 * status, and is reported to Sentry with the identifier/action.
 *
 * @param {Response} response
 * @param {Object} option - the ActionsHandlerService options
 * @returns {Promise<Object>}
 */
export async function parseServiceResponse(response, option) {
  const { status } = response;
  const contentType = response.headers?.get('content-type') || '';

  // The service always answers with JSON (application/json, or
  // application/problem+json for OPDS) — anything else never came from it.
  const body = await response.text();
  let data;
  if (contentType.includes('json')) {
    try {
      data = JSON.parse(body);
    } catch (parseError) {
      data = undefined;
    }
  }

  if (data === undefined) {
    sentryCaptureMessage(
      `${sentryLogs.actionsHandlerService} - ${option.action}: non-JSON response (HTTP ${status})`,
      {
        identifier: option.identifier,
        action: option.action,
        extra: {
          status,
          contentType,
          bodySnippet: body.slice(0, 300),
        },
      }
    );
    // nonJsonResponse lets callers tell "something in front of PHP answered"
    // apart from the service's own error — see
    // IABookActions.handleLendingActionError.
    return {
      success: false,
      error: unexpectedResponseError(status),
      status,
      nonJsonResponse: true,
    };
  }

  // Carry the HTTP status on the service's own JSON errors too, so it
  // reaches Sentry. A JSON error status without the service's usual `error`
  // field would otherwise be treated as a success.
  if (!response.ok) {
    return {
      ...(data && typeof data === 'object' ? data : {}),
      success: false,
      error: data?.error || unexpectedResponseError(status),
      status,
    };
  }

  return data;
}
