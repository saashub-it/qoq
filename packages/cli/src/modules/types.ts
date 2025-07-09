import { IModuleEslintConfig } from './eslint/types';
import { IModuleJscpdConfig } from './jscpd/types';
import { IModuleKnipConfig } from './knip/types';
import { IModulePrettierConfig } from './prettier/types';
import { TModuleStylelintConfig } from './stylelint/types';

import { EConfigType } from '@/helpers/types';

export interface IModulesConfig {
  srcPath: string;
  configType: EConfigType;
  workspaces?: string[];
  modules: {
    prettier?: IModulePrettierConfig;
    eslint?: IModuleEslintConfig[];
    jscpd?: IModuleJscpdConfig;
    knip?: IModuleKnipConfig;
    stylelint?: TModuleStylelintConfig;
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
  configHints?: boolean;
}

export interface IExecuteOptions extends IExecuteStagedOptions {
  init?: boolean;
  fix?: boolean;
}

export interface IExecutorOptions extends IExecuteStagedOptions {
  fix: boolean;
  disableCache: boolean;
}
