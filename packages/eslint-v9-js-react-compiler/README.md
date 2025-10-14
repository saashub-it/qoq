# @saashub/qoq-eslint-v9-js-react-compiler

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/saashub-it/qoq/main.yml) ![NPM Version](https://img.shields.io/npm/v/%40saashub%2Fqoq-eslint-v9-js-react)
![NPM Type Definitions](https://img.shields.io/npm/types/%40saashub%2Fqoq-eslint-v9-js-react) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40saashub%2Fqoq-eslint-v9-js-react) ![NPM License](https://img.shields.io/npm/l/%40saashub%2Fqoq-eslint-v9-js-react)

## Rationale

Tired of setting up [ESLint](https://www.npmjs.com/package/eslint) from scratch for every new project? With the introduction of [Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files) in ESLint v9, we created a set of base templates for different setups. Check out all our [@saashub/qoq-eslint-v9-\* packages](https://www.npmjs.com/search?q=%40saashub%2Fqoq-eslint-v9-).

These configurations inherit from base presets and include all necessary packages and settings. The rules are opinionated, shaped by years of development experience, and can be used as a complete setup or as a foundation for your own configurations.

## Install

    npm install @saashub/qoq-eslint-v9-js-react-compiler

## Usage

Package exports both CommonJS and ESM code just import it in Your eslint config file.

### For CommonJS

```js
const jsBaseConfig = require("@saashub/qoq-eslint-v9-js-react-compiler");

module.exports = [
  {
    ...jsBaseConfig,
    files: [...]
  }
]
```

### For ESM

```js
import jsBaseConfig from '@saashub/qoq-eslint-v9-js-react-compiler';

export default [
  {
    ...jsBaseConfig,
    files: [...]
  }
];
```

## Rules preview with ESLint Config Inspector

To preview all rules defined by this config simply run:

    npx -y @saashub/qoq-eslint-v9-js-react-compiler

### Last but not least

_Feel free to join us, please read [General Contributing Guidelines](https://github.com/saashub-it/qoq/blob/master/.github/CONTRIBUTING.md)_

CLI technical documentation can be found [here](../eslint-v9/PROJECT.md)
