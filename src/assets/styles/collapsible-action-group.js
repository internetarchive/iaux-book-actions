import { css } from 'lit-element';

export default css`
  .action-buttons {
    display: inline-block;
  }
  .action-buttons .ia-button {
    display: initial;
    height: 3.5rem;
    transition: all 0.1s;
    vertical-align: middle;
    margin: 0px;
  }
  .primary,
  .secondary {
    position: relative;
  }
  .primary .initial {
    margin-right: -4px;
    border-radius: 0.4rem 0 0 0.4rem;
  }
  .secondary .ia-button {
    margin: 0 3px;
  }
  .dropdown-group {
    display: inline-block;
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
    top: 3.5rem;
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
    padding: 0.6rem 1.2rem;
  }
  .dropdown-content li .ia-button:hover {
    background: var(--primaryTextColor);
    color: rgb(45, 45, 45);
  }
  .dropdown-content .purchase:hover svg g {
    fill: black;
  }
  .down-arrow {
    border-radius: 0 0.4rem 0.4rem 0;
    padding: 0 0.6rem;
    margin-left: 0;
    vertical-align: bottom;
  }
  .action-loader {
    vertical-align: middle;
    visibility: hidden;
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

  a {
    text-decoration: none;
  }
  .primary svg {
    vertical-align: middle;
  }
  .dropdown-content .purchase,
  .purchase {
    padding-left: 35px;
    position: relative;
  }
  .purchase svg {
    position: absolute;
    left: 12px;
    top: 20%;
  }
  .unavailable {
    opacity: 0.7;
    pointer-events: none;
  }
`;
