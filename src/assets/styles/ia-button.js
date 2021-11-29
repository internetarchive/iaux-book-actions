import { css } from 'lit-element';

export default css`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: var(--primaryTextColor, #fff);
    line-height: normal;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 1px solid transparent;
    white-space: nowrap;
    appearance: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.1s ease 0s;
    vertical-align: middle;
    padding: 0 1rem;
    outline-color: var(--primaryTextColor, #fff);
    outline-offset: -4px;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
  }
  .ia-button:is(:focus-visible) {
    outline-style: double;
  }

  .ia-button:disabled {
    cursor: not-allowed;
    background-color: var(--primaryDisableCTAFill, #767676);
    border: 1px solid var(--secondaryCTABorder, #999);
  }
  .ia-button.transparent {
    background-color: transparent;
  }

  .ia-button.warning {
    background-color: #ee8950;
    border-color: #ec7939;
  }

  .ia-button.primary {
    background-color: var(--primaryCTAFill, #194880);
    border-color: #c5d1df;
  }
  .ia-button.primary:is(:hover) {
    background-color: rgba(27, 72, 128, 0.9);
  }
  .ia-button.primary:is(:focus-visible) {
    background-color: rgba(27, 72, 128, 0.8);
  }
  .ia-button.primary:is(:active) {
    background-color: rgba(27, 72, 128, 0.7);
  }

  .ia-button.danger {
    background-color: var(--primaryErrorCTAFill, #e51c26);
    border-color: #d43f3a;
  }
  .ia-button.danger:is(:hover) {
    background-color: rgba(229, 28, 38, 0.9);
  }
  .ia-button.danger:is(:focus-visible) {
    background-color: rgba(229, 28, 38, 0.8);
  }
  .ia-button.danger:is(:active) {
    background-color: rgba(229, 28, 38, 0.7);
  }

  .ia-button.dark {
    background-color: var(--secondaryCTAFill, #333);
    border-color: #979797;
  }
  .ia-button.dark:is(:hover) {
    background-color: rgba(51, 51, 51, 0.9);
  }
  .ia-button.dark:is(:focus-visible) {
    background-color: rgba(51, 51, 51, 0.8);
  }
  .ia-button.dark:is(:active) {
    background-color: rgba(51, 51, 51, 0.7);
  }
`;
