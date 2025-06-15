import { EslintConfig, baseConfig as jsBaseConfig } from '@saashub/qoq-eslint-v9-js';
import { omitRules } from '@saashub/qoq-eslint-v9-js/tools';
import * as importPlugin from 'eslint-plugin-import';
import merge from 'lodash/merge.js';
import tseslint from 'typescript-eslint';
import * as tsResolver from 'eslint-import-resolver-typescript';

import type { TSESLint } from '@typescript-eslint/utils';

export const baseConfig: EslintConfig = merge(
  {},
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  omitRules(jsBaseConfig, Object.keys(importPlugin.configs.recommended.rules)),
  {
    name: '@saashub/qoq-eslint-v9-ts',
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-undef': 0, // from plugin page: "It is safe to disable this rule when using TypeScript because TypeScript's compiler enforces this check
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...importPlugin.configs.typescript.rules,
      'import-x/no-cycle': 'warn',
      'import-x/no-duplicates': 'warn',
      'import-x/no-named-default': 'warn',
      ...(
        (tseslint.plugin.configs as TSESLint.FlatConfig.SharedConfigs)
          .recommended as TSESLint.FlatConfig.Config
      ).rules,
      ...(
        (tseslint.plugin.configs as TSESLint.FlatConfig.SharedConfigs)[
          'recommended-requiring-type-checking'
        ] as TSESLint.FlatConfig.Config
      ).rules,
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
          selector: ['classProperty'],
          modifiers: ['static'],
          format: ['UPPER_CASE'],
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
      'import-x/resolver': {
        resolver: tsResolver,
      },
    },
  }
);
