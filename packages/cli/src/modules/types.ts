import { IModuleEslintConfig } from './eslint/types';
import { IModuleJscpdConfig } from './jscpd/types';
import { IModuleKnipConfig } from './knip/types';
import { IModuleNpmConfig } from './npm/types';
import { IModulePrettierConfig } from './prettier/types';
import { TModuleStylelintConfig } from './stylelint/types';

import { EConfigType } from '@/helpers/types';

export interface IModulesConfig {
  srcPath: string;
  configType: EConfigType;
  configPaths: {
    prettier: string;
    eslint: string;
    stylelint: string;
  };
  workspaces?: string[];
  modules: {
    npm?: IModuleNpmConfig;
    prettier?: IModulePrettierConfig;
    eslint?: IModuleEslintConfig[];
    jscpd?: IModuleJscpdConfig;
    knip?: IModuleKnipConfig;
    stylelint?: TModuleStylelintConfig;
  };
}

export interface IExecuteStagedOptions {
  disableCache?: boolean;
  skipNpm?: boolean;
  skipPrettier?: boolean;
  skipJscpd?: boolean;
  skipKnip?: boolean;
  skipEslint?: boolean;
  warmup?: boolean;
  silent?: boolean;
  configHints?: boolean;
  production?: boolean;
  concurrency?: 'off' | 'auto';
}

export interface IExecuteOptions extends IExecuteStagedOptions {
  init?: boolean;
  fix?: boolean;
}

export interface IExecutorOptions extends IExecuteStagedOptions {
  fix: boolean;
  disableCache: boolean;
  concurrency: 'off' | 'auto';
}
