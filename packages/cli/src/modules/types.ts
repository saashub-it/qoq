import { EConfigType } from '@/helpers/types';

import { IModuleEslintConfig } from './eslint/types';
import { IModuleJscpdConfig } from './jscpd/types';
import { IModuleKnipConfig } from './knip/types';
import { IModulePrettierConfig } from './prettier/types';

export interface IModulesConfig {
  srcPath: string;
  configType: EConfigType;
  modules: {
    prettier?: IModulePrettierConfig;
    eslint?: IModuleEslintConfig[];
    jscpd?: IModuleJscpdConfig;
    knip?: IModuleKnipConfig;
  };
}
