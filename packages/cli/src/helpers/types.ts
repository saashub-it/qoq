import { TModulesWithConfig } from '@/modules/config/types';
import { EModulesEslint } from '@/modules/eslint/types';
import { EModulesJscpd } from '@/modules/jscpd/types';
import { EModulesKnip } from '@/modules/knip/types';
import { EModulesPrettier } from '@/modules/prettier/types';

export enum EExitCode {
  OK = 0,
  ERROR = 1,
  EXCEPTION = 2,
}

export enum EConfigType {
  CJS = 'CJS',
  ESM = 'ESM',
}

export const allModules: TModulesWithConfig = {
  [EModulesPrettier.PRETTIER]: false,
  [EModulesPrettier.PRETTIER_WITH_JSON_SORT]: false,
  [EModulesJscpd.JSCPD]: false,
  [EModulesEslint.ESLINT_V9_JS]: false,
  [EModulesEslint.ESLINT_V9_JS_REACT]: false,
  [EModulesEslint.ESLINT_V9_JS_JEST]: false,
  [EModulesEslint.ESLINT_V9_JS_VITEST]: false,
  [EModulesEslint.ESLINT_V9_TS]: false,
  [EModulesEslint.ESLINT_V9_TS_REACT]: false,
  [EModulesEslint.ESLINT_V9_TS_JEST]: false,
  [EModulesEslint.ESLINT_V9_TS_VITEST]: false,
  [EModulesKnip.KNIP]: false,
};

export const defaultModules: TModulesWithConfig = {
  [EModulesPrettier.PRETTIER]: true,
  [EModulesPrettier.PRETTIER_WITH_JSON_SORT]: false,
  [EModulesJscpd.JSCPD]: true,
  [EModulesEslint.ESLINT_V9_JS]: false,
  [EModulesEslint.ESLINT_V9_JS_REACT]: false,
  [EModulesEslint.ESLINT_V9_JS_JEST]: false,
  [EModulesEslint.ESLINT_V9_JS_VITEST]: false,
  [EModulesEslint.ESLINT_V9_TS]: {
    files: [`src/**/*.{js,jsx,ts,tsx}`],
    ignores: ['**/*.spec.js'],
  },
  [EModulesEslint.ESLINT_V9_TS_REACT]: false,
  [EModulesEslint.ESLINT_V9_TS_JEST]: false,
  [EModulesEslint.ESLINT_V9_TS_VITEST]: false,
  [EModulesKnip.KNIP]: false,
};
