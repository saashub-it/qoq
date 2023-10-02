import jsRules from '@eslint/js';
import * as compatPlugin from 'eslint-plugin-compat';
import * as importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import * as sonarJsPlugin from 'eslint-plugin-sonarjs';

import type { ESLint } from 'eslint';

export const javaScriptConfig = {
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  plugins: {
    compat: compatPlugin,
    import: importPlugin,
    prettier: prettierPlugin,
    sonarjs: sonarJsPlugin,
  },
  rules: {
    ...jsRules.configs.recommended.rules,
    ...importPlugin.configs.recommended.rules,
    ...sonarJsPlugin.configs.recommended.rules,
    ...compatPlugin.configs.recommended.rules,
    ...(prettierPlugin.configs?.recommended as ESLint.ConfigData).rules,
    'import/no-cycle': 'warn',
    'import/no-named-default': 'warn',
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        distinctGroup: false,
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        // pathGroups: [
        //   {
        //     pattern: 'react*',
        //     group: 'builtin',
        //     position: 'before',
        //   },
        //   {
        //     pattern: '@piggybank/**',
        //     group: 'builtin',
        //   },
        // ],
        'newlines-between': 'always',
        // pathGroupsExcludedImportTypes: ['react*', '@piggybank*'],
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
