import { eslintConfig as jsEslintConfig } from '@saashub/qoq-eslint-v9-ts';

import merge from 'lodash/merge';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';
import baseConfig from './baseConfig';

const filesExtensions = ['js', 'ts'];

const eslintConfig: FlatConfig.Config[] = [
  ...jsEslintConfig,
  merge({}, baseConfig, {
    files: [`src/**/*.spec.{${filesExtensions.join(',')}}`],
  }),
];

export default eslintConfig;