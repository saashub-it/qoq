import baseConfig from './baseConfig';

import merge from 'lodash/merge.js';

import type { Linter } from 'eslint';

const filesExtensions = ['js'];

const eslintConfig: Linter.Config[] = [
  merge({}, baseConfig, {
    files: [`src/**/*.{${filesExtensions.join(',')}}`],
    ignores: [`**/*.spec.{${filesExtensions.join(',')}}`],
  }),
];

export default eslintConfig;
