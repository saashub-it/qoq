import { baseConfig } from '@saashub/qoq-eslint-v9-js';
import * as importPlugin from 'eslint-plugin-import';
import typeScriptParser from '@typescript-eslint/parser';
import typeScriptPlugin from '@typescript-eslint/eslint-plugin';

import merge from 'lodash/merge';
import omit from 'lodash/omit';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const javaScriptConfigWithoutImportRules = merge({}, baseConfig);

javaScriptConfigWithoutImportRules.rules = omit(
  javaScriptConfigWithoutImportRules.rules,
  Object.keys(importPlugin.configs.recommended.rules)
);

const config: FlatConfig.Config = merge({}, javaScriptConfigWithoutImportRules, {
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
    ...typeScriptPlugin.configs.recommended.rules,
    ...typeScriptPlugin.configs['recommended-requiring-type-checking'].rules,
    '@typescript-eslint/no-unsafe-assignment': 0, // strange rule, turned off for now
    'no-undef': 0, // from plugin page: "It is safe to disable this rule when using TypeScript because TypeScript's compiler enforces this check
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
        filter: {
          regex: '(_{1}|_{2})',
          match: false,
        },
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

export default config;
