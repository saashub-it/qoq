import { fixupPluginRules } from '@eslint/compat';
import { EslintConfig, baseConfig } from '@saashub/qoq-eslint-v9-js';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import merge from 'lodash/merge.js';

import type { ESLint } from 'eslint';

const noRestrictedImportsRule = merge([], baseConfig.rules['no-restricted-imports'], [
  'warn',
  {
    paths: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

const config: EslintConfig = merge({}, baseConfig, {
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
    'react-hooks': fixupPluginRules(reactHooksPlugin as ESLint.Plugin),
    'jsx-a11y': jsxA11yPlugin,
  },
  rules: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...reactPlugin.configs.recommended.rules,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...reactPlugin.configs['jsx-runtime'].rules,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...reactHooksPlugin.configs.recommended.rules,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...jsxA11yPlugin.configs.recommended.rules,
    'import/order': importOrderRule,
    'no-restricted-imports': noRestrictedImportsRule,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});

export default config;
