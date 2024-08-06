import baseConfig from './baseConfig';

import merge from 'lodash/merge';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const filesExtensions = ['js'];

const eslintConfig: FlatConfig.Config[] = [
  merge({}, baseConfig, {
    files: [`src/**/*.{${filesExtensions.join(',')}}`],
    ignores: [`**/*.spec.{${filesExtensions.join(',')}}`],
  }),
];

export default eslintConfig;
