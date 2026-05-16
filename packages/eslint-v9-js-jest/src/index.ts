import { EslintConfig, baseConfig as jsBaseConfig } from '@saashub/qoq-eslint-v9-js';
import { objectMergeRight } from '@saashub/qoq-utils';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';

export const disabledRules: EslintConfig['rules'] = {
  'sonarjs/no-duplicate-string': 0,
};

const { plugins: jsBaseConfigPlugins, ...jsBaseConfigRest } = jsBaseConfig;

export const baseConfig: EslintConfig = {
  ...objectMergeRight(jsBaseConfigRest, {
    name: '@saashub/qoq-eslint-v9-js-jest',
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      ...disabledRules,
    } as EslintConfig['rules'],
  }),
  plugins: {
    ...jsBaseConfigPlugins,
    jest: jestPlugin,
  },
};
