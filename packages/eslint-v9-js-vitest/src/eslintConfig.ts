import { includeIgnoreFile } from '@eslint/compat';

import merge from 'lodash/merge.js';

import baseConfig from './baseConfig';

import type { Linter } from 'eslint';

const filesExtensions = ['js'];

export const getEslintConfig: (
  srcPath?: string,
  files?: string[],
  ignores?: string[],
  gitignorePath?: string
) => Linter.Config[] = (
  srcPath = 'src',
  files = [`${srcPath}/**/*.spec.{${filesExtensions.join(',')}}`],
  ignores = [],
  gitignorePath
) => {
  const eslintConfig = merge({}, baseConfig, {
    files,
    ignores,
  });

  return gitignorePath ? [includeIgnoreFile(gitignorePath), eslintConfig] : [eslintConfig];
};

export default getEslintConfig();
