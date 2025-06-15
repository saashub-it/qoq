// eslint-disable-next-line no-restricted-imports
import type { StylelintConfig } from '../../../../stylelint-css/src';

export enum EModulesStylelint {
  STYLELINT_CSS = '@saashub/qoq-stylelint-css',
  STYLELINT_SCSS = '@saashub/qoq-stylelint-scss',
}

interface IModuleStylelintConfig extends StylelintConfig {
  strict: boolean;
}

export interface IModuleStylelintConfigWithTemplate extends IModuleStylelintConfig {
  template: EModulesStylelint;
}

export interface IModuleStylelintConfigWithPattern extends IModuleStylelintConfig {
  pattern: string;
}

export type TModuleStylelintConfig =
  | IModuleStylelintConfigWithTemplate
  | IModuleStylelintConfigWithPattern;
