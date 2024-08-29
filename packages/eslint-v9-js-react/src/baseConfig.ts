import { fixupPluginRules } from '@eslint/compat';
import baseConfig from '@saashub/qoq-eslint-v9-js/baseConfig';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

import merge from 'lodash/merge.js';

import type { Linter } from 'eslint';

const noRestrictedImportsRule = merge([], baseConfig.rules['no-restricted-imports'], [
  'warn',
  {
    paths: [
      ...baseConfig.rules['no-restricted-imports'][1].paths,
      {
        name: 'lodash/debounce',
        message:
          "Since this is a React project please use use-bebounce instead it's newer and tiny.",
      },
      {
        name: 'lodash/fp/debounce',
        message:
          "Since this is a React project please use use-bebounce instead it's newer and tiny.",
      },
    ],
  },
]);

const importOrderRule = merge([], baseConfig.rules['import/order'], [
  'warn',
  {
    pathGroups: [
      {
        pattern: 'react*',
        group: 'builtin',
        position: 'before',
      },
    ],
    pathGroupsExcludedImportTypes: ['react*'],
  },
]);

const config = merge({}, baseConfig, {
  name: '@saashub/qoq-eslint-v9-js-react',
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    react: reactPlugin,
    'react-hooks': fixupPluginRules(reactHooksPlugin),
    'jsx-a11y': jsxA11yPlugin,
  },
  rules: {
    ...reactPlugin.configs.recommended.rules,
    ...reactPlugin.configs['jsx-runtime'].rules,
    ...reactHooksPlugin.configs.recommended.rules,
    ...jsxA11yPlugin.configs.recommended.rules,
    'import/order': importOrderRule,
    'no-restricted-imports': noRestrictedImportsRule,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}) as unknown as Linter.Config;

export default config;
