import { EConfigType } from '@/helpers/types';

export const dummyModulesConfig = {
  srcPath: '',
  configType: EConfigType.ESM,
  modules: {},
  configPaths: {
    eslint: './eslint.config.js',
    prettier: './.prettierrc',
    stylelint: './stylelint.config.js',
  },
};
