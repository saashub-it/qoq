import { omitRules } from '@saashub/qoq-eslint-v9-js/tools';
import * as importPlugin from 'eslint-plugin-import';
import jsReactBaseConfig from '@saashub/qoq-eslint-v9-js-react/baseConfig';
import tsBaseConfig from '@saashub/qoq-eslint-v9-ts/baseConfig';

import merge from 'lodash/merge.js';

import type { Linter } from 'eslint';

const config = merge(
  {},
  omitRules(jsReactBaseConfig, Object.keys(importPlugin.configs.recommended.rules)),
  tsBaseConfig,
  {
    name: '@saashub/qoq-eslint-v9-ts-react',
  }
) as unknown as Linter.Config;

export default config;
