import { includeIgnoreFile } from '@eslint/compat';
import baseConfig from './baseConfig';

import merge from 'lodash/merge.js';

import type { Linter } from 'eslint';

const filesExtensions = ['js', 'ts'];

export const getEslintConfig: (
  srcPath?: string,
  files?: string[],
  ignores?: string[],
  gitignorePath?: string
) => Linter.Config[] = (
  srcPath = 'src',
  files = [`${srcPath}/**/*.{${filesExtensions.join(',')}}`],
  ignores = [`**/*.spec.{${filesExtensions.join(',')}}`, '**/*.d.ts'],
  gitignorePath
) => {
  const eslintConfig = merge({}, baseConfig, {
    files,
    ignores,
  });

  return gitignorePath ? [includeIgnoreFile(gitignorePath), eslintConfig] : [eslintConfig];
};

export default getEslintConfig();
