import { EModules } from './types';

export const CONFIG_FILE_PATH = `${process.cwd()}/qoq.config.js`;

export const defaultModules = {
  [EModules.PRETTIER]: true,
  [EModules.PRETTIER_WITH_JSON_SORT]: false,
  [EModules.JSCPD]: false,
  [EModules.ESLINT_V9_JS]: true,
  [EModules.ESLINT_V9_JS_REACT]: false,
  [EModules.ESLINT_V9_JS_JEST]: false,
  [EModules.ESLINT_V9_JS_VITEST]: false,
  [EModules.ESLINT_V9_TS]: false,
  [EModules.ESLINT_V9_TS_REACT]: false,
  [EModules.ESLINT_V9_TS_JEST]: false,
  [EModules.ESLINT_V9_TS_VITEST]: false,
};
