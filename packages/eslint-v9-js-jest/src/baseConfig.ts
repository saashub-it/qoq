import { baseConfig } from '@saashub/qoq-eslint-v9-js';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

import merge from 'lodash/merge';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const config: FlatConfig.Config = merge({}, baseConfig, {
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
});

export default config;
