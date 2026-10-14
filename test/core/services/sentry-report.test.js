import { expect } from '@open-wc/testing';
import Sinon from 'sinon';

import {
  buildSentryContext,
  sentryCaptureMessage,
  sentryCaptureException,
} from '../../../src/core/services/sentry-report.js';

describe('sentry-report', () => {
  let originalSentry;

  beforeEach(() => {
    originalSentry = window.Sentry;
    window.Sentry = {
      captureMessage: Sinon.spy(),
      captureException: Sinon.spy(),
    };
  });

  afterEach(() => {
    window.Sentry = originalSentry;
  });

  it('tags events with the identifier and action', () => {
    const context = buildSentryContext({
      identifier: 'foo',
      action: 'create_token',
      extra: { status: 400 },
    });

    expect(context.tags).to.deep.equal({
      identifier: 'foo',
      action: 'create_token',
    });
    expect(context.extra).to.deep.equal({
      identifier: 'foo',
      action: 'create_token',
      status: 400,
    });
  });

  it('leaves out tags that are not known', () => {
    expect(buildSentryContext({ identifier: 'foo' }).tags).to.deep.equal({
      identifier: 'foo',
    });
    expect(buildSentryContext().tags).to.deep.equal({});
  });

  it('passes the context through to Sentry', () => {
    sentryCaptureMessage('msg', { identifier: 'foo', action: 'renew_loan' });
    const error = new Error('boom');
    sentryCaptureException(error, { identifier: 'foo', action: 'return_loan' });

    expect(window.Sentry.captureMessage.firstCall.args[0]).to.equal('msg');
    expect(window.Sentry.captureMessage.firstCall.args[1].tags).to.deep.equal({
      identifier: 'foo',
      action: 'renew_loan',
    });
    expect(window.Sentry.captureException.firstCall.args[0]).to.equal(error);
    expect(
      window.Sentry.captureException.firstCall.args[1].tags.action
    ).to.equal('return_loan');
  });

  it('does nothing when Sentry is not loaded', () => {
    window.Sentry = undefined;
    expect(() =>
      sentryCaptureMessage('msg', { identifier: 'foo' })
    ).to.not.throw();
  });
});
