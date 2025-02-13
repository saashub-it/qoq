# @saashub/qoq-knip

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/saashub-it/qoq/main.yml) [![codecov](https://codecov.io/gh/saashub-it/qoq/graph/badge.svg?flag=knip&token=PQ1XAQQ257)](https://codecov.io/gh/saashub-it/qoq/flags/knip) ![NPM Version](https://img.shields.io/npm/v/%40saashub%2Fqoq-knip)
![NPM Type Definitions](https://img.shields.io/npm/types/%40saashub%2Fqoq-knip) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40saashub%2Fqoq-knip) ![NPM License](https://img.shields.io/npm/l/%40saashub%2Fqoq-knip)

## Rationale

Tired of setting up [Knip](https://www.npmjs.com/package/knip) from scratch for every new project? We created a base template to simplify the process.

The configuration is opinionated, shaped by years of development experience, and can be used as a complete setup without any tweaks or as a foundation for your own configurations.

## Install

    npm install @saashub/qoq-knip

## Usage

Package exports both CommonJS and ESM code just import it in Your knip config file.

### For CommonJS

```js
const { jsConfig, jsReactConfig, tsConfig, tsReactConfig } = require('@saashub/qoq-knip');

module.exports = jsConfig;
```

### For ESM

```js
import { jsConfig, jsReactConfig, tsConfig, tsReactConfig } from '@saashub/qoq-knip';

export default jsConfig;
```

### Last but not least

_Feel free to join us, please read [General Contributing Guidelines](https://github.com/saashub-it/qoq/blob/master/.github/CONTRIBUTING.md)_
