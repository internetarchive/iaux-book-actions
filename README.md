
![Build Status](https://github.com/internetarchive/iaux-book-actions/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/internetarchive/iaux-book-actions/branch/main/graph/badge.svg?token=ZOYRJ2BV9W)](https://codecov.io/gh/internetarchive/iaux-book-actions)

# Internet Archive Book Lending Actions

This WebComponent, built using the [IA Typescript WebComponent Template](https://github.com/internetarchive/iaux-typescript-wc-template), provides support for Bookreader actions for borrowable books on Internet Archive. It extends the [Open WebComponents generator](https://open-wc.org/docs/development/generator/) with Internet Archive-specific features and developer tools.

## Installation
```bash
yarn install --save @internetarchive/ia-book-actions
```

## Local Demo with `web-dev-server`
```bash
yarn start
```
To run a local development server that serves the basic demo located in `index.html`

## Usage of Book Actions
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
</style>

<ia-book-actions></ia-book-actions>

<script type="module">
    import '@internetarchive/ia-book-actions.js';
    import { ModalConfig } from '@internetarchive/modal-manager';
    import {
      defaultLendingStatus,
      canBrowseAndBorrow,
    } from '../src/assets/data/lending-get-status-service.js';

    let iaBookActions = document.querySelector('ia-book-actions');
    iaBookActions.userid = '@neeraj-archive';
    iaBookActions.identifier = 'naturalhistoryof00unse_4111';
    iaBookActions.bookTitle = 'This is test title for any book';
    iaBookActions.lendingStatus = {}; // lendinStatus in json
    iaBookActions.bwbPurchaseUrl = 'https://bwb.com/produce/123';
    iaBookActions.barType = ''; // title|action
</script>
```

![Book Action Bar](./assets/ia-book-action-screen.png "Book Action Bar Demo")

## Usage of Book Title
```html
<!-- along with above properties, set barType to 'title' -->
<script type="module">
  iaBookActions.barType = 'title'; // title|action
</script>
```
![Book Title Bar](./assets/ia-book-title-screen.png "Book Title Bar Demo")

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
