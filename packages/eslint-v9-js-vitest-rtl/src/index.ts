import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { baseConfig as jsVitestBaseConfig } from '@saashub/qoq-eslint-v9-js-vitest';
import { objectMergeRight } from '@saashub/qoq-utils';
import testingLibrary from 'eslint-plugin-testing-library';

export const rules: EslintConfig['rules'] = {
  'testing-library/prefer-screen-queries': 0,
};

export const baseConfig: EslintConfig = objectMergeRight(jsVitestBaseConfig, {
  ...testingLibrary.configs['flat/react'],
  name: '@saashub/qoq-eslint-v9-js-vitest-rtl',
  rules,
});
