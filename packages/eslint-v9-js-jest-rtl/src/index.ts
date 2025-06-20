import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { baseConfig as jsJestBaseConfig } from '@saashub/qoq-eslint-v9-js-jest';
import testingLibrary from 'eslint-plugin-testing-library';
import merge from 'lodash/merge.js';

export const baseConfig: EslintConfig = merge({}, jsJestBaseConfig, {
  ...testingLibrary.configs['flat/react'],
  name: '@saashub/qoq-eslint-v9-js-jest-rtl',
});
