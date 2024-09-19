export enum EModulesKnip {
  KNIP = '@saashub/qoq-knip',
}

export interface IModuleKnipConfig {
  entry: string[];
  project: string[];
  ignore: string[];
  ignoreDependencies: string[];
}
