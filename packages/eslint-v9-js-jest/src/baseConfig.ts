import jsEslint from '@saashub/qoq-eslint-v9-js';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

import merge from 'lodash/merge';

import type { Linter } from 'eslint';

const config = merge({}, jsEslint.baseConfig, {
  name: '@saashub/qoq-eslint-v9-js-jest',
  languageOptions: {
    globals: {
      ...globals.jest,
    },
  },
  plugins: {
    jest: jestPlugin,
  },
  rules: {
    ...jestPlugin.configs.recommended.rules,
    'sonarjs/no-duplicate-string': 0,
  },
}) as unknown as Linter.Config;

export default config;
