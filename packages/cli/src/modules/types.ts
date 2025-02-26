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

export interface IExecuteStagedOptions {
  disableCache?: boolean;
  skipPrettier?: boolean;
  skipJscpd?: boolean;
  skipKnip?: boolean;
  skipEslint?: boolean;
  warmup?: boolean;
  silent?: boolean;
}

export interface IExecuteOptions extends IExecuteStagedOptions {
  init?: boolean;
  fix?: boolean;
}

export interface IExecuteStagedOptions {
  disableCache?: boolean;
  skipPrettier?: boolean;
  skipJscpd?: boolean;
  skipKnip?: boolean;
  skipEslint?: boolean;
  warmup?: boolean;
}

export interface IExecutorOptions extends IExecuteStagedOptions {
  fix: boolean;
  disableCache: boolean;
}
