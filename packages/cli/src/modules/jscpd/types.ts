export enum EModulesJscpd {
  JSCPD = '@saashub/qoq-jscpd',
}

export type TJscpdFormat = 'javascript' | 'jsx' | 'typescript' | 'tsx';

export interface IModuleJscpdConfig {
  format: string[];
  threshold: number;
  ignore: string[];
}
