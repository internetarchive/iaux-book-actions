/* eslint-disable */

/**
 * Helper to call loan service
 * @param {Object} options
 */
export default function ActionsHandlerService(options) {
  const option = {
    action: null,
    identifier: '',
    data: {},
    success() {},
    error() {},
    loader: true,
    type: 'POST',
    ...options,
  };

  let baseHost = '';
  if (window.location.pathname === '/demo/') {
    baseHost = `/demo/1`;
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
          return {
            error: 'loan token not found. please try again later.',
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

  //     showDialog(option.action, error);
  //   showDialog(
  //     option.action,
  //     '{"error": "Unexpected error. Please email this link to openlibrary@archive.org with the subject: Unexpected error. Thank you."}'
  //   );
  // }
}
