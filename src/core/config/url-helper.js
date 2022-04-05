import { nothing } from 'lit/html.js';

export class URLHelper {
  /**
   * @return {boolean} is this running in an iframe?
   */
  static isInIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  /**
   * Helper to get current url with respect to parent frame
   * @global top, eg top.window.location
   * @return {string}
   */
  static getRedirectUrl() {
    let url;
    if (URLHelper.isInIframe()) {
      // are we in a frame?
      url = window.top.location.href;
    } else {
      url = window.location.href;
    }
    return url;
  }

  /**
   * Helper function. Loads URL with consideration to parent frame.
   * @param {string} url
   * @param {boolean} tryParent (defaults to undefined)
   */
  static goToUrl(url, tryParent) {
    let ref;
    if (URLHelper.isInIframe() && tryParent) {
      ref = window.top.location;
    } else {
      ref = window.location;
    }
    if (ref.href === url) {
      ref.reload();
    } else {
      ref.href = url;
    }
  }

  static isOnStreamPage() {
    return window.location.href.indexOf('/stream/') > -1;
  }

  /**
   * Function to get the parameters from the URL
   * it returns param's value if param is defined
   */
  static getQueryParam(param) {
    const pageUrl = window.location.search.substring(1);
    const paramsUrl = pageUrl.split('&');
    let pName = '';
    for (let i = 0; i < paramsUrl.length; i += 1) {
      pName = paramsUrl[i].split('=');
      if (pName[0] === param) {
        return pName[1];
      }
    }

    return nothing;
  }

  /**
   * Removes the admin or access query param from window href
   *
   * @return {string} backHref
   */
  static getBackHref() {
    return window.location.href.replace(/[?&]{1}(?:admin|access)=1/, '');
  }

  static formatUrl(baseHost, url) {
    return /^https?:/.test(url) ? url : `${baseHost}${url}`;
  }
}
