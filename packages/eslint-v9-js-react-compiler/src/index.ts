import { EslintConfig } from '@saashub/qoq-eslint-v9-js';
import { baseConfig as jsReactBaseConfig, disabledRules } from '@saashub/qoq-eslint-v9-js-react';
import { objectMergeRight } from '@saashub/qoq-utils';
import reactHooksPlugin from 'eslint-plugin-react-hooks';

export const baseConfig: EslintConfig = {
  ...objectMergeRight(jsReactBaseConfig, {
    name: '@saashub/qoq-eslint-v9-js-react-compiler',
    rules: {
      ...reactHooksPlugin.configs['recommended-latest'].rules,
      ...disabledRules,
    },
  }),
};

export { disabledRules };
