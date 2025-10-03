import {
  EslintConfig,
  EslintConfigPlugin,
  baseConfig as jsBaseConfig,
} from '@saashub/qoq-eslint-v9-js';
import { objectMergeRight } from '@saashub/qoq-utils';
import vitestPlugin from '@vitest/eslint-plugin';

export const disabledRules: EslintConfig['rules'] = {
  'sonarjs/no-duplicate-string': 0,
  'vitest/expect-expect': 0,
  /**
   * @todo need to investigate this one
   */
  'vitest/prefer-called-exactly-once-with': 0,
};

const { plugins: jsBaseConfigPlugins, ...jsBaseConfigRest } = jsBaseConfig;

export const baseConfig: EslintConfig = {
  ...objectMergeRight(jsBaseConfigRest, {
    name: '@saashub/qoq-eslint-v9-js-vitest',
    languageOptions: {
      globals: {
        ...vitestPlugin.environments.env.globals,
      },
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
      ...disabledRules,
    },
  }),
  plugins: {
    ...jsBaseConfigPlugins,
    vitest: vitestPlugin as unknown as EslintConfigPlugin,
  },
};
