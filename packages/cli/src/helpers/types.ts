export enum EModulesPrettier {
  PRETTIER = '@saashub/qoq-prettier',
  PRETTIER_WITH_JSON_SORT = '@saashub/qoq-prettier-with-json-sort',
}

export enum EModulesJscpd {
  JSCPD = '@saashub/qoq-jscpd',
}

export enum EModulesEslint {
  ESLINT_V9_JS = '@saashub/qoq-eslint-v9-js',
  ESLINT_V9_JS_REACT = '@saashub/qoq-eslint-v9-js-react',
  ESLINT_V9_JS_JEST = '@saashub/qoq-eslint-v9-js-jest',
  ESLINT_V9_JS_VITEST = '@saashub/qoq-eslint-v9-js-vitest',
  ESLINT_V9_TS = '@saashub/qoq-eslint-v9-ts',
  ESLINT_V9_TS_REACT = '@saashub/qoq-eslint-v9-ts-react',
  ESLINT_V9_TS_JEST = '@saashub/qoq-eslint-v9-ts-jest',
  ESLINT_V9_TS_VITEST = '@saashub/qoq-eslint-v9-ts-vitest',
}

export enum EModulesKnip {
  KNIP = '@saashub/qoq-knip',
}

export type TModulesWithConfig = Record<
  EModulesPrettier & EModulesJscpd & EModulesEslint & EModulesKnip,
  boolean | object
>;
export type TModulesWithConfigPromise = Promise<TModulesWithConfig>;

export interface IEslintCommonConfig {
  excludeRules?: string[];
}

export interface IEslintModuleConfig {
  files: string[];
  ignores: string[];
  excludeRules?: string[];
}

type TAvaliablePrettierPackages = `${EModulesPrettier}`;
type TAvaliableEslintPackages = `${EModulesEslint}`;

export type TQoQEslint = Partial<Record<TAvaliableEslintPackages, IEslintModuleConfig>> &
  IEslintCommonConfig;

export type TJscpdFormat = 'javascript' | 'jsx' | 'typescript' | 'tsx';

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

export enum EExitCode {
  OK = 0,
  ERROR = 1,
  EXCEPTION = 2,
}
