import jsJestBaseComfig from '@saashub/qoq-eslint-v9-js-jest/baseConfig';
import tsBaseConfig from '@saashub/qoq-eslint-v9-ts/baseConfig';

import merge from 'lodash/merge';

import type { Linter } from 'eslint';

const config = merge({}, jsJestBaseComfig, tsBaseConfig, {
  name: '@saashub/qoq-eslint-v9-ts-jest',
  rules: {
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
  },
}) as unknown as Linter.Config;

export default config;
