import { EslintConfig } from '@saashub/qoq-eslint-v9-js';

import { EConfigType } from '@/helpers/types';

import { EModulesConfig, QoqConfig } from './config/types';
import { EModulesEslint } from './eslint/types';
import { EModulesJscpd, TJscpdFormat } from './jscpd/types';
import { EModulesKnip } from './knip/types';
import { EModulesPrettier } from './prettier/types';

type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export interface IModulePrettierConfig {
  sources: string[]
}

export interface IModuleEslintConfig extends PartialBy<EslintConfig, 'rules'> {
  template?: EModulesEslint;
}

export interface IModuleJscpdConfig {
  format: string[];
      threshold?: number;
      ignore?: string[];
}

export interface IModuleKnipConfig {
  entry: string[];
    project: string[];
    ignore: string[];
    ignoreDependencies: string[];
}

export interface IModulesConfig {
  srcPath: string;
  configType?: EConfigType;
  modules: {
    prettier?: IModulePrettierConfig
    eslint?: IModuleEslintConfig[];
    jscpd?: IModuleJscpdConfig;
    knip?: IModuleKnipConfig;
  };
}


export type TModulesPromise = Promise<IModulesConfig>;

export type TModuleConfigure = (modules: IModulesConfig) => Promise<void>;
