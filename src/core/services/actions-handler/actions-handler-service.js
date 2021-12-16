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
    error: null,
    loader: true,
    type: 'POST',
    ...options,
  };

  if (option.loader) {
    showActionButtonLoader();
  }

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
    .then(response => response.json())
    .then(response => {
      if (response.status === 200) {
        option.success.call();
      } else if (response.error) {
        const message = response.error;
        if (options.error) {
          return options?.error(message);
        }
        alert(message);
      }
    });
}

function showActionButtonLoader() {
  const collapsibleElement = document
    .querySelector('ia-book-actions')
    .shadowRoot.querySelector('collapsible-action-group');
  collapsibleElement.setAttribute('style', 'opacity:0.8; pointer-events:none');

  const actionLoader = collapsibleElement.shadowRoot.querySelector(
    '.action-loader'
  );
  actionLoader.setAttribute('style', 'visibility: visible');
}
