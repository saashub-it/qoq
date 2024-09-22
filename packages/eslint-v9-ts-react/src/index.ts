import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { omitRules } from '@saashub/qoq-eslint-v9-js/tools';
import { baseConfig as jsReactBaseConfig } from '@saashub/qoq-eslint-v9-js-react';
import { baseConfig as tsBaseConfig } from '@saashub/qoq-eslint-v9-ts';
import * as importPlugin from 'eslint-plugin-import';
import merge from 'lodash/merge.js';

export const baseConfig: EslintConfig = merge(
  {},
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  omitRules(jsReactBaseConfig, Object.keys(importPlugin.configs.recommended.rules)),
  tsBaseConfig,
  {
    name: '@saashub/qoq-eslint-v9-ts-react',
    rules: {
      'sonarjs/function-return-type': 0,
    },
  }
);
