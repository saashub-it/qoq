import jsVitestBaseComfig from '@saashub/qoq-eslint-v9-js-vitest/baseConfig';
import tsBaseConfig from '@saashub/qoq-eslint-v9-ts/baseConfig';

import merge from 'lodash/merge.js';

import type { Linter } from 'eslint';

const config = merge({}, jsVitestBaseComfig, tsBaseConfig, {
  name: '@saashub/qoq-eslint-v9-ts-vitest',
}) as unknown as Linter.Config;

export default config;
