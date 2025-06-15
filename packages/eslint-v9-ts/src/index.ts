import { EslintConfig, baseConfig as jsBaseConfig } from '@saashub/qoq-eslint-v9-js';
import { omitRules } from '@saashub/qoq-eslint-v9-js/tools';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import importPlugin, { createNodeResolver } from 'eslint-plugin-import-x';
import merge from 'lodash/merge.js';
import tseslint from 'typescript-eslint';

import type { TSESLint } from '@typescript-eslint/utils';

export const baseConfig: EslintConfig = merge(
  {},

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
      'import-x/resolver-next': [createTypeScriptImportResolver(), createNodeResolver()],
    },
  }
);
