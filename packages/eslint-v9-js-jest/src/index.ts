import { EslintConfig, baseConfig as jsBaseConfig } from '@saashub/qoq-eslint-v9-js';
import { objectMergeRight } from '@saashub/qoq-utils';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

export const rules: EslintConfig['rules'] = {
  ...jestPlugin.configs.recommended.rules,
  'sonarjs/no-duplicate-string': 0,
};

export const baseConfig: EslintConfig = objectMergeRight(jsBaseConfig, {
  name: '@saashub/qoq-eslint-v9-js-jest',
  languageOptions: {
    globals: {
      ...globals.jest,
    },
  },
  plugins: {
    jest: jestPlugin,
  },
  rules,
});
