---
sidebar_position: 2
---

# Getting Started

## Install

```sh
npm install @saashub/qoq-cli
```

or run wizard directly via npx with

```sh
npx -y @saashub/qoq-cli --init
```

## Usage

First of all, if not configured via npx we need to run wizard manually, You can do it intentionally by running:

```sh
qoq --init
```

But if no config file found, it will ask to create one every time You'll run check or fix. It supports monorepo without adding anything, based on `package.json` entry `workspaces`.

## Automatic configuration

Simply answer all the questions, and the wizard will generate initial configuration values for you. Once complete, it will install all necessary packages from the [@saashub/qoq-\*](https://www.npmjs.com/search?q=%40saashub%2Fqoq-) workspace and create three files in your project's root directory:

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

```
"postinstall": "qoq --warmup"
```

We're not adding it to the package on purpose. Often 3rd party libraries with `postinstall` scripts are treated as suspicious due to the fact that You can execute there pretty much everything. Also `pnpm` totally ignores `postinstalls` entry.

## Configuration object in qoq.config.js

Needs to export an CommonJS or ESM [configuration object](/docs/introduction/config).

## Available options

CLI has its own documentation just run `qoq -help` or `qoq -h`.
