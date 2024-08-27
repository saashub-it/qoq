import { omitRules } from '@saashub/qoq-eslint-v9-js/tools';
import * as importPlugin from 'eslint-plugin-import';
import jsVitestBaseConfig from '@saashub/qoq-eslint-v9-js-vitest/baseConfig';
import tsBaseConfig from '@saashub/qoq-eslint-v9-ts/baseConfig';

import merge from 'lodash/merge.js';

import type { Linter } from 'eslint';

const config = merge(
  {},
  omitRules(jsVitestBaseConfig, Object.keys(importPlugin.configs.recommended.rules)),
  tsBaseConfig,
  {
    name: '@saashub/qoq-eslint-v9-ts-vitest',
    rules: {
      'sonarjs/no-duplicate-string': 0,
    },
  }
) as unknown as Linter.Config;

export default config;
