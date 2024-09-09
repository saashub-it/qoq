import { fixupPluginRules } from '@eslint/compat';
import jsRules from '@eslint/js';
import * as importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import sonarJsPlugin from 'eslint-plugin-sonarjs';
import globals from 'globals';

import type { EslintConfig } from './index';
import type { ESLint } from 'eslint';

const baseConfig: EslintConfig = {
  name: '@saashub/qoq-eslint-v9-js',
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
  plugins: {
    import: fixupPluginRules(importPlugin as ESLint.Plugin),
    prettier: prettierPlugin,
    sonarjs: sonarJsPlugin,
  },
  rules: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...jsRules.configs.recommended.rules,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...importPlugin.configs.recommended.rules,
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
      },
    ],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...sonarJsPlugin.configs.recommended.rules,
    'sonarjs/sonar-no-fallthrough': 0, // due to error in 2.0.2
    'sonarjs/no-alphabetical-sort': 0,
    'sonarjs/no-misused-promises': 0,
    'sonarjs/no-nested-functions': 0,
    'sonarjs/new-cap': 0,
    'sonarjs/sonar-max-params': 0,
    'sonarjs/no-misleading-array-reverse': 0,
    'sonarjs/todo-tag': 0,
    ...(prettierPlugin.configs?.recommended as ESLint.Plugin).rules,
    'prettier/prettier': 'warn',
    'consistent-return': 'warn',
    curly: ['warn', 'all'],
    eqeqeq: 'warn',
    'max-lines': ['warn', { max: 600, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
    'no-console': ['warn', { allow: ['error', 'warn'] }],
    'no-debugger': 'warn',
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
            message: 'Maximum one level back for relative imports, please use path aliases.',
          },
        ],
      },
    ],
    'no-useless-return': 'warn',
  },
  settings: {
    react: {
      version: '16.8',
    },
  },
};

export default baseConfig;
