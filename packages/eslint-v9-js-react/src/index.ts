import { EslintConfig, baseConfig as jsBaseConfig } from '@saashub/qoq-eslint-v9-js';
import compatPlugin from 'eslint-plugin-compat';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import merge from 'lodash/merge.js';

const noRestrictedImportsRule = merge([], jsBaseConfig.rules['no-restricted-imports'], [
  'warn',
  {
    paths: [
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...jsBaseConfig.rules['no-restricted-imports'][1].paths,
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

const importOrderRule = merge([], jsBaseConfig.rules['import-x/order'], [
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

export const baseConfig: EslintConfig = merge({}, jsBaseConfig, {
  name: '@saashub/qoq-eslint-v9-js-react',
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    compat: compatPlugin,
    react: reactPlugin,
    'react-hooks': reactHooksPlugin,
    'react-refresh': reactRefresh,
    'jsx-a11y': jsxA11yPlugin,
  },
  rules: {
    ...compatPlugin.configs['flat/recommended'].rules,
    ...reactPlugin.configs.recommended.rules,
    ...reactPlugin.configs['jsx-runtime'].rules,
    ...reactHooksPlugin.configs.recommended.rules,
    ...reactRefresh.configs.recommended.rules,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ...jsxA11yPlugin.configs.recommended.rules,
    'import-x/order': importOrderRule,
    'no-restricted-imports': noRestrictedImportsRule,
    'react/no-unused-prop-types': 1,
    'sonarjs/function-return-type': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
});
