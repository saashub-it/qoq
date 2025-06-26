import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { omitRules } from '@saashub/qoq-eslint-v9-js/tools';
import { baseConfig as jsJestBaseConfig, rules } from '@saashub/qoq-eslint-v9-js-jest-rtl';
import { baseConfig as tsBaseConfig } from '@saashub/qoq-eslint-v9-ts-jest';
import importPlugin from 'eslint-plugin-import-x';
import merge from 'lodash/merge.js';

export const baseConfig: EslintConfig = merge(
  {},
  omitRules(jsJestBaseConfig, Object.keys(importPlugin.configs.recommended.rules)),
  tsBaseConfig,
  {
    name: '@saashub/qoq-eslint-v9-ts-jest-rtl',
    rules,
  }
);
