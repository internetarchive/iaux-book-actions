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
  }).then(response => {
    if (response.status === 200) {
      option?.success(response);
    } else {
      option?.error(response);
    }
    return;
  });
}
