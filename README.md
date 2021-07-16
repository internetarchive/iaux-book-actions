[![Build Status](https://travis-ci.com/internetarchive/iaux-book-search-results.svg?branch=master)](https://travis-ci.com/internetarchive/iaux-book-search-results)
[![codecov](https://codecov.io/gh/internetarchive/iaux-book-search-results/branch/master/graph/badge.svg)](https://codecov.io/gh/internetarchive/iaux-book-search-results)

# \<ia-book-actions>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation

1. Click the "Use this Template" button in GitHub to create a new repository based on this one.
2. Clone your new repo and update the things below.

## Usage
```html
<script type="module">
  import 'ia-book-actions/ia-book-actions.js';
</script>

<ia-book-actions .query='bristol'></ia-book-actions>
```

Supply the element with an optional array of search results to immediately
render. Each result can have these properties:

```js
{
  title: 'Book title', // The item's title
  cover: '//archive.org/img/cover.jpg', // The item's cover image
  hits: ['Hello {{{world}}}'], // Search results taken from the `matches` property in returned search results
}
```

## Styling

```css
ia-book-actions {
  --primaryTextColor: #fff;
  --activeButtonBg: #282828;
  --searchResultText: #adaedc;
  --searchResultBg: #272958;
  --searchResultBorder: #fff;
}
```

## Linting with ESLint
To scan the project for linting errors, run
```bash
npm run lint
```

## Testing with Karma
To run the suite of karma tests, run
```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
