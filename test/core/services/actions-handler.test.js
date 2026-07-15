import { expect, fixture } from '@open-wc/testing';
import sinon from 'sinon';

import ActionsHandler from '../../../src/core/services/actions-handler/actions-handler.js';

// Define a temporary tag for this element for testing
const TEST_TAG = 'ia-actions-handler-test';
if (!customElements.get(TEST_TAG)) {
  customElements.define(TEST_TAG, ActionsHandler);
}

describe('ActionsHandler#setStickyAdminAccess', () => {
  let clock;
  let lastSetCookie;
  let cookieOverridden = false;
  let actionsHandlerFixture;

  beforeEach(async () => {
    // Intercept document.cookie writes to capture the full cookie string
    Object.defineProperty(document, 'cookie', {
      configurable: true,
      get() {
        return '';
      },
      set(value) {
        lastSetCookie = value;
      },
    });
    cookieOverridden = true;

    // Create the element via fixture (portable across browsers)
    actionsHandlerFixture = await fixture(`<${TEST_TAG}></${TEST_TAG}>`);
  });

  afterEach(() => {
    sinon.restore();
    if (clock) {
      clock.restore();
      clock = undefined;
    }
    // restore document.cookie
    if (cookieOverridden) {
      try {
        // remove our instance-level override
        // eslint-disable-next-line no-param-reassign
        delete document.cookie;
      } catch (e) {
        // ignore
      }
      cookieOverridden = false;
    }
    lastSetCookie = undefined;
  });

  it('sets the sticky-admin-access cookie with correct domain, path, and 30-day expiration', async () => {
    // Arrange: fix time and stub cookie writer
    const now = new Date('2025-01-01T00:00:00.000Z');
    clock = sinon.useFakeTimers({ now: now.getTime() });

    // Calculate expected values based on current environment
    const expectedDomain = window.location.hostname === 'localhost' ? 'localhost' : '.archive.org';
    const expectedExpires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

    // Act: call the method on the element created in beforeEach
    actionsHandlerFixture.setStickyAdminAccess(true);

    // Assert: verify the composed cookie string
    expect(lastSetCookie).to.be.a('string');
    // Name and value
    expect(lastSetCookie).to.contain(`${encodeURIComponent('sticky-admin-access')}=${encodeURIComponent('true')}`);
    // Domain
    expect(lastSetCookie).to.contain(`domain=${expectedDomain}`);
    // Path
    expect(lastSetCookie).to.contain('path=/');
    // Expiration close to 30 days from now
    const match = /expires=([^;]+)/.exec(lastSetCookie);
    expect(match).to.not.equal(null);
    const expiresStr = match && match[1];
    const parsed = expiresStr ? new Date(expiresStr) : null;
    expect(parsed).to.be.instanceOf(Date);
    expect(parsed && parsed.getTime()).to.equal(expectedExpires.getTime());
  });

  it('sets the cookie value to false when disabling', async () => {
    // Act
    actionsHandlerFixture.setStickyAdminAccess(false);

    expect(lastSetCookie).to.be.a('string');
    expect(lastSetCookie).to.contain(`${encodeURIComponent('sticky-admin-access')}=${encodeURIComponent('false')}`);
  });
});
