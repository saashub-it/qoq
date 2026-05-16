import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import {
  baseConfig as jsVitestRtlBaseConfig,
  disabledRules,
} from '@saashub/qoq-eslint-v9-js-vitest-rtl';
import { baseConfig as tsBaseConfig } from '@saashub/qoq-eslint-v9-ts-vitest';
import { objectMergeRight } from '@saashub/qoq-utils';
import importPlugin from 'eslint-plugin-import-x';

const { plugins: jsVitestRtlBaseConfigPlugins, ...jsVitestRtlBaseConfigRest } =
  jsVitestRtlBaseConfig;
const { plugins: tsBaseConfigPlugins, ...tsBaseConfigRest } = tsBaseConfig;

export const baseConfig: EslintConfig = {
  ...objectMergeRight(
    jsVitestRtlBaseConfigRest,
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
      name: '@saashub/qoq-eslint-v9-ts-vitest-rtl',
      rules: { ...disabledRules },
    }
  ),
  plugins: { ...jsVitestRtlBaseConfigPlugins, ...tsBaseConfigPlugins },
};
