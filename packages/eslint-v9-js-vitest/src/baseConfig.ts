import baseConfig from '@saashub/qoq-eslint-v9-js/baseConfig';
import vitestPlugin from 'eslint-plugin-vitest';

import merge from 'lodash/merge.js';

import type { Linter } from 'eslint';

const config = merge({}, baseConfig, {
  name: '@saashub/qoq-eslint-v9-js-vitest',
  languageOptions: {
    globals: {
      ...vitestPlugin.environments.env.globals,
    },
  },
  plugins: {
    vitest: vitestPlugin,
  },
  rules: {
    ...vitestPlugin.configs.recommended.rules,
    'sonarjs/no-duplicate-string': 0,
    'vitest/expect-expect': 0,
  },
}) as unknown as Linter.Config;

export default config;
