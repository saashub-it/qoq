import { EslintConfig, baseConfig } from '@saashub/qoq-eslint-v9-js';
import vitestPlugin from 'eslint-plugin-vitest';
import merge from 'lodash/merge.js';

const config: EslintConfig = merge({}, baseConfig, {
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
});

export default config;
