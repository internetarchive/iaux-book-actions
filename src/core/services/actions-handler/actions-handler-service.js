/* eslint-disable */

/**
 * Helper to call loan service
 * @param {Object} options
 */
export default function ActionsHandlerService(options) {
  const option = {
    action: null,
    identifier: '',
    success() {},
    error() {},
    ...options,
  };

  let baseHost = '';
  if (window.location.pathname === '/demo/') {
    baseHost = `/demo/`;
  } else {
    baseHost = `/services/loans/loan`;
  }

  let formData = new FormData();
  formData.append('action', option.action);
  formData.append('identifier', option.identifier);

  fetch(baseHost, {
    method: 'POST',
    body: formData,
  })
    .then(response => {
      // test changes, (won't affect you)
      if (baseHost == '/demo/1' || baseHost == '/demo/') {
        if (option.action == 'create_token') {
          // return {'success': false, 'error': 'loan token not found. please try again later.',};
          return {
            success: true,
            token: '1640945898-f77a0cb615190798f1faf2dafe277b2e',
          };
        }

        return {
          error:
            'This book is not available to borrow at this time. Please try again later.',
        };
      }

      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(data => {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      if (!data.error) {
        option?.success(data);
      } else {
        option?.error(data);
      }
    });
}
