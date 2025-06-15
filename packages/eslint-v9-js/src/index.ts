import jsRules from '@eslint/js';
import importPlugin from 'eslint-plugin-import-x';
import prettierPlugin from 'eslint-plugin-prettier';
import sonarJsPlugin from 'eslint-plugin-sonarjs';
import compatPlugin from 'eslint-plugin-compat';
import globals from 'globals';

import type { ESLint, Linter } from 'eslint';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface EslintConfig extends Linter.Config {
  rules: Linter.RulesRecord;
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
    compat: compatPlugin,
  },
  rules: {
    ...jsRules.configs.recommended.rules,
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
    ...sonarJsPlugin.configs.recommended.rules,
    'sonarjs/no-alphabetical-sort': 0,
    'sonarjs/no-misused-promises': 0,
    'sonarjs/no-nested-functions': 0,
    'sonarjs/new-cap': 0,
    'sonarjs/sonar-max-params': 0,
    'sonarjs/no-misleading-array-reverse': 0,
    'sonarjs/todo-tag': 0,
    ...(prettierPlugin.configs?.recommended as ESLint.Plugin).rules,
    'prettier/prettier': 'warn',
    ...compatPlugin.configs['flat/recommended'].rules,
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
};
