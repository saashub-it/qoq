# @saashub/qoq-cli

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/saashub-it/qoq/main.yml) [![codecov](https://codecov.io/gh/saashub-it/qoq/graph/badge.svg?flag=cli&token=PQ1XAQQ257)](https://codecov.io/gh/saashub-it/qoq/flags/cli) ![NPM Version](https://img.shields.io/npm/v/%40saashub%2Fqoq-cli)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40saashub%2Fqoq-cli) ![NPM License](https://img.shields.io/npm/l/%40saashub%2Fqoq-cli)

## Rationale

To keep high code quality and simplicity of both CI and git hooks usage of different static code analysis tools we created QoQ CLI. It orchestrates different tools with minimal config to bring execution of everything You need by 3 simple commands:

- `qoq --check` to check Your code, typically in CI lint step or prepush hook
- `qoq staged` to check staged changes, typically in precommit hook
- `qoq --fix` to fix findings where possible, typically user triggered after hooks and/or CI failure to correct things asap

## Install

    npm install @saashub/qoq-cli

## Usage

First of all we need to run configure wizard, You can do it intentionally by running:

    qoq --init

But if no config file found, it will ask to create one every time You'll run check or fix.

## Automatic configuration

Just answer all questions, wizard will provide You with some initial config values, after it's done it will install all necesarry packages from [@saashub/qoq-\*](<(https://www.npmjs.com/search?q=%40saashub%2Fqoq-)>) workspace, and create 3 files in Your project root path:

- `.prettierrc` to support IDE formatting with pre-configured template
- `eslint.config.js` to connect CLI generated eslint config with IDE
- `qoq.config.js` to provide config for CLI

## Manual configuration

When setting things up by Yourself all three files needs to be created manually,

1. `.prettierrc` with custom config or QoQ templeate eg `"@saashub/qoq-prettier"`
2. `eslint.config.js` with custom config or re-export of QoQ settings in CommonJs

   ```js
   const config = require('@saashub/qoq-cli/bin/eslint.config.cjs');

   module.exports = config;
   ```

   or ESM

   ```js
   import config from '@saashub/qoq-cli/bin/eslint.config.mjs';

   export default config;
   ```

3. `qoq.config.js` with config only for QoQ CLI, params described below

## Configuration object in qoq.config.js

Needs to export an CommonJS or ESM object with shape of:

| Property                  | Required | Default                                                              | Description                                                                                                                                                                                                                                                                                                              |
| ------------------------- | -------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `srcPath`                 | false    | `./src`                                                              | Path to project source files on which analysis will be conducted                                                                                                                                                                                                                                                         |
| `prettier.sources`        | false    | `[]`                                                                 | Array of paths for Prettier formatting                                                                                                                                                                                                                                                                                   |
| `eslint`                  | false    | `[]`                                                                 | Valid v9 [flatConfig](https://eslint.org/docs/latest/use/configure/configuration-files) array, if `template` key exists any [@saashub/qoq-eslint-v9-\* packages](https://www.npmjs.com/search?q=%40saashub%2Fqoq-eslint-v9-) can be used as a baseConfig, remember to install dependency (CLI wizard will do it for You) |
| `jscpd.threshold`         | false    | `2`                                                                  | With this value we can override default [@saashub/qoq-jscpd](https://www.npmjs.com/package/@saashub/qoq-jscpd) threshold config.                                                                                                                                                                                         |
| `jscpd.format`            | false    | `javascript,jsx,typescript,tsx`                                      | With this value we can override default [@saashub/qoq-jscpd](https://www.npmjs.com/package/@saashub/qoq-jscpd) format config.                                                                                                                                                                                            |
| `jscpd.ignore`            | false    | `["**/*.spec.js", "**/*.spec.jsx", "**/*.spec.ts", "**/*.spec.tsx"]` | With this value we can override default [@saashub/qoq-jscpd](https://www.npmjs.com/package/@saashub/qoq-jscpd) ignore config.                                                                                                                                                                                            |
| `knip.entry`              | false    | ``[`${srcPath}/index.{js,jsx,ts,tsx}`]``                             | Default value is calculated based on `srcPath` and `eslint` config                                                                                                                                                                                                                                                       |
| `knip.project`            | false    | ``[`${srcPath}/**/*.{js,jsx,ts,tsx}`]``                              | Default value is calculated based on `srcPath` and `eslint` config                                                                                                                                                                                                                                                       |
| `knip.ignore`             | false    | `['package.json', 'tsconfig.json]`                                   | Default value is calculated based on `srcPath` and `eslint` config                                                                                                                                                                                                                                                       |
| `knip.ignoreDependencies` | false    | `[]`                                                                 | Default don't ignore any dependencies errors                                                                                                                                                                                                                                                                             |

## Avaliable options

CLI has it's own documentation just run `qoq -help` or `qoq -h`.

### Last but not least

_Feel free to join us, please read [General Contributing Guidelines](https://github.com/saashub-it/qoq/blob/master/.github/CONTRIBUTING.md)_

CLI technical documentation can be found [here](./docs/PROJECT.md)
