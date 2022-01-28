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
      let shouldReturnError =
        window.location.href.indexOf('?error=true') !== -1;
      const tokenError = 'loan token not found. please try again later.';
      const borrowError =
        'This book is not available to borrow at this time. Please try again later.';

      // return error reponse if query param has ?error=true param...
      const erroneousActions = ['browse_book', 'borrow_book', 'create_token'];
      if (shouldReturnError && erroneousActions.includes(option.action)) {
        return {
          success: false,
          error: option.action === 'create_token' ? tokenError : borrowError,
        };
      }

      // return success response for /demo/ server...
      if (baseHost == '/demo/1' || baseHost == '/demo/') {
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
      if (!data.error) {
        option?.success(data);
      } else {
        option?.error(data);
      }
    });
}
