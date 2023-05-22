/* eslint-disable */
import { sentryLogs } from '../../config/sentry-events.js';

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
  ];
  const shouldReturnError =
    location?.href?.indexOf('?error=true') !== -1 &&
    location?.hostname !== 'archive.org';

  if (location?.pathname === '/demo/') baseHost = `/demo/`;

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

        // return success response for /demo/ server...
        if (baseHost == '/demo/1' || baseHost == '/demo/') {
          if (option?.action == 'renew_loan') {
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
          option?.success(data);
        } else {
          option?.error(data);
        }
      });
  } catch (error) {
    window?.Sentry?.captureException(
      `${sentryLogs.actionsHandlerService} - Error: ${error}`
    );
  }
}
