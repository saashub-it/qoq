import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { omitRules } from '@saashub/qoq-eslint-v9-js/tools';
import { baseConfig as jsVitestBaseConfig } from '@saashub/qoq-eslint-v9-js-vitest';
import { testConfig as tsTestConfig } from '@saashub/qoq-eslint-v9-ts';
import importPlugin from 'eslint-plugin-import-x';
import merge from 'lodash/merge.js';

export const baseConfig: EslintConfig = merge(
  {},

  omitRules(jsVitestBaseConfig, Object.keys(importPlugin.configs.recommended.rules)),
  tsTestConfig,
  {
    name: '@saashub/qoq-eslint-v9-ts-vitest',
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  }
);
