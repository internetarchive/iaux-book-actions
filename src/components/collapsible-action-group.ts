import { html, PropertyValues, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nothing } from 'lit/html.js';
import { classMap } from 'lit/directives/class-map.js';

import ActionsHandler from '../core/services/actions-handler/actions-handler';

import buttonBaseStyle from '../assets/styles/ia-button';
import CollapsibleActionGroupStyle from '../assets/styles/collapsible-action-group';

import { tabletContainerWidth } from '../core/config/constants';
import { purchaseIcon } from '../assets/data/purchase';
import { dropdownOpened, dropdownClosed } from '../assets/data/dropdown-arrow';

import type {
  ActionButtonConfig,
  AnalyticsEventPayload,
} from '../core/types/lending-status';

type DropdownState = 'open' | 'close';

@customElement('collapsible-action-group')
export class CollapsibleActionGroup extends ActionsHandler {
  @property({ type: String }) userid = '';
  @property({ type: String }) identifier = '';
  @property({ type: Array }) primaryActions: ActionButtonConfig[] = [];
  @property({ type: Array }) secondaryActions: ActionButtonConfig[] = [];
  @property({ type: String }) primaryColor = '';
  @property({ type: String }) dropdownState: DropdownState = 'close';
  @property({ type: Number }) width = 0;
  @property({ type: Boolean }) hasAdminAccess = false;
  @property({ attribute: false }) dropdownArrow: TemplateResult =
    dropdownClosed;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) returnUrl = '';
  @property({ type: Boolean }) autoRenew = false;
  @property({ type: String }) loanRenewType = '';
  @property({ type: Boolean }) autoReturn = false;
  @property({ type: Boolean }) returnNow = false;

  initialButton = false;
  title = '';
  loaderIcon = 'https://archive.org/upload/images/tree/loading.gif';

  updated(changed: PropertyValues<this>): void {
    if (
      (changed.has('width') || changed.has('disabled')) &&
      this.isBelowTabletContainer
    ) {
      this.resetActions();
    }

    if (changed.has('autoRenew') && this.autoRenew) {
      this.dispatchLoanEvent('autoRenew', { renewType: this.loanRenewType });
    }

    const requestingAutoreturn = changed.has('autoReturn') && this.autoReturn;
    if (requestingAutoreturn) {
      this.dispatchLoanEvent('autoReturn');
    }

    if (changed.has('returnNow') && this.returnNow && !requestingAutoreturn) {
      this.dispatchLoanEvent('returnNow', { borrowType: 'browse' });
    }
  }

  /**
   * Re-emit a loan-state event on the host so `ActionsHandler` can fire
   * the corresponding API call. Used for autoRenew / autoReturn / returnNow.
   */
  dispatchLoanEvent(event: string, detail?: Record<string, unknown>): void {
    this.dispatchEvent(new CustomEvent(event, { detail }));
  }

  /** Merge primaryActions and secondaryActions into the dropdown list. */
  resetActions(): void {
    if (this.primaryActions.length) {
      this.primaryActions = this.primaryActions.concat(this.secondaryActions);

      this.primaryColor = this.primaryActions[0].className;

      if (this.hasAdminAccess) {
        this.sortActionButtonOrder();
      }

      this.secondaryActions = [];
    }
  }

  /** Re-sort primaryActions so admin-related items show first in mobile mode. */
  sortActionButtonOrder(): void {
    let fromIndex = 1;
    const toIndex = 0;
    if (this.secondaryActions.length === 2) {
      fromIndex = 2;
    }
    fromIndex = this.primaryActions.length - fromIndex;

    const element = this.primaryActions[fromIndex];
    const current = this.primaryActions;

    current.splice(fromIndex, 1);
    current.splice(toIndex, 0, element);

    this.primaryActions = current;
  }

  render(): TemplateResult {
    return html`
      <div
        class="${classMap({
          actiongroup: true,
          disabled: this.disabled,
        })}"
      >
        ${this.getLoaderIcon}
        <section class="action-buttons primary">
          ${this.renderPrimaryActions}
        </section>
        <section class="action-buttons secondary">
          ${this.renderSecondaryActions}
        </section>
      </div>
    `;
  }

  get renderPrimaryActions(): TemplateResult | typeof nothing {
    if (this.primaryActions.length === 0) return nothing;

    if (this.dropdownState === 'close') {
      this.primaryColor = this.primaryActions[0].className;
    }

    if (this.primaryActions.length === 1) {
      return this.initialActionTemplate;
    }

    return html`
      ${this.initialActionTemplate}
      <button
        class="ia-button ${this.primaryColor} down-arrow"
        @click=${this.toggleDropdown}
      >
        ${this.dropdownArrow}
      </button>

      <ul class="dropdown-content ${this.dropdownState}">
        ${this.getPrimaryItems}
      </ul>
    `;
  }

  get renderSecondaryActions(): typeof nothing | Array<TemplateResult> {
    if (!this.secondaryActions.length) return nothing;

    return this.secondaryActions.map(action => this.renderActionButton(action));
  }

  /** Render a secondary action as a link (admin, print-disability, purchase). */
  renderActionLink(
    action: ActionButtonConfig,
    initialButton = false,
  ): TemplateResult {
    return html`<span class="${this.getDeviceType} ${action.className}">
      <a
        class="ia-button ${action.className} ${initialButton ? 'initial' : ''}"
        href="${(action.url as string) ?? ''}"
        target=${(action.target as string) ?? ''}
        @click=${() => {
          this.clickHandler(
            action.id ?? '',
            action.analyticsEvent,
            (action.borrowType as string) ?? '',
          );
        }}
      >
        ${action.id === 'purchaseBook' ? purchaseIcon : ''} ${action.text}
        <small>${(action.subText as string) ?? ''}</small>
      </a>
    </span>`;
  }

  /** Render a primary action as a button (browse, borrow, join waitlist). */
  renderActionButton(
    action: ActionButtonConfig,
    initialButton = false,
  ): TemplateResult {
    if (action.url) return this.renderActionLink(action, initialButton);
    const { analyticsEvent } = action;
    return html`<button
      class="ia-button ${action.className} ${initialButton ? 'initial' : ''}"
      @click=${() => {
        this.clickHandler(
          action.id ?? '',
          analyticsEvent,
          (action.borrowType as string) ?? '',
        );
      }}
    >
      ${action.text}
    </button>`;
  }

  /**
   * Dispatch the action's click event with analytics payload.
   * @fires CollapsibleActionGroup#{eventName}
   */
  clickHandler(
    eventName: string,
    gaEvent?: AnalyticsEventPayload,
    borrowType = '',
  ): void {
    this.dropdownState = 'close';
    this.dropdownArrow = dropdownClosed;

    if (!gaEvent || !eventName) return;
    const { category, action } = gaEvent;
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: {
          event: { category, action },
          borrowType,
        },
      }),
    );
  }

  /** First primary action, rendered just before the dropdown chevron. */
  get initialActionTemplate(): TemplateResult {
    this.initialButton = false;
    if (this.primaryActions.length > 1) {
      this.initialButton = true;
    }
    return this.renderActionButton(this.primaryActions[0], this.initialButton);
  }

  get getPrimaryItems(): Array<TemplateResult> {
    return this.primaryActions
      .slice(1)
      .map(
        action =>
          html`<li>${this.renderActionButton(action, this.initialButton)}</li>`,
      );
  }

  /** Loader spinner shown while a lending action is in-flight. */
  get getLoaderIcon(): TemplateResult {
    return html`<img
      class="${classMap({
        actionloader: true,
        disabled: this.disabled,
      })}"
      alt=""
      src="${this.loaderIcon}"
    />`;
  }

  /** Whether the host is below the tablet breakpoint. */
  get isBelowTabletContainer(): boolean {
    return this.width <= tabletContainerWidth;
  }

  /** mobile / desktop classification based on container width */
  get getDeviceType(): 'mobile' | 'desktop' {
    return this.isBelowTabletContainer ? 'mobile' : 'desktop';
  }

  /** toggle the dropdown + chevron icon */
  toggleDropdown(): void {
    if (this.dropdownState === 'open') {
      this.dropdownState = 'close';
      this.dropdownArrow = dropdownClosed;
      this.primaryColor = this.primaryActions[0].className;
    } else {
      this.dropdownState = 'open';
      this.dropdownArrow = dropdownOpened;
      this.primaryColor = 'dark';
    }
  }

  static styles = [buttonBaseStyle, CollapsibleActionGroupStyle];
}
