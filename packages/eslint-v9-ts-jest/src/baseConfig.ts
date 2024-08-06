import { baseConfig as jsJestBaseComfig } from '@saashub/qoq-eslint-v9-js-jest';
import { baseConfig as tsBaseConfig } from '@saashub/qoq-eslint-v9-ts';

import merge from 'lodash/merge';

import type { FlatConfig } from '@typescript-eslint/utils/ts-eslint';

const config: FlatConfig.Config = merge({}, jsJestBaseComfig, tsBaseConfig, {
  name: '@saashub/qoq-eslint-v9-ts-jest',
  rules: {
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    '@typescript-eslint/no-unsafe-member-access': 0,
  },
});

export default config;
