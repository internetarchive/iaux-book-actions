/**
 * Helper module to get, set, and remove items from `document.cookie`.
 *
 * See:
 *  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
 *  https://github.com/madmurphy/cookies.js
 *  Released under the GNU Public License, version 3 or later.
 *  http://www.gnu.org/licenses/gpl-3.0-standalone.html
 */

/** Get specific key's value stored in cookie. */
export function getItem(sKey: string): string | null {
  if (!sKey) return null;

  return (
    decodeURIComponent(
      document.cookie.replace(
        new RegExp(
          '(?:(?:^|.*;)\\s*' +
            encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
            '\\s*\\=\\s*([^;]*).*$)|^.*$',
        ),
        '$1',
      ),
    ) || null
  );
}

/** Set specific key's value in cookie. */
export function setItem(
  sKey: string,
  sValue: string,
  vEnd?: Date,
  sPath?: string,
  sDomain?: string,
  bSecure?: boolean,
): boolean {
  document.cookie =
    encodeURIComponent(sKey) +
    '=' +
    encodeURIComponent(sValue) +
    (vEnd ? `; expires=${vEnd.toUTCString()}` : '') +
    (sDomain ? `; domain=${sDomain}` : '') +
    (sPath ? `; path=${sPath}` : '') +
    (bSecure ? `; secure` : '');
  return true;
}

/** Determine if a specific cookie exists. */
export function hasItem(sKey: string): boolean {
  const reCNameAllowed =
    /^(?:expires|max-age|path|domain|secure|samesite|httponly)$/i;

  if (!sKey || reCNameAllowed.test(sKey)) {
    return false;
  }

  return new RegExp(
    '(?:^|;\\s*)' +
      encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') +
      '\\s*\\=',
  ).test(document.cookie);
}

/** Remove a specific cookie. (Note: requires path/domain match to actually expire.) */
export function removeItem(
  sKey: string,
  sPath?: string,
  sDomain?: string,
): boolean {
  if (!hasItem(sKey)) return false;

  document.cookie =
    encodeURIComponent(sKey) +
    `=; expires=Thu, 01 Jan 1970 00:00:00 GMT` +
    (sDomain ? `; domain=${sDomain}` : '') +
    (sPath ? `; path=${sPath}` : '');

  return true;
}
