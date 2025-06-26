import { EslintConfig, baseConfig as jsBaseConfig } from '@saashub/qoq-eslint-v9-js';
import vitestPlugin from '@vitest/eslint-plugin';
import merge from 'lodash/merge.js';

export const rules = {
  ...vitestPlugin.configs.recommended.rules,
  'sonarjs/no-duplicate-string': 0,
  'vitest/expect-expect': 0,
};

export const baseConfig: EslintConfig = merge({}, jsBaseConfig, {
  name: '@saashub/qoq-eslint-v9-js-vitest',
  languageOptions: {
    globals: {
      ...vitestPlugin.environments.env.globals,
    },
  },
  plugins: {
    vitest: vitestPlugin,
  },
  rules,
});
