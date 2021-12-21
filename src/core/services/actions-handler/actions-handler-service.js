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
        return {
          error:
            'This book is not available to browse at this time. Please try again later.',
          // error: 'This book is not available to borrow at this time. Please try again later.',
        };
      }

      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    })
    .then(data => {
      // `data` is the parsed version of the JSON returned from the above endpoint.
      console.log('actual reponse for endpoint', data);
      if (!data.error) {
        option?.success(data);
      } else {
        option?.error(data);
      }
    });

  // if (baseHost == '/demo/') {
  //   // option.callback('{"error": "Unexpected error. Please email this link to openlibrary@archive.org with the subject: Unexpected error. Thank you."}');

  //   showDialog(
  //     option.action,
  //     '{"error": "Unexpected error. Please email this link to openlibrary@archive.org with the subject: Unexpected error. Thank you."}'
  //   );
  // }

  // .catch(error => {
  //   console.log('error', error);

  //   if (baseHost == '/demo/') {
  //     showDialog(
  //       option.action,
  //       '{"error": "Unexpected error. Please email this link to openlibrary@archive.org with the subject: Unexpected error. Thank you."}'
  //     );
  //     // showDialog('{"result": true, "token": "token-response"}');
  //   } else {
  //     showDialog(option.action, error);
  //   }
  // });
}

function showDialog(action, xhrResponse) {
  const showDialog = document
    .querySelector('ia-book-actions')
    .shadowRoot.querySelector('show-dialog');

  let title = 'Connection error';
  let body = 'Please check internet connection.';
  let actions = [
    {
      text: 'Okay',
      callback: () => {
        weAreBack();
        this.updateToken();
      },
      className: 'ia-button primary',
    },
  ];

  // Specific error
  const data = JSON.parse(xhrResponse);
  console.log('data', data);
  if (data.error) {
    title = 'Sorry!';
    body = data.error;
    // Only go back to item button on error
    actions = [
      {
        text: 'Back to item details',
        callback: () => {
          URLHelper.goToUrl(this.lendingStatus.bookUrl);
        },
        className: 'ia-button primary',
      },
    ];
  }

  showDialog.opened = true;
  showDialog.title = title;
  showDialog.body = body;
  if (action === 'create_token') {
    showDialog.actions = actions;
  }

  // add overlay
  // const overlayElement = document.createElement('div');
  // overlayElement.id = 'ui-overlay';
  // document.getElementsByTagName('body')[0].appendChild(overlayElement);
}
