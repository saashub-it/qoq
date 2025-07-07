import {
  EslintConfig,
  EslintConfigPlugin,
  baseConfig as jsBaseConfig,
} from '@saashub/qoq-eslint-v9-js';
import { objectMergeRight } from '@saashub/qoq-utils';
import vitestPlugin from '@vitest/eslint-plugin';

export const rules: EslintConfig['rules'] = {
  ...vitestPlugin.configs.recommended.rules,
  'sonarjs/no-duplicate-string': 0,
  'vitest/expect-expect': 0,
};

export const baseConfig: EslintConfig = objectMergeRight<EslintConfig>(jsBaseConfig, {
  name: '@saashub/qoq-eslint-v9-js-vitest',
  languageOptions: {
    globals: {
      ...vitestPlugin.environments.env.globals,
    },
  },
  plugins: {
    vitest: vitestPlugin as unknown as EslintConfigPlugin,
  },
  rules,
});
