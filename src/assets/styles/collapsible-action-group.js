import { css } from 'lit-element';

export default css`
  .action-buttons {
    display: inline-flex;
    align-items: center;
  }
  .action-buttons .ia-button {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    height: 3.5rem;
    transition: all 0.1s ease 0s;
    vertical-align: middle;
    padding: 0 1rem;
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
    text-align: initial;
  }
  .dropdown-group {
    display: inline-block;
  }
  .dropdown-group .dropdown-content {
    position: absolute;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
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
  .ia-button.down-arrow {
    border-radius: 0 0.4rem 0.4rem 0;
    padding: 0 0.6rem;
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
  .secondary .ia-button.purchase {
    padding: 2px 10px 2px 35px;
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .purchase small {
    display: block;
    font-size: 1rem;
  }
  .purchase svg {
    position: absolute;
    left: 10px;
    top: 20%;
  }
  .dropdown-content .purchase {
    padding-left: 35px;
    margin: 0;
  }
  .dropdown-content .purchase small {
    display: initial;
    font-size: 1.4rem;
  }

  .unavailable {
    opacity: 0.7;
    pointer-events: none;
  }
`;
