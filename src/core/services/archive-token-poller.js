/* eslint-disable */
import { LitElement } from 'lit-element';
import { URLHelper } from '../config/url-helper.js';

import ActionsHandlerService from './actions-handler/actions-handler-service.js';

import '../../components/show-dialog.js';

export default class ArchiveOrgTokenPoller {
  constructor(identifier, lendingStatus) {
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.pollingDelay = 5000; // 20000 ms = 20 sec
    this.tokenInterval = null;
  }

  init() {
    console.log('ArchiveOrgTokenPoller started...');

    // Do an initial token, then set an interval
    this.tokenInterval = setInterval(() => {
      this.updateToken();
    }, this.pollingDelay);
  }

  updateToken() {
    const context = '';
    ActionsHandlerService({
      identifier: this.identifier,
      action: 'create_token',
      loader: false,
      success: () => {
        this.handleReadItNow();
      },
      error: data => {
        // alert(data.error);
        this.showDialog(context, data);
      },
    });
  }

  showDialog(context, data) {
    const showDialog = document
      .querySelector('ia-book-actions')
      .shadowRoot.querySelector('show-dialog');

    let title = 'Connection error';
    let body = 'Please check internet connection.';
    let actions = [
      {
        text: 'Okay',
        callback: () => {
          // weAreBack();
          this.updateToken();
        },
        className: 'ia-button primary',
      },
    ];

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
    this.toggleActionBarState(context, data, actions);
    // this.dispatchEvent(
    //   new CustomEvent('toggle-action-bar-state', {
    //     detail: { context, data, actions },
    //   })
    // );
  }

  toggleActionBarState(context, data = {}, actions = {}) {
    this.dispatchEvent(
      new CustomEvent('toggle-action-bar-state', {
        detail: { context, data, actions },
      })
    );
  }
}
