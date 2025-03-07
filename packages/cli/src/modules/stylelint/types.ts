import { StylelintConfig } from '../../../../stylelint-css/src/index';

export enum EModulesStylelint {
  STYLELINT_CSS = '@saashub/qoq-stylelint-css',
  STYLELINT_SCSS = '@saashub/qoq-stylelint-scss',
}

export interface IModuleStylelintConfig extends StylelintConfig {
  strict: boolean;
  template?: EModulesStylelint;
}
