import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { baseConfig as jsJestBaseConfig } from '@saashub/qoq-eslint-v9-js-jest';
import { objectMergeRight } from '@saashub/qoq-utils';
import testingLibrary from 'eslint-plugin-testing-library';

export const rules: EslintConfig['rules'] = {
  'testing-library/prefer-screen-queries': 0,
};

export const baseConfig: EslintConfig = objectMergeRight(jsJestBaseConfig, {
  ...testingLibrary.configs['flat/react'],
  name: '@saashub/qoq-eslint-v9-js-jest-rtl',
  rules,
});
