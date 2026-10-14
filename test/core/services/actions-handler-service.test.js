import { expect } from '@open-wc/testing';
import Sinon from 'sinon';

import ActionsHandlerService, {
  parseServiceResponse,
  networkError,
  unexpectedError,
} from '../../../src/core/services/actions-handler/actions-handler-service.js';

const option = { identifier: 'foo', action: 'create_token' };
const jsonHeaders = { 'Content-Type': 'application/json' };

describe('ActionsHandlerService#parseServiceResponse', () => {
  let originalSentry;

  beforeEach(() => {
    originalSentry = window.Sentry;
    window.Sentry = { captureMessage: Sinon.spy() };
  });

  afterEach(() => {
    window.Sentry = originalSentry;
  });

  it('turns an HTML error page into a readable error instead of a SyntaxError', async () => {
    // e.g. the WAF's /about/400.html in place of the service's JSON
    const response = new Response('<!DOCTYPE html><html>Bad Request</html>', {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });

    const data = await parseServiceResponse(response, option);

    expect(data.success).to.be.false;
    expect(data.status).to.equal(400);
    expect(data.nonJsonResponse).to.be.true;
    expect(data.error).to.contain('HTTP 400');
    expect(data.error).to.not.contain('SyntaxError');
  });

  it('reports the non-JSON response to Sentry with the identifier, action and status', async () => {
    const response = new Response('<!DOCTYPE html>', {
      status: 400,
      headers: { 'Content-Type': 'text/html' },
    });

    await parseServiceResponse(response, option);

    expect(window.Sentry.captureMessage.calledOnce).to.be.true;
    const [message, context] = window.Sentry.captureMessage.firstCall.args;
    expect(message).to.contain('create_token');
    expect(message).to.contain('HTTP 400');
    expect(context.tags).to.deep.equal({
      identifier: 'foo',
      action: 'create_token',
    });
    expect(context.extra.status).to.equal(400);
    expect(context.extra.contentType).to.equal('text/html');
    expect(context.extra.bodySnippet).to.contain('<!DOCTYPE');
  });

  it("treats a JSON body as the service's answer even without a JSON content type", async () => {
    const body = { success: true, token: 'abc' };
    const response = new Response(JSON.stringify(body), {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });

    expect(await parseServiceResponse(response, option)).to.deep.equal(body);
    expect(window.Sentry.captureMessage.called).to.be.false;
  });

  it('treats a JSON content type with an unparseable body as non-JSON', async () => {
    const response = new Response('<!DOCTYPE html>', {
      status: 502,
      headers: jsonHeaders,
    });

    const data = await parseServiceResponse(response, option);

    expect(data.error).to.contain('HTTP 502');
  });

  it("keeps the service's own JSON error, adding the HTTP status", async () => {
    const body = {
      success: false,
      error: 'You do not currently have this book borrowed.',
    };
    const response = new Response(JSON.stringify(body), {
      status: 400,
      headers: jsonHeaders,
    });

    const data = await parseServiceResponse(response, option);

    expect(data).to.deep.equal({ ...body, status: 400 });
    expect(data.nonJsonResponse).to.be.undefined;
    expect(window.Sentry.captureMessage.called).to.be.false;
  });

  it('passes a JSON success through untouched', async () => {
    const body = { success: true, token: 'abc' };
    const response = new Response(JSON.stringify(body), {
      status: 200,
      headers: jsonHeaders,
    });

    expect(await parseServiceResponse(response, option)).to.deep.equal(body);
  });

  it('never treats a JSON error status without an error field as a success', async () => {
    const response = new Response('{}', { status: 503, headers: jsonHeaders });

    const data = await parseServiceResponse(response, option);

    expect(data.success).to.be.false;
    expect(data.error).to.contain('HTTP 503');
  });
});

describe('ActionsHandlerService - thrown errors', () => {
  let originalSentry;
  let fetchStub;

  beforeEach(() => {
    originalSentry = window.Sentry;
    window.Sentry = { captureException: Sinon.spy() };
  });

  afterEach(() => {
    window.Sentry = originalSentry;
    fetchStub?.restore();
  });

  it('says the service could not be reached only when the fetch itself failed', async () => {
    fetchStub = Sinon.stub(window, 'fetch').rejects(
      new TypeError('Failed to fetch')
    );
    const error = Sinon.spy();

    await ActionsHandlerService({
      identifier: 'foo',
      action: 'create_token',
      error,
    });

    expect(error.calledOnce).to.be.true;
    expect(error.firstCall.args[0].error).to.equal(networkError);
    expect(error.firstCall.args[0].networkFailure).to.be.true;
    const [, context] = window.Sentry.captureException.firstCall.args;
    expect(context.tags).to.deep.equal({
      identifier: 'foo',
      action: 'create_token',
    });
  });

  it("doesn't blame the network for a throw after the response arrived", async () => {
    // e.g. the caller's success callback crashing (BookReader init)
    const error = Sinon.spy();

    await ActionsHandlerService({
      identifier: 'foo',
      action: 'create_token',
      success: () => {
        throw new Error('boom');
      },
      error,
    });

    expect(error.calledOnce).to.be.true;
    expect(error.firstCall.args[0].error).to.equal(unexpectedError);
    expect(error.firstCall.args[0].detail).to.contain('boom');
    // the service did answer, so this isn't treated as "no answer"
    expect(error.firstCall.args[0].networkFailure).to.be.undefined;
  });
});
