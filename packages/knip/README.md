# @saashub/qoq-knip

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/saashub-it/qoq/main.yml) [![codecov](https://codecov.io/gh/saashub-it/qoq/graph/badge.svg?flag=knip&token=PQ1XAQQ257)](https://codecov.io/gh/saashub-it/qoq/flags/knip) ![NPM Version](https://img.shields.io/npm/v/%40saashub%2Fqoq-knip)
![NPM Type Definitions](https://img.shields.io/npm/types/%40saashub%2Fqoq-knip) ![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40saashub%2Fqoq-knip) ![NPM License](https://img.shields.io/npm/l/%40saashub%2Fqoq-knip)

## Rationale

Beign tired of setting up [Knip](https://www.npmjs.com/package/knip) all over again for new projects, we created some base template. Configs is opinionated, configured from years of development experience, can be used as full setup without any tweaks or as base to Your own configs.

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
