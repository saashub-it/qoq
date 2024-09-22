import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { omitRules } from '@saashub/qoq-eslint-v9-js/tools';
import { baseConfig as jsJestBaseConfig } from '@saashub/qoq-eslint-v9-js-jest';
import { baseConfig as tsBaseConfig } from '@saashub/qoq-eslint-v9-ts';
import * as importPlugin from 'eslint-plugin-import';
import merge from 'lodash/merge.js';

export const baseConfig: EslintConfig = merge(
  {},
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  omitRules(jsJestBaseConfig, Object.keys(importPlugin.configs.recommended.rules)),
  tsBaseConfig,
  {
    name: '@saashub/qoq-eslint-v9-ts-jest',
    rules: {
      '@typescript-eslint/no-unsafe-argument': 0,
      '@typescript-eslint/no-unsafe-assignment': 0,
      '@typescript-eslint/no-unsafe-member-access': 0,
      'sonarjs/no-duplicate-string': 0,
    },
  }
);

