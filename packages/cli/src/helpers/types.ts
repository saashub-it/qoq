import { IModuleEslintConfig } from '@/modules/eslint/types';
import { TJscpdFormat } from '@/modules/jscpd/types';
import { IModulePrettierConfig } from '@/modules/prettier/types';
import { TModuleStylelintConfig } from '@/modules/stylelint/types';

export type TPartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export enum EExitCode {
  OK = 0,
  ERROR = 1,
  EXCEPTION = 2,
}

export enum EConfigType {
  CJS = 'CJS',
  ESM = 'ESM',
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface QoqConfig {
  srcPath?: string;
  prettier?: IModulePrettierConfig;
  eslint?: IModuleEslintConfig[];
  jscpd?: {
    format?: TJscpdFormat[];
    threshold?: number;
    ignore?: string[];
  };
  stylelint?: TModuleStylelintConfig;
  knip?: {
    entry?: string[];
    project?: string[];
    ignore?: string[];
    ignoreDependencies?: string[];
    ignoreBinaries?: string[];
  };
  configPaths?: {
    prettier?: string;
    eslint?: string;
    stylelint?: string;
  };
}
