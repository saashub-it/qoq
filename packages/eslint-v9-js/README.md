# @saashub/qoq-eslint-v9-js

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/saashub-it/qoq/main.yml) [![codecov](https://codecov.io/gh/saashub-it/qoq/graph/badge.svg?flag=eslint-v9-js&token=PQ1XAQQ257)](https://codecov.io/gh/saashub-it/qoq/flags/eslint-v9-js) ![NPM Version](https://img.shields.io/npm/v/%40saashub%2Fqoq-eslint-v9-js)
![NPM Type Definitions](https://img.shields.io/npm/types/%40saashub%2Fqoq-eslint-v9-js) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40saashub%2Fqoq-eslint-v9-js) ![NPM License](https://img.shields.io/npm/l/%40saashub%2Fqoq-eslint-v9-js)

## Rationale

Beign tired of setting up [Eslint](https://www.npmjs.com/package/eslint) all over again for new projects, on top of v9 [flatConfig](https://eslint.org/docs/latest/use/configure/configuration-files) , we created some base template for different setups (check all [@saashub/qoq-eslint-v9-\* packages](https://www.npmjs.com/search?q=%40saashub%2Fqoq-eslint-v9-)). Configs inherit from base ones and includes all necessary packages and settings. Rules are opinionated, configured from years of development experience, can be used as full setup without any tweaks or as base to Your own configs.

## Install

    npm install @saashub/qoq-eslint-v9-js

## Usage

Package exports both CommonJS and ESM code, just import it in Your eslint config file.

### For CommonJS

```js
const jsBaseConfig = require("@saashub/qoq-eslint-v9-js/baseConfig");

module.exports = [
  {
    ...jsBaseConfig,
    files: [...]
  }
]
```

### For ESM

```js
import jsBaseConfig from '@saashub/qoq-eslint-v9-js/baseConfig';

export default [
  {
    ...jsBaseConfig,
    files: [...]
  }
];
```
