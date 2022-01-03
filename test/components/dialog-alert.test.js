/* eslint-disable */
import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/dialog-alert.js';

const container = ({
  title = '',
  body = '',
  allowClose = false,
  opened = false,
} = {}) =>
  html`<show-dialog
    .title=${title}
    .body=${body}
    ?allowClose=${allowClose}
    ?opened=${opened}
  ></show-dialog>`;

describe('<show-dialog>', () => {
  it('assign values and initiate dialog-alert', async () => {
    const el = await fixture(
      container({
        title: 'internal error!',
        body: 'there was an internal error',
        opened: true,
      })
    );
    expect(el.title).to.be.equal('internal error!');
    expect(el.body).to.be.equal('there was an internal error');
  });

  it('close button should not render', async () => {
    const el = await fixture(
      container({
        title: 'internal error!',
        body: 'there was an internal error',
      })
    );
    expect(el.title).to.be.equal('internal error!');
    expect(el.body).to.be.equal('there was an internal error');

    // close icon is not exist
    const closeButton = el.shadowRoot.querySelector('ia-icon-close');
    expect(closeButton).to.be.null;
  });

  it('close dialog-alert on X icon click', async () => {
    const el = await fixture(
      container({
        title: 'internal error!',
        body: 'there was an internal error',
        allowClose: true,
        opened: true,
      })
    );

    const closeButton = el.shadowRoot.querySelector('ia-icon-close');
    const errorEvent = new CustomEvent('dialogAlertClose');
    closeButton.dispatchEvent(errorEvent);
    await el.updateComplete;
    expect(el.opened).to.be.true;
  });
});
