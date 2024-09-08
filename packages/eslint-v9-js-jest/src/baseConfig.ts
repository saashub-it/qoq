import { EslintConfig, baseConfig } from '@saashub/qoq-eslint-v9-js';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';
import merge from 'lodash/merge.js';

const config: EslintConfig = merge({}, baseConfig, {
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...jestPlugin.configs.recommended.rules,
    'sonarjs/no-duplicate-string': 0,
  },
});

export default config;
