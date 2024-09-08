import merge from 'lodash/merge.js';

import baseConfig from './baseConfig';

import type { Linter } from 'eslint';

const filesExtensions = ['js'];

export const getEslintConfig: (
  srcPath?: string,
  files?: string[],
  ignores?: string[]
) => Linter.Config[] = (
  srcPath = 'src',
  files = [`${srcPath}/**/*.{${filesExtensions.join(',')}}`],
  ignores = [`**/*.spec.{${filesExtensions.join(',')}}`]
) => [
  merge({}, baseConfig, {
    files,
    ignores,
  }),
];

export default getEslintConfig();
