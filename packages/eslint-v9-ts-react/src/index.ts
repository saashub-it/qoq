import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { baseConfig as jsReactBaseConfig, disabledRules } from '@saashub/qoq-eslint-v9-js-react';
import { baseConfig as tsBaseConfig } from '@saashub/qoq-eslint-v9-ts';
import { objectMergeRight } from '@saashub/qoq-utils';
import importPlugin from 'eslint-plugin-import-x';

const { plugins: jsReactBaseConfigPlugins, ...jsReactBaseConfigRest } = jsReactBaseConfig;
const { plugins: tsBaseConfigPlugins, ...tsBaseConfigRest } = tsBaseConfig;

export const baseConfig: EslintConfig = {
  ...objectMergeRight(
    jsReactBaseConfigRest,
    {
      rules: Object.keys(importPlugin.configs.recommended.rules).reduce(
        (acc: Record<string, undefined>, key) => {
          acc[key] = undefined;

          return acc;
        },
        {}
      ) as unknown as EslintConfig['rules'],
    },
    tsBaseConfigRest,
    {
      name: '@saashub/qoq-eslint-v9-ts-react',
      rules: {...disabledRules},
    }
  ),
  plugins: { ...jsReactBaseConfigPlugins, ...tsBaseConfigPlugins },
};
