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

  const baseHost = '';

  const xhr = new XMLHttpRequest();
  xhr.open(option.type, `${baseHost}/services/loans/loan`, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4 || xhr.status !== 200) {
      return;
    }

    const responses = xhr.responseText;
    console.log(responses);
    // if (typeof responses === 'string') {
    // responses = JSON.parse(responses);
    // responses = responses;
    // }
    // processServerResponse(responses);
  };
  xhr.send(`action=${option.action}&identifier=${option.identifier}`);
  // console.log(typeof(options))

  // const final_items = options.map(item => item.split('&'));
  // var dd = Object.keys(options).join('=') + Object.values(options).join('&')

  // var CSVOf_arr = options.map((item) => { return options }).join('&')

  // console.log(final_items)
  // console.log(xhr)

  // $.ajax({
  //   url: "/services/loans/loan/",
  //   type: options.type,
  //   dataType: "json",
  //   data: Object.assign({
  //     action: options.action,
  //     identifier: options.identifier
  //   }, options.data),
  //   timeout: 60000 // up to 60 seconds, because item creation takes time
  // }).then(
  //   callbackSuccess,
  //   callbackError
  // );
}
// return;

/*
LendingFlow.prototype.callService = function(options) {
  options = Object.assign({
    action: null,
    data: {},
    success: function() {},
    error: null,
    useLoader: true,
    type: 'POST',
  }, options);

  if (options.useLoader) {
    this.showBookReaderMessageLoader();
  }

  if (options.error === null) {
    options.error = function(response) {
      var msg;
      if (response && response.responseJSON && response.responseJSON.error) {
        msg = response.responseJSON.error;
      } else {
        msg = "There was an error";
      }
      alert(msg);
    };
  }

  var callbackSuccess = function(data, textStatus, jqXHR) {
    if (options.useLoader) {
      this.showBookReaderMessageLoader();
    }
    options.success.call(this, data, textStatus, jqXHR);
  }.bind(this);

  var callbackError = function(jqXHR, textStatus, errorThrown) {
    if (options.useLoader) {
      this.hideBookReaderMessageLoader();
    }
    options.error.call(this, jqXHR, textStatus, errorThrown);
  }.bind(this);

  $.ajax({
    url: "/services/loans/loan/",
    type: options.type,
    dataType: "json",
    data: Object.assign({
      action: options.action,
      identifier: this.br.bookId
    }, options.data),
    timeout: 60000 // up to 60 seconds, because item creation takes time
  }).then(
    callbackSuccess,
    callbackError
  );
};
*/
