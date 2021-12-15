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
    this.showDialog = document
      .querySelector('ia-book-actions')
      .shadowRoot.querySelector('show-dialog');
  }

  init() {
    console.log('ArchiveOrgTokenPoller started...');
    // Do an initial token, then set an interval
    this.tokenInterval = setInterval(() => {
      this.updateToken();
    }, this.pollingDelay);
  }

  updateToken() {
    ActionsHandlerService({
      identifier: this.identifier,
      action: 'create_token',
      // callback: (xhrResponse) => {
      //   console.log('xhrResponse', xhrResponse);
      //   if (xhrResponse.status === true) {
      //     this.hideErrorDialog(); // remove overlay and message box...
      //     // this.showErrorDialog(xhrResponse);
      //   } else {
      //     this.showErrorDialog(xhrResponse);
      //   }
      // },
      loader: false,
    });
  }

  hideErrorDialog() {
    this.showDialog.dialogVisible = false;
  }

  showErrorDialog(xhrResponse) {
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

    const showDialog = document
      .querySelector('ia-book-actions')
      .shadowRoot.querySelector('show-dialog');

    showDialog.opened = true;
    showDialog.title = title;
    showDialog.body = body;
    showDialog.actions = actions;
  }
}
