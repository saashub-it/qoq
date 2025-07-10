import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { baseConfig as jsVitestBaseConfig, disabledRules } from '@saashub/qoq-eslint-v9-js-vitest';
import { testConfig as tsTestConfig } from '@saashub/qoq-eslint-v9-ts';
import { objectMergeRight } from '@saashub/qoq-utils';
import importPlugin from 'eslint-plugin-import-x';

const { plugins: jsVitestBaseConfigPlugins, ...jsVitestBaseConfigRest } = jsVitestBaseConfig;
const { plugins: tsTestConfigPlugins, ...tsTestConfigRest } = tsTestConfig;

export const baseConfig: EslintConfig = {
  ...objectMergeRight(
    jsVitestBaseConfigRest,
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
      name: '@saashub/qoq-eslint-v9-ts-vitest',
      rules: {...disabledRules},
      settings: {
        vitest: {
          typecheck: true,
        },
      },
    }
  ),
  plugins: { ...jsVitestBaseConfigPlugins, ...tsTestConfigPlugins },
};
