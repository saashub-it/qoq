import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { baseConfig as jsJestBaseConfig, disabledRules } from '@saashub/qoq-eslint-v9-js-jest';
import { testConfig as tsTestConfig } from '@saashub/qoq-eslint-v9-ts';
import { objectMergeRight } from '@saashub/qoq-utils';
import importPlugin from 'eslint-plugin-import-x';

const { plugins: jsJestBaseConfigPlugins, ...jsJestBaseConfigRest } = jsJestBaseConfig;
const { plugins: tsTestConfigPlugins, ...tsTestConfigRest } = tsTestConfig;

export const baseConfig: EslintConfig = {
  ...objectMergeRight(
    jsJestBaseConfigRest,
    {
      rules: Object.keys(importPlugin.configs.recommended.rules).reduce(
        (acc: Record<string, undefined>, key) => {
          acc[key] = undefined;

          return acc;
        },
        {}
      ) as unknown as EslintConfig['rules'],
    },
    tsTestConfigRest,
    {
      name: '@saashub/qoq-eslint-v9-ts-jest',
      rules: {
        ...disabledRules
      },
    }
  ),
  plugins: { ...jsJestBaseConfigPlugins, ...tsTestConfigPlugins },
};
