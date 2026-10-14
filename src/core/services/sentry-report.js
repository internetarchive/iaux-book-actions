/* global: window */

/**
 * Builds Sentry's captureContext with the book identifier and lending action
 * attached as tags, so events can be filtered per book or per action (e.g.
 * `action:create_token identifier:foo`) without the identifier going into
 * the message text — which would split one issue into one per book.
 *
 * @param {Object} [context]
 * @param {string} [context.identifier]
 * @param {string} [context.action] - e.g. create_token, renew_loan
 * @param {Object} [context.extra] - any other details worth keeping
 * @returns {Object}
 */
export function buildSentryContext({ identifier, action, extra = {} } = {}) {
  const tags = {};
  if (identifier) tags.identifier = identifier;
  if (action) tags.action = action;

  return {
    tags,
    extra: { identifier, action, ...extra },
  };
}

/**
 * @param {string} message
 * @param {Object} [context] - see buildSentryContext
 */
export function sentryCaptureMessage(message, context) {
  window?.Sentry?.captureMessage?.(message, buildSentryContext(context));
}

/**
 * @param {Error|string} error
 * @param {Object} [context] - see buildSentryContext
 */
export function sentryCaptureException(error, context) {
  window?.Sentry?.captureException?.(error, buildSentryContext(context));
}
