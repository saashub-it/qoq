import { fixupPluginRules } from '@eslint/compat';
import baseConfig from '@saashub/qoq-eslint-v9-js/baseConfig';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

import merge from 'lodash/merge.js';

import type { Linter } from 'eslint';

const config = merge({}, baseConfig, {
  name: '@saashub/qoq-eslint-v9-js-react',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
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
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}) as unknown as Linter.Config;

export default config;
