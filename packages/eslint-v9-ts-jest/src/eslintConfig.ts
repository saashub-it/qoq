import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import merge from 'lodash/merge.js';

import baseConfig from './baseConfig';

const filesExtensions = ['js', 'ts'];

export const getEslintConfig: (
  srcPath?: string,
  files?: string[],
  ignores?: string[]
) => EslintConfig[] = (
  srcPath = 'src',
  files = [`${srcPath}/**/*.spec.{${filesExtensions.join(',')}}`],
  ignores = []
) => [
  merge({}, baseConfig, {
    files,
    ignores,
  }),
];

export default getEslintConfig();
