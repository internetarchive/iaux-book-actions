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

  let baseHost = '';
  if (window.location.pathname === '/demo/') {
    baseHost = `/demo/`;
  } else {
    baseHost = `/services/loans/loan`;
  }

  const xhr = new XMLHttpRequest();
  xhr.open(option.type, baseHost, true);
  xhr.timeout = 60000; // up to 6 seconds, because item creation takes time

  if (option.loader) {
    showActionButtonLoader();
  }

  // callback binding for success reponse
  const callbackSuccess = function (data, textStatus, jqXHR) {
    option.success.call(this, data, textStatus, jqXHR);
  }.bind(this);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callbackSuccess();
    }
  };

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`action=${option.action}&identifier=${option.identifier}`);
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
