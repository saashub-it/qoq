# @saashub/qoq-cli

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/saashub-it/qoq/main.yml) [![codecov](https://codecov.io/gh/saashub-it/qoq/graph/badge.svg?flag=cli&token=PQ1XAQQ257)](https://codecov.io/gh/saashub-it/qoq/flags/cli) ![NPM Version](https://img.shields.io/npm/v/%40saashub%2Fqoq-cli)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40saashub%2Fqoq-cli) ![NPM License](https://img.shields.io/npm/l/%40saashub%2Fqoq-cli)

## Rationale

To maintain high code quality and simplify the use of static code analysis tools in both CI and Git hooks, we created **QoQ CLI**. It orchestrates multiple tools with minimal configuration, allowing you to run everything you need with just three simple commands:

- `qoq --check` – Runs a full code check, typically used in the CI lint step or pre-push hook.
- `qoq staged` – Checks only staged changes, typically used in the pre-commit hook.
- `qoq --fix` – Fixes issues where possible, typically triggered manually after hooks or a CI failure to quickly correct problems.

With **QoQ CLI**, keeping your code clean and compliant is easier than ever.


## Install

    npm install @saashub/qoq-cli

## Usage

First of all we need to run configure wizard, You can do it intentionally by running:

    qoq --init

But if no config file found, it will ask to create one every time You'll run check or fix.

## Automatic configuration

Simply answer all the questions, and the wizard will generate initial configuration values for you. Once complete, it will install all necessary packages from the [@saashub/qoq-*](https://www.npmjs.com/search?q=%40saashub%2Fqoq-) workspace and create three files in your project's root directory:

- `.prettierrc` – Supports IDE formatting with a pre-configured template.
- `eslint.config.js` – Connects the CLI-generated ESLint config with your IDE.
- `qoq.config.js` – Provides configuration for the CLI.

With this setup, you’ll be up and running quickly with minimal manual configuration.


## Manual configuration

When setting things up by yourself all three files needs to be created manually,

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

## Important notice to ESLint config

Since QoQ CLI re-creates config for the particular tool on execution You may end up with a situation that created `eslint.config.js` config will try to import a file that doesn't exist yet. The same situation will occur when You checkout a fresh project and install dependencies. To avoid that please modify Your `package.json` file in `scripts` section by adding:

    "postinstall": "qoq --warmup" 

We're not adding it to the package on purpose. Often 3rd party libraries with `postinstall` scripts are treated as suspicious due to the fact that You can execute there pretty much everything. Also `pnpm` totally ignores `postinstalls` entry.

## Configuration object in qoq.config.js

Needs to export an CommonJS or ESM object with shape of:

| Property | Required | Default | Description |
| - | - | - | - |
| `srcPath` | false | `./src` | Path to project source files on which analysis will be conducted |
| `prettier.sources` | false | `[]` | Array of paths for Prettier formatting |
| `eslint` | false | `[]` | Valid v9 [flatConfig](https://eslint.org/docs/latest/use/configure/configuration-files) array, if `template` key exists any [@saashub/qoq-eslint-v9-\* packages](https://www.npmjs.com/search?q=%40saashub%2Fqoq-eslint-v9-) can be used as a baseConfig, remember to install dependency (CLI wizard will do it for You) |
| `jscpd.threshold` | false | `2` | With this value we can override default [@saashub/qoq-jscpd](https://www.npmjs.com/package/@saashub/qoq-jscpd) threshold config. |
| `jscpd.format` | false | `javascript,jsx,typescript,tsx` | With this value we can override default [@saashub/qoq-jscpd](https://www.npmjs.com/package/@saashub/qoq-jscpd) format config. |
| `jscpd.ignore` | false | `["**/*.spec.js", "**/*.spec.jsx", "**/*.spec.ts", "**/*.spec.tsx"]` | With this value we can override default [@saashub/qoq-jscpd](https://www.npmjs.com/package/@saashub/qoq-jscpd) ignore config. |
| `knip.entry` | false | ``[`${srcPath}/index.{js,jsx,ts,tsx}`]`` | Default value is calculated based on `srcPath` and `eslint` config |
| `knip.project` | false | ``[`${srcPath}/**/*.{js,jsx,ts,tsx}`]`` | Default value is calculated based on `srcPath` and `eslint` config |
| `knip.ignore` | false | `['package.json', 'tsconfig.json]` | Default value is calculated based on `srcPath` and `eslint` config |
| `knip.ignoreDependencies` | false | `[]` | Default don't ignore any dependencies errors |

## Avaliable options

CLI has its own documentation just run `qoq -help` or `qoq -h`.

### Last but not least

_Feel free to join us, please read [General Contributing Guidelines](https://github.com/saashub-it/qoq/blob/master/.github/CONTRIBUTING.md)_

CLI technical documentation can be found [here](./docs/PROJECT.md)
