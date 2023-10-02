import omit from 'lodash/omit';
import merge from 'lodash/merge';
import * as importPlugin from 'eslint-plugin-import';
import typeScriptPlugin from '@typescript-eslint/eslint-plugin';
// @ts-ignore
import * as typeScriptParser from '@typescript-eslint/parser';
import { javaScriptConfig } from './javascript';

const javaScriptConfigWithoutImportRules = merge({}, javaScriptConfig);

javaScriptConfigWithoutImportRules.rules = omit(
  javaScriptConfigWithoutImportRules.rules,
  Object.keys(importPlugin.configs.recommended.rules),
);

export const typeScriptConfig: any = merge(javaScriptConfigWithoutImportRules, {
  languageOptions: {
    parser: typeScriptParser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': typeScriptPlugin,
  },
  rules: {
    ...importPlugin.configs.typescript.rules,
    ...typeScriptPlugin.configs.recommended.rules,
    ...typeScriptPlugin.configs['recommended-requiring-type-checking'].rules,
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'interface',
        prefix: ['I'],
        format: ['PascalCase'],
      },
      {
        selector: 'typeAlias',
        prefix: ['T'],
        format: ['PascalCase'],
      },
      {
        selector: 'enum',
        prefix: ['E'],
        format: ['PascalCase'],
      },
      {
        selector: 'enumMember',
        format: ['UPPER_CASE'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
      },
      {
        selector: ['classProperty', 'classMethod', 'method', 'function'],
        format: ['camelCase'],
      },
      {
        selector: 'parameter',
        leadingUnderscore: 'allow',
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-misused-promises': ['warn', { checksVoidReturn: false }],
    '@typescript-eslint/no-unused-vars': ['warn', { args: 'after-used' }],
    '@typescript-eslint/require-await': 'warn',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
});
