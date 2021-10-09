import { css } from 'lit-element';

export default css`
  .dropdown,
  .action-buttons {
    display: inline-block;
  }
  .action-buttons .ia-button {
    display: initial;
    height: 3.5rem;
  }
  .primary,
  .secondary {
    position: relative;
  }
  .primary .initial {
    margin-right: -3px;
    border-radius: 0.4rem 0 0 0.4rem;
  }
  .secondary {
    padding: 8px 0;
  }
  .secondary .ia-button {
    margin: 0 3px;
  }
  .dropdown-content {
    position: absolute;
    min-width: 14rem;
    margin: 0;
    padding: 0;
    left: 0;
    background: #2d2d2d;
    border-radius: 0.4rem;
    border: 1px solid var(--primaryCTABorder);
  }
  .dropdown-content li {
    color: var(--primaryBGColor);
    list-style: none;
    height: 3rem;
  }
  .dropdown-content .ia-button {
    background: none;
    border: none;
    box-sizing: border-box;
    display: block;
    width: 100%;
    text-align: left;
    height: 3rem;
    position: relative;
  }
  .dropdown-content li .ia-button:hover {
    background: var(--primaryTextColor);
    color: rgb(45, 45, 45);
  }
  .dropdown-content .purchase:hover svg g {
    fill: black;
  }
  .down-arrow {
    border-radius: 0px 0.4rem 0.4rem 0px;
    width: 20px;
    padding: 0.6rem 0.3rem;
    border-left: 0px;
  }
  .action-loader {
    vertical-align: middle;
  }
  .close {
    display: none;
  }
  .open {
    display: block;
    z-index: 2;
    border-top: 0;
  }
  .visible {
    display: inline-block;
  }
  .btn:hover,
  .dropdown:hover .btn {
    background-color: var(--primaryTextColor);
  }
  .ia-button {
    min-height: initial;
  }
  a {
    text-decoration: none;
  }
  .primary svg {
    vertical-align: middle;
  }
  .purchase {
    padding-left: 35px;
    position: relative;
  }
  .purchase svg {
    position: absolute;
    left: 8px;
    top: 2px;
  }
  .unavailable {
    opacity: 0.7;
    pointer-events: none;
  }
`;
