export enum EModulesPrettier {
  PRETTIER = '@saashub/qoq-prettier',
  PRETTIER_WITH_JSON_SORT = '@saashub/qoq-prettier-with-json-sort',
}

export interface IModulePrettierConfig {
  sources: string[];
}
