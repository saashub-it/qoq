import jsReactBaseConfig from '@saashub/qoq-eslint-v9-js-react/baseConfig';
import tsBaseConfig from '@saashub/qoq-eslint-v9-ts/baseConfig';

import merge from 'lodash/merge.js';

import type { Linter } from 'eslint';

const config = merge({}, jsReactBaseConfig, tsBaseConfig, {
  name: '@saashub/qoq-eslint-v9-ts-react',
}) as unknown as Linter.Config;

export default config;
