import jsEslintConfig from '@saashub/qoq-eslint-v9-js/eslintConfig';

import merge from 'lodash/merge';

import baseConfig from './baseConfig';

import type { Linter } from 'eslint';

const filesExtensions = ['js'];

const eslintConfig = [
  ...jsEslintConfig,
  merge({}, baseConfig, {
    files: [`src/**/*.spec.{${filesExtensions.join(',')}}`],
  }),
] as unknown as Linter.Config[];

export default eslintConfig;
