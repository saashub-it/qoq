import { EModulesEslint, TQoQEslint } from '../eslint/types';
import { EModulesJscpd, TJscpdFormat } from '../jscpd/types';
import { EModulesKnip } from '../knip/types';
import { EModulesPrettier, TAvaliablePrettierPackages } from '../prettier/types';

export type TModulesWithConfig = Record<
  EModulesPrettier & EModulesJscpd & EModulesEslint & EModulesKnip,
  boolean | object
>;
export type TModulesWithConfigPromise = Promise<TModulesWithConfig>;
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface QoqConfig {
  srcPath?: string;
  prettier?: {
    config: TAvaliablePrettierPackages;
    sources?: string[];
  };
  eslint?: TQoQEslint;
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
