import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { omitRules } from '@saashub/qoq-eslint-v9-js/tools';
import { baseConfig as jsVitestRtlBaseConfig } from '@saashub/qoq-eslint-v9-js-vitest-rtl';
import { baseConfig as tsBaseConfig } from '@saashub/qoq-eslint-v9-ts-vitest';
import importPlugin from 'eslint-plugin-import-x';
import merge from 'lodash/merge.js';

export const baseConfig: EslintConfig = merge(
  {},

  omitRules(jsVitestRtlBaseConfig, Object.keys(importPlugin.configs.recommended.rules)),
  tsBaseConfig,
  {
    name: '@saashub/qoq-eslint-v9-ts-vitest-rtl',
  }
);
