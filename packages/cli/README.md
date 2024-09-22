# @saashub/qoq-cli

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/saashub-it/qoq/main.yml) [![codecov](https://codecov.io/gh/saashub-it/qoq/graph/badge.svg?flag=cli&token=PQ1XAQQ257)](https://codecov.io/gh/saashub-it/qoq/flags/cli) ![NPM Version](https://img.shields.io/npm/v/%40saashub%2Fqoq-cli)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/%40saashub%2Fqoq-cli) ![NPM License](https://img.shields.io/npm/l/%40saashub%2Fqoq-cli)

## Rationale

To keep high code quality and simplicity of both CI and git hooks usage of different static code analysis tools we created QoQ CLI. It orchestrates different tools with minimal config to bring run everything You need by 3 simple commands:
* `qoq --check` to check Your code
* `qoq staged` to check staged changes
* `qoq --fix` to fix where possible

## Install

    npm install @saashub/qoq-cli

## Usage

First of all we need to run configure wizard, You can do it intentionally by running:

    qoq --init

But if no config file found, it will ask to create one every time You'll run check or fix. 

## Automatic configuration

Just answer all questions, wizard will provide You with some initial config values, after it's done it will install all necesarry packages from [@saashub/qoq-*]((https://www.npmjs.com/search?q=%40saashub%2Fqoq-)) workspace, and create 3 files in Your project root path:
* `.prettierrc` to support IDE formatting with pre-configured template
* `eslint.config.js` to connect CLI generated eslint config with IDE
* `qoq.config.js` to provide config for CLI

## Manual configuration

When setting things up by Yourself all three files needs to be created manually, 
1. `.prettierrc` with custom config or QoQ templeate eg `"@saashub/qoq-prettier"`
2. `eslint.config.js` with custom config or re-export of QoQ settings in CommonJs

    ```js
    const config = require('@saashub/qoq-cli/bin/eslint.config.js'); 
    
    module.exports = config; 
    ```

    or ESM

    ```js
    import config from '@saashub/qoq-cli/bin/eslint.config.js'; 
    
    export default config; 
    ```

3. `qoq.config.js` with config only for QoQ CLI, params described below

## qoq.config.js

| Property           | Required | Default | Description                                                      |
| ------------------ | -------- | ------- | ---------------------------------------------------------------- |
| `srcPath`          | false    | `./src` | Path to project source files on which analysis will be conducted |
| `prettier.sources` | false    | `[]`    | Array of paths for Prettier formatting                           |