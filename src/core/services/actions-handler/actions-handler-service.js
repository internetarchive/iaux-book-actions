/* eslint-disable */
import { sentryLogs } from '../../config/sentry-events.js';
import log from '../log.js';

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

  // return error reponse when not production and has ?error=true param...
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
  const shouldReturnError =
    new URLSearchParams(location?.search).get('error') === 'true' &&
    location?.hostname !== 'archive.org';

  const testHostname = ['localhost', 'internetarchive.github.io'];
  let isTest = false;
  if (testHostname.includes(location.hostname)) {
    isTest = true;
    baseHost = location.href;
  }

  let formData = new FormData();
  formData.append('action', option.action);
  formData.append('identifier', option.identifier);

  try {
    await fetch(baseHost, {
      method: 'POST',
      body: formData,
    })
      .then(async response => {
        // intentional error on localhost
        if (shouldReturnError && erroneousActions.includes(option?.action)) {
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

        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
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
    window?.Sentry?.captureException(
      `${sentryLogs.actionsHandlerService} - Error: ${error}`
    );

    /**
     * Report it, don't just swallow it. A rejected fetch (offline, dropped
     * connection) or a non-JSON body (a 405 returning HTML, which QA has
     * been seeing) lands here, and calling neither `success` nor `error`
     * leaves every caller waiting on a callback that never comes.
     *
     * For renew_loan that's not merely a missing modal: IABookActions
     * clears its loanRenewInProgress guard from these callbacks, so a
     * silent failure latched it on for good and every later renewal
     * attempt became a no-op. Backgrounding a tab on a flaky mobile
     * connection is exactly when this fires.
     */
    log(`[IABookActions] ✗ ${option.action} threw`, error);
    option?.error({
      error: `Could not reach the lending service. Please check your connection and try again. (${error})`,
    });
  }
}
