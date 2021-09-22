import { css } from 'lit-element';

export default css`
  .ia-button {
    min-height: 3rem;
    border: none;
    outline: none;
    cursor: pointer;
    color: #fff;
    line-height: normal;
    border-radius: 0.4rem;
    text-align: center;
    vertical-align: middle;
    font-size: 1.4rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    display: inline-block;
    padding: 0.6rem 1.2rem;
    border: 1px solid transparent;
    white-space: nowrap;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .ia-button:disabled,
  .ia-button.disabled {
    cursor: not-allowed;
    background-color: var(--primaryDisableCTAFill);
    border: 1px solid var(--secondaryCTABorder);
    color: var(--primaryTextColor);
  }
  .ia-button.transparent {
    background-color: transparent;
  }

  .ia-button.slim {
    padding: 0;
  }
  .ia-button.primary {
    background-color: #194880;
    border-color: #c5d1df;
  }
  .ia-button.primary:hover {
    background-color: rgba(var(--primaryCTAFillRGB), 0.9);
  }
  .ia-button.primary:focus {
    background-color: rgba(var(--primaryCTAFillRGB), 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(var(--primaryCTAFillRGB), 0.7);
  }
  .ia-button.dark {
    color: #fff;
    background-color: #333;
    border-color: #979797;
  }
  .ia-button.danger {
    color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a;
  }
  .ia-button.cancel {
    background-color: #e51c26;
    border-color: #f8c6c8;
  }
  .ia-button.cancel:hover {
    background-color: rgba(var(--primaryErrorCTAFillRGB), 0.9);
  }
  .ia-button.cancel:focus {
    background-color: rgba(var(--primaryErrorCTAFillRGB), 0.8);
  }
  .ia-button.cancel:active {
    background-color: rgba(var(--primaryErrorCTAFillRGB), 0.7);
  }
`;
