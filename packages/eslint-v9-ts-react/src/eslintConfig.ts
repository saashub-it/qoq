import tsEslintConfig from '@saashub/qoq-eslint-v9-ts/eslintConfig';

import merge from 'lodash/merge.js';

import baseConfig from './baseConfig';

import type { Linter } from 'eslint';

const filesExtensions = ['js', 'ts'];

const eslintConfig = [
  ...tsEslintConfig,
  merge({}, baseConfig, {
    files: [`src/**/*.spec.{${filesExtensions.join(',')}}`],
  }),
] as unknown as Linter.Config;

export default eslintConfig;
