# @saashub/qoq-eslint-v9-js-react

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/saashub-it/qoq/main.yml) ![NPM Version](https://img.shields.io/npm/v/%40saashub%2Fqoq-eslint-v9-js-react)
![NPM Type Definitions](https://img.shields.io/npm/types/%40saashub%2Fqoq-eslint-v9-js-react) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40saashub%2Fqoq-eslint-v9-js-react) ![NPM License](https://img.shields.io/npm/l/%40saashub%2Fqoq-eslint-v9-js-react)

## Rationale

Beign tired of setting up [Eslint](https://www.npmjs.com/package/eslint) all over again for new projects on top of v9 [flatConfig](https://eslint.org/docs/latest/use/configure/configuration-files) I've created some base template for different setups (check all [@saashub/qoq-eslint-v9-\* packages](https://www.npmjs.com/search?q=%40saashub%2Fqoq-eslint-v9-)). Configs inherit from base ones and includes only necessary packages. Rules are configured from years of development experience and can be used without any tweaks or as base to Your own setup.

## Install

    npm install @saashub/qoq-eslint-v9-js-react

## Usage

Package exports both CommonJS and ES modules code just import it in Your eslint config file.

### For CommonJS

```js
const jsBaseConfig = require("@saashub/qoq-eslint-v9-js-react/baseConfig");

module.exports = [
  {
    ...jsBaseConfig,
    files: [...]
  }
]
```

### For ES modules

```js
import jsBaseConfig from '@saashub/qoq-eslint-v9-js-react/baseConfig';

export default [
  {
    ...jsBaseConfig,
    files: [...]
  }
];
```
