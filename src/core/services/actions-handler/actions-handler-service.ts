import { sentryLogs } from '../../config/sentry-events';
import '../../types/globals';

export interface ActionsHandlerServiceOptions {
  action: string | null;
  identifier: string;
  success?: (data?: unknown) => void;
  error?: (data: unknown) => void;
}

interface LoanResponse {
  success?: boolean;
  loan?: { renewal?: boolean; [k: string]: unknown };
  error?: string;
  message?: string;
  [k: string]: unknown;
}

/**
 * Helper that POSTs to the petabox loans endpoint and routes the
 * response through `success` / `error` callbacks supplied by the caller.
 *
 * Has a localhost test-mode that synthesizes responses (and an
 * `?error=true` flag for forcing failure paths in dev).
 */
export default async function ActionsHandlerService(
  options: ActionsHandlerServiceOptions,
): Promise<void> {
  const option: Required<ActionsHandlerServiceOptions> = {
    success: () => {},
    error: () => {},
    ...options,
    action: options.action ?? null,
    identifier: options.identifier ?? '',
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
    location?.href?.indexOf('?error=true') !== -1 &&
    location?.hostname !== 'archive.org';

  const testHostname = ['localhost', 'internetarchive.github.io'];
  let isTest = false;
  if (testHostname.includes(location.hostname)) {
    isTest = true;
    baseHost = location.href;
  }

  const formData = new FormData();
  formData.append('action', String(option.action));
  formData.append('identifier', option.identifier);

  try {
    await fetch(baseHost, {
      method: 'POST',
      body: formData,
    })
      .then(async (response): Promise<LoanResponse> => {
        // intentional error on localhost
        if (shouldReturnError && erroneousActions.includes(option.action!)) {
          return {
            success: false,
            error: option.action === 'create_token' ? tokenError : borrowError,
          };
        }

        // return success response for localhost server...
        if (isTest) {
          if (
            option.action === 'renew_loan' ||
            option.action === 'return_loan'
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
      .then((data: LoanResponse) => {
        if (!data?.error) {
          option.success(data);
        } else {
          option.error(data);
        }
      });
  } catch (error) {
    window?.Sentry?.captureException(
      `${sentryLogs.actionsHandlerService} - Error: ${error}`,
    );
  }
}
