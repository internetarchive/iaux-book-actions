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
    useLoader: true,
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

  // callback binding for success reponse
  const callbackSuccess = function (data, textStatus, jqXHR) {
    if (options.useLoader) {
      this.showBookReaderMessageLoader();
    }
    options.success.call(this, data, textStatus, jqXHR);
  }.bind(this);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callbackSuccess();
    }
  };

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(`action=${option.action}&identifier=${option.identifier}`);
}
