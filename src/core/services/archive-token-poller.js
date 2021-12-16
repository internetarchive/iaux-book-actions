/* eslint-disable */

import ActionsHandlerService from './actions-handler/actions-handler-service.js';
import { URLHelper } from '../config/url-helper.js';

import '../../components/show-dialog.js';

export default class ArchiveOrgTokenPoller {
  constructor(identifier, lendingStatus) {
    this.identifier = identifier;
    this.lendingStatus = lendingStatus;
    this.pollingDelay = 20000; // 20000 ms = 20 sec
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
    ActionsHandlerService({
      identifier: this.identifier,
      action: 'create_token',
      loader: false,
    });
  }
}
