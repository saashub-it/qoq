import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import merge from 'lodash/merge.js';

import baseConfig from './baseConfig';

const filesExtensions = ['js', 'ts'];

export const getEslintConfig: (
  srcPath?: string,
  files?: string[],
  ignores?: string[],
  gitignorePath?: string
) => EslintConfig[] = (
  srcPath = 'src',
  files = [`${srcPath}/**/*.{${filesExtensions.join(',')}}`],
  ignores = [`**/*.spec.{${filesExtensions.join(',')}}`, '**/*.d.ts']
) => [
  merge({}, baseConfig, {
    files,
    ignores,
  }),
];

export default getEslintConfig();
