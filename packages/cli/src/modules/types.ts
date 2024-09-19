import { EslintConfig } from '@saashub/qoq-eslint-v9-js';

import { EConfigType } from '@/helpers/types';

import { EModulesEslint } from './eslint/types';

type TPartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export interface IModulePrettierConfig {
  sources: string[];
}

export interface IModuleEslintConfig extends TPartialBy<EslintConfig, 'rules'> {
  template?: EModulesEslint;
}

export interface IModuleJscpdConfig {
  format: string[];
  threshold: number;
  ignore: string[];
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
    prettier?: IModulePrettierConfig;
    eslint?: IModuleEslintConfig[];
    jscpd?: IModuleJscpdConfig;
    knip?: IModuleKnipConfig;
  };
}

export type TModulesPromise = Promise<IModulesConfig>;

export type TModuleConfigure = (modules: IModulesConfig) => Promise<void>;
