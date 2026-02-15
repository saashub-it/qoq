export interface INpmOutdatedOutputEntry {
  current: string;
  latest: string;
}

export type TNpmOutdatedOutput = Record<
  string,
  INpmOutdatedOutputEntry | INpmOutdatedOutputEntry[]
>;

export enum ENpmWarningType {
  MAJOR = 'MAJOR',
  MINOR = 'MINOR',
  PATCH = 'PATCH',
}

export interface IModuleNpmConfig {
  checkOutdatedEvery: number;
}
