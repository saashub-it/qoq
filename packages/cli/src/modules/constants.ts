import { EModulesConfig } from './config/types';
import { EModulesEslint } from './eslint/types';
import { EModulesJscpd } from './jscpd/types';
import { EModulesKnip } from './knip/types';
import { EModulesPrettier } from './prettier/types';
import { TModulesInitial } from './types';

export const allModules: TModulesInitial = {
  [EModulesConfig.BASIC]: false,
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
