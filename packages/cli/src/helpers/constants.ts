import { EModulesPrettier, EModulesJscpd, EModulesEslint, TModulesWithConfig } from './types';

export const CONFIG_FILE_PATH = `${process.cwd()}/qoq.config.js`;
export const GITIGNORE_FILE_PATH = `${process.cwd()}/.gitignore`;

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
};

export const defaultModules: TModulesWithConfig = {
  [EModulesPrettier.PRETTIER]: true,
  [EModulesPrettier.PRETTIER_WITH_JSON_SORT]: false,
  [EModulesJscpd.JSCPD]: true,
  // [EModulesJscpd.JSCPD]: false,
  [EModulesEslint.ESLINT_V9_JS]: false,
  [EModulesEslint.ESLINT_V9_JS_REACT]: false,
  [EModulesEslint.ESLINT_V9_JS_JEST]: false,
  [EModulesEslint.ESLINT_V9_JS_VITEST]: false,
  // [EModulesEslint.ESLINT_V9_TS]: false,
  [EModulesEslint.ESLINT_V9_TS]: {
    files: [`src/**/*.{js,jsx,ts,tsx}`],
    ignores: ['**/*.spec.js'],
  },
  [EModulesEslint.ESLINT_V9_TS_REACT]: false,
  [EModulesEslint.ESLINT_V9_TS_JEST]: false,
  [EModulesEslint.ESLINT_V9_TS_VITEST]: false,
};

export const DEFAULT_SRC = './src';
export const DEFAULT_PRETTIER_PACKAGE = EModulesPrettier.PRETTIER;
export const DEFAULT_JSCPD_PACKAGE = EModulesJscpd.JSCPD;
