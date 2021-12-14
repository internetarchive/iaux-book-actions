/* eslint-disable */

import ActionsHandlerService from './actions-handler/actions-handler-service.js';
import { URLHelper } from '../config/url-helper.js';

import '../../components/show-dialog.js';

export default class ArchiveOrgTokenPoller {
  constructor(identifier, lendingStatus) {
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.pollingDelay = 6000; // 60000 ms = 1 min
    this.tokenInterval = null;
  }

  init() {
    // Do an initial token, then set an interval
    this.tokenInterval = setInterval(() => {
      this.updateToken(undefined);
    }, this.pollingDelay);
  }

  updateToken() {
    ActionsHandlerService({
      identifier: this.identifier,
      action: 'create_token',
      success: () => {
        this.hideErrorDialog(); // remove overlay and message box...
      },
      error: jqXHR => {
        this.showErrorDialog(jqXHR);
      },
      loader: false,
    });
  }

  hideErrorDialog() {
    const element = document.getElementsByClassName('ui-overlay');
    if (element) element.remove;
  }

  showErrorDialog(jqXHR) {
    let title = 'Connection error';
    let body = 'Please check internet connection.';
    let actions = [
      {
        text: 'Okay',
        callback: () => {
          // close, and try again
          // weAreBack();
          this.updateToken();
        },
      },
    ];
    try {
      // Specific error
      const data = JSON.parse(jqXHR.responseText);
      if (data['error']) {
        title = 'Sorry!';
        body = data['error'];
        // Only go back to item button on error
        actions = [
          {
            text: 'Back to item details',
            callback: () => {
              URLHelper.goToUrl(this.lendingStatus.bookUrl);
            },
            className: 'btn-primary',
          },
        ];
      }
    } catch (e) {}

    let showDialog = document.querySelector('show-dialog');

    // set defaultLendingStatus for unavailable (without borrowables) book
    showDialog.opened = true;
    showDialog.title = true;
    showDialog.body = true;
    // showDialog.opened = true;
    // showDialog.identifier = identifier;

    tokenDialog = showDialog({
      title: title,
      body: body,
      allowClose: false,
      actions: actions,
    });
  }
}

/*
ArchiveOrgTokenPoller.prototype.init = function(lendingFlow, doneCallback, errorCallback) {
  var tokenDialog;
  var self = this;
  self.lendingFlow = lendingFlow;
  var pollingDelay = 60000; // 120000 ms == 2 min

  var somethingWentWrong = function(jqXHR, textStatus, errorThrown) {
    var title = 'Connection error';
    var body = 'Please check internet connection.';
    var actions = [
      {text: 'Okay', callback: function() {
        // close, and try again
        weAreBack();
        updateToken();
      }},
    ];
    try {
      // Specific error
      var data = JSON.parse(jqXHR.responseText);
      if (data['error']) {
        title = 'Sorry!';
        body = data['error'];
        // Only go back to item button on error
        actions = [{text: 'Back to item details', callback: function() {
          self.lendingFlow.goToUrl(self.lendingFlow.lendingInfo.bookUrl);
        }, className: 'btn-primary'}];
      }
    } catch (e) {}
    tokenDialog = showDialog({
      title: title,
      body: body,
      allowClose: false,
      actions: actions,
    });
  }

  // close a token dialog if open. eg. offline, now back online
  var weAreBack = function() {
    lendingFlow.br.reloadImages();
  }

  var closeTokenDialog = function() {
    if (tokenDialog) {
      try { tokenDialog.colorbox.close(); } catch (e) {}
      tokenDialog = null;
    }
  }

  // do ajax request to token endpoint
  var updateToken = function(successCallback, errorCallback) {
    lendingFlow.callService({
      action: "create_token",
      success: function(data) {
        closeTokenDialog();
        if (successCallback !== undefined) {
          successCallback(data);
        }
      },
      error: function(jqXHR, textStatus, errorThrown) {
        var shouldContinue = true;
        if (typeof errorCallback === 'function') {
          shouldContinue = errorCallback(jqXHR, textStatus, errorThrown);
        }
        console.log('textStatus, errorThrown', textStatus, errorThrown);
        // if (shouldContinue) {
        somethingWentWrong(jqXHR, textStatus, errorThrown);
        // }
      },
      useLoader: false,
    });
  }

  // Do an initial token, then set an interval
  updateToken(function() {
    doneCallback();
    self.tokenInterval = setInterval(function() {
      updateToken(undefined, errorCallback)
    }, pollingDelay);
  }, errorCallback);
}
*/
