/* eslint-disable @typescript-eslint/ban-ts-comment */
import jsRules from '@eslint/js';
import importPlugin, { createNodeResolver } from 'eslint-plugin-import-x';
import prettierPlugin from 'eslint-plugin-prettier';
import sonarJsPlugin from 'eslint-plugin-sonarjs';
import globals from 'globals';

import type { ESLint, Linter } from 'eslint';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface EslintConfig extends Linter.Config {
  rules: Linter.RulesRecord;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-object-type
export interface EslintConfigPlugin extends ESLint.Plugin {
  // just re-export
}

export const baseConfig: EslintConfig = {
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
    // @ts-ignore
    'import-x': importPlugin,
    prettier: prettierPlugin,
    sonarjs: sonarJsPlugin,
  },
  rules: {
    ...jsRules.configs.recommended.rules,
    ...importPlugin.configs.recommended.rules,
    'import-x/no-cycle': 'warn',
    'import-x/no-duplicates': 'warn',
    'import-x/no-named-default': 'warn',
    'import-x/order': [
      'warn',
      {
        alphabetize: { order: 'asc', caseInsensitive: true },
        distinctGroup: false,
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
      },
    ],
    ...sonarJsPlugin.configs.recommended.rules,
    'sonarjs/no-alphabetical-sort': 0,
    'sonarjs/no-nested-functions': 0,
    'sonarjs/no-misleading-array-reverse': 0,
    'sonarjs/todo-tag': 0,
    /**
     * low value, high check complexity, turned off since performance
     */
    'sonarjs/deprecation': 0,
    'sonarjs/no-commented-code': 0,
    'sonarjs/arguments-order': 0,
    'sonarjs/updated-loop-counter': 0,
    ...(prettierPlugin.configs?.recommended as ESLint.Plugin).rules,
    'prettier/prettier': 'warn',
    'consistent-return': 'warn',
    curly: ['warn', 'all'],
    eqeqeq: 'warn',
    'max-lines': ['warn', { max: 600, skipBlankLines: true, skipComments: true }],
    'max-lines-per-function': ['warn', { max: 200, skipBlankLines: true, skipComments: true }],
    'no-console': ['warn', { allow: ['error', 'warn', 'time', 'timeEnd'] }],
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
    'import-x/resolver-next': [createNodeResolver()],
  },
};
