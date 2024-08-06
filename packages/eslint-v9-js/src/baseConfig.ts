import { fixupPluginRules } from '@eslint/compat';
import jsRules from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import sonarJsPlugin from 'eslint-plugin-sonarjs';
import globals from 'globals';

import type { FlatConfig, LooseRuleDefinition } from '@typescript-eslint/utils/ts-eslint';

const baseConfig: FlatConfig.Config = {
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  plugins: {
    import: fixupPluginRules(importPlugin),
    prettier: prettierPlugin,
    sonarjs: sonarJsPlugin,
  },
  rules: {
    ...jsRules.configs.recommended.rules,
    ...importPlugin.configs.recommended.rules,
    ...sonarJsPlugin.configs.recommended.rules,
    ...(prettierPlugin.configs?.recommended as Record<string, LooseRuleDefinition>).rules,
    'import/no-cycle': 'warn',
    'import/no-duplicates': 'warn',
    'import/no-named-default': 'warn',
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        distinctGroup: false,
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        // pathGroups: [
        //   {
        //     pattern: '@nest*',
        //     group: 'builtin',
        //     position: 'before',
        //   },
        // ],
        // 'newlines-between': 'always',
        // pathGroupsExcludedImportTypes: ['@nest*'],
      },
    ],
    'prettier/prettier': 'warn',
    'consistent-return': 'warn',
    curly: ['warn', 'all'],
    eqeqeq: 'warn',
    'max-lines': ['warn', { max: 600, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
    'no-console': ['warn', { allow: ['error', 'warn'] }],
    'no-debugger': 'warn',
    'no-multiple-empty-lines': 'warn',
    'no-param-reassign': ['warn', { props: false }],
    'no-plusplus': 'warn',
    'no-restricted-imports': [
      'warn',
      {
        paths: [
          {
            name: 'lodash',
            message: 'Please use separate import for all lodash functions instead.',
          },
          {
            name: 'lodash/isEqual',
            message: "Please use react-fast-compare since it's a lot faster.",
          },
          {
            name: 'lodash/fp/isEqual',
            message: "Please use react-fast-compare since it's a lot faster.",
          },
        ],
        patterns: [
          {
            group: ['../../*'],
            message: 'Agreed maximum one level back for relative imports.',
          },
        ],
      },
    ],
    'no-useless-return': 'warn',
    'padding-line-between-statements': [
      'warn',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
  },
};

export default baseConfig;
