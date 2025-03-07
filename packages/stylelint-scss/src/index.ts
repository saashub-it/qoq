import { baseConfig as baseCssConfig } from '@saashub/qoq-stylelint-css';
import { Config } from 'stylelint';

export const baseConfig: Config = {
  ...baseCssConfig,
  extends: ['stylelint-config-standard-scss', 'stylelint-prettier'],
};
