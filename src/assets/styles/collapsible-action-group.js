import { css } from 'lit-element';

export default css`
  .action-buttons,
  .dropdown {
    display: inline-block;
  }
  .dropdown-content {
    position: absolute;
    min-width: 140px;
    margin: 0px 0px 0px -130px;
    padding: 0px;
    border-color: rgb(53, 126, 189);
    background: #2d2d2d;
    border-radius: .4rem;
    border: 1px solid #357ebd;
  }
  .dropdown-content li {
    color: black;
    text-decoration: none;
    list-style: none;
  }
  .dropdown-content li a1 {
    display: block;
    padding: 6px 8px;
    color: #fff;
    text-decoration: none;
  }
  .dropdown-content .ia-button {
    width: 100%;
    text-align: initial;
    background: none;
    border: none;
    box-sizing: border-box;

  }
  .dropdown-content li .ia-button:hover {
    background: #fff;
    color: rgb(45, 45, 45);
  }
  .down-arrow {
    border-left: 1px solid rgb(197, 209, 223);
    margin-left: -9px;
    padding: 6px;
  }
  .hidden {
    display: none;
  }
  .visible {
    display: inline-block;
  }
  .visible-dropdown {
    display: block;
  }
  .btn:hover, .dropdown:hover .btn {
    background-color: #0b7dda;
  }
  .ia-button {
    min-height: initial;
  }
  a {
    text-decoration: none;
  }
  .bwb-purchase {
    background-image: url('https://archive.org/images/icons/better-world-books-white.svg');
    padding-left: 35px;
    background-position: 5px 50%;
    background-size: 24px auto;
    background-repeat: no-repeat;
  }
`;
