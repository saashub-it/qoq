import baseConfig from '@saashub/qoq-eslint-v9-js/baseConfig';
import { omitRules } from '@saashub/qoq-eslint-v9-js/tools';
import * as importPlugin from 'eslint-plugin-import';
import * as typeScriptParser from '@typescript-eslint/parser';
import typeScriptPlugin from '@typescript-eslint/eslint-plugin';

import merge from 'lodash/merge.js';

import type { Linter } from 'eslint';

const config = merge(
  {},
  omitRules(baseConfig, Object.keys(importPlugin.configs.recommended.rules)),
  {
    name: '@saashub/qoq-eslint-v9-ts',
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
      'no-undef': 0, // from plugin page: "It is safe to disable this rule when using TypeScript because TypeScript's compiler enforces this check
      ...importPlugin.configs.typescript.rules,
      'import/no-cycle': 'warn',
      'import/no-duplicates': 'warn',
      'import/no-named-default': 'warn',
      ...typeScriptPlugin.configs.recommended.rules,
      ...typeScriptPlugin.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/no-unsafe-assignment': 0, // strange rule, turned off for now
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
  }
) as unknown as Linter.Config;

export default config;
