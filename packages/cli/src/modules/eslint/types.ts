import { EslintConfig } from '../../../../eslint-v9-js/src/index';

import { TPartialBy } from '@/helpers/types';

export enum EModulesEslint {
  ESLINT_V9_JS = '@saashub/qoq-eslint-v9-js',
  ESLINT_V9_JS_REACT = '@saashub/qoq-eslint-v9-js-react',
  ESLINT_V9_JS_JEST = '@saashub/qoq-eslint-v9-js-jest',
  ESLINT_V9_JS_VITEST = '@saashub/qoq-eslint-v9-js-vitest',
  ESLINT_V9_JS_VITEST_RTL = '@saashub/qoq-eslint-v9-js-vitest-rtl',
  ESLINT_V9_TS = '@saashub/qoq-eslint-v9-ts',
  ESLINT_V9_TS_REACT = '@saashub/qoq-eslint-v9-ts-react',
  ESLINT_V9_TS_JEST = '@saashub/qoq-eslint-v9-ts-jest',
  ESLINT_V9_TS_VITEST = '@saashub/qoq-eslint-v9-ts-vitest',
  ESLINT_V9_TS_VITEST_RTL = '@saashub/qoq-eslint-v9-ts-vitest-rtl',
}

export interface IModuleEslintConfig extends TPartialBy<EslintConfig, 'rules'> {
  template?: EModulesEslint;
}
