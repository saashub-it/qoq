import { TQoQEslint } from '../eslint/types';
import { TJscpdFormat } from '../jscpd/types';
import { TAvaliablePrettierPackages } from '../prettier/types';
import { IModuleEslintConfig, IModulePrettierConfig } from '../types';

export enum EModulesConfig {
  BASIC = 'BASIC',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface QoqConfig {
  srcPath?: string;
  prettier?: IModulePrettierConfig;
  eslint: IModuleEslintConfig[];
  jscpd?: {
    format?: TJscpdFormat[];
    threshold?: number;
    ignore?: string[];
  };
  knip?: {
    entry?: string[];
    project?: string[];
    ignore?: string[];
    ignoreDependencies?: string[];
  };
}

export type TQoqConfigPromise = Promise<QoqConfig>;
