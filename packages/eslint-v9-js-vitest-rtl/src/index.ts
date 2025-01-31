import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { baseConfig as jsVitestBaseConfig } from '@saashub/qoq-eslint-v9-js-vitest';
import testingLibrary from 'eslint-plugin-testing-library';
import merge from 'lodash/merge.js';

export const baseConfig: EslintConfig = merge({}, jsVitestBaseConfig, {
  ...testingLibrary.configs['flat/react'],
  name: '@saashub/qoq-eslint-v9-js-vitest-rtl',
});
