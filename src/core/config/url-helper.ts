import { nothing } from 'lit/html.js';
import '../types/globals';

export class URLHelper {
  /** is this running in an iframe? */
  static isInIframe(): boolean {
    try {
      return window.self !== window.top;
    } catch (e) {
      window?.Sentry?.captureException(e);
      return true;
    }
  }

  /**
   * Helper to get current url with respect to parent frame.
   * Reads `top.window.location` when framed.
   */
  static getRedirectUrl(): string {
    if (URLHelper.isInIframe()) {
      return window.top!.location.href;
    }
    return window.location.href;
  }

  /** Loads URL with consideration to parent frame. */
  static goToUrl(url: string, tryParent?: boolean): void {
    const ref =
      URLHelper.isInIframe() && tryParent
        ? window.top!.location
        : window.location;
    if (ref.href === url) {
      ref.reload();
    } else {
      ref.href = url;
    }
  }

  static isOnStreamPage(): boolean {
    return window.location.href.indexOf('/stream/') > -1;
  }

  /**
   * Returns the named query param value, or `nothing` (lit sentinel) when absent.
   * The `nothing` return makes this safe to interpolate into a lit template.
   */
  static getQueryParam(param: string): string | typeof nothing {
    const pageUrl = window.location.search.substring(1);
    const paramsUrl = pageUrl.split('&');
    for (let i = 0; i < paramsUrl.length; i += 1) {
      const pName = paramsUrl[i].split('=');
      if (pName[0] === param) {
        return pName[1];
      }
    }
    return nothing;
  }

  /** Removes the admin or access query param from window href. */
  static getBackHref(): string {
    return window.location.href.replace(/[?&]{1}(?:admin|access)=1/, '');
  }

  static formatUrl(baseHost: string, url: string): string {
    return /^https?:/.test(url) ? url : `${baseHost}${url}`;
  }
}
