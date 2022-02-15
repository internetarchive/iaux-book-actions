![Build Status](https://github.com/internetarchive/iaux-modal-manager/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/internetarchive/iaux-modal-manager/branch/master/graph/badge.svg)](https://codecov.io/gh/internetarchive/iaux-modal-manager)

# Book Action Button Component for lendable and embedded items

The book action button component build on LitElement with support for custom content and light DOM elements.


![Modal Manager](./assets/modal-screenshot.jpg "Modal Manager Demo")

## Installation
```bash
npm install --save @internetarchive/ia-book-actions
```

## Usage of book-action-bar
```html
<!-- index.html -->
<style>
  html {
    font-size: 10px;
    /* This is to match petabox's base font size */
  }
  body {
    margin: 0;
    text-align: center;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  #demo {
    height: 50px;
  }
  ia-book-actions {
    --white: #fff;
    --black: #000;
    --primaryBGColor: var(--black);
    --secondaryBGColor: #222;
    --tertiaryBGColor: #333;
    --primaryTextColor:  var(--white);
    --primaryCTAFill: #194880;
    --primaryCTABorder: #c5d1df;
    --secondaryCTAFill: #333;
    --secondaryCTABorder: #999;
    --secondaryCTAFillRGB: 51, 51, 51;
    --primaryErrorCTAFill: #e51c26;
    --primaryErrorCTABorder: #f8c6c8;
    --primaryCTAFillRGB: 25, 72, 128;
    --primaryErrorCTAFillRGB: 229, 28, 38;
    --primaryDisableCTAFill: #767676;
  }

  fieldset {
    width: fit-content;
    margin-top: 50px;
  }
  fieldset legend {
    text-align: left;
    font-size: 12px;
  }
  td {
    color: white;
    font-size: 14px;
    border-radius: 5%;
    display: table-cell;
    text-align: initial;
    margin: 5px 0;
    width: max-content;
    display: block;
  }
  label {
    padding: 10px;
    display: block;
    cursor: pointer;
    margin: 2px;
    background: #4e545a;
    border-radius: 10px;
  }
  input[type="radio"], input[type="checkbox"] {
    margin-top: 0;
    vertical-align: middle;
  }

  .initial td {
    float: left;
    margin: 2px;
  }

  body.modal-manager-open {
    overflow: hidden;
  }

  modal-manager {
    display: none;
  }

  modal-manager[mode='open'] {
    display: block;
  }
</style>

<ia-book-actions></ia-book-actions>

<script type="module">
    import '@internetarchive/ia-book-actions.js';
    import { ModalConfig } from '@internetarchive/modal-manager';
    import {
      defaultLendingStatus,
      canBrowseAndBorrow,
    } from '../src/assets/data/lending-get-status-service.js';

    const userid = '@neeraj-archive';
    const identifier = 'naturalhistoryof00unse_4111';
    let bwbPurchaseUrl = 'https://www.betterworldbooks.com/product/detail/cambridge-ancient-hist-v04-0521044863';

    let iaBookActions = document.querySelector('ia-book-actions');

    const modalConfig = new ModalConfig();
    modalConfig.headerColor = '#d9534f';

    // set defaultLendingStatus for unavailable (without borrowables) book
    iaBookActions.userid = userid;
    iaBookActions.identifier = identifier;
    iaBookActions.bookTitle = 'Contemporary Black biography. Volume 39 : profiles from the interContemporary Black biography. Volume 39';
    iaBookActions.lendingStatus = canBrowseAndBorrow;
    iaBookActions.bwbPurchaseUrl = '';
    iaBookActions.barType = ''; // title|action
    iaBookActions.modalConfig = modalConfig;
</script>
```

## Usage of book-action-bar
```html
<!-- along with above properties, assign 'title' to barType pro something like this iaBookActions.barType = 'title' -->
<script type="module">
  iaBookActions.barType = ''; // title|action
</script>
```


### Config Options

All of the config options:

```javascript
let iaBookActions = document.querySelector('ia-book-actions');
const modalConfig = new ModalConfig(); // to show info/error modal 

// set defaultLendingStatus for unavailable (without borrowables) book
iaBookActions.userid = '@jack';
iaBookActions.identifier = 'jack-sparrow';
iaBookActions.bookTitle = 'Contemporary Black biography. Volume 39 : profiles from the interContemporary Black biography. Volume 39';
iaBookActions.lendingStatus = {active_borrows: 0, active_browses: 0}, // complete lendingStatus object
iaBookActions.bwbPurchaseUrl = ''; // BWB purchase URl if any 
iaBookActions.barType = '';
iaBookActions.modalConfig = modalConfig;
```

# Development

## Prerequisite
```bash
yarn install
```

## Start Development Server
```bash
yarn start
```

## Testing
```bash
yarn test
```

## Linting
```bash
yarn lint
```
