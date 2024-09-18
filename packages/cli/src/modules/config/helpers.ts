import util from 'util';

import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

import { EModulesEslint } from '../eslint/types';

import { EModulesConfig, QoqConfig } from './types';
import isEqual from 'react-fast-compare';
import { DEFAULT_PRETTIER_SOURCES } from '@/modules/prettier/constants';
import { DEFAULT_JSCPD_THRESHOLD } from '../jscpd/constants';
import { DEFAULT_SRC } from '@/helpers/constants';
import { IModulesConfig } from '../types';
import { omitBasicDefaultsForConfig } from './configure';
import { omitPrettierDefaultsForConfig } from '../prettier/configure';
import { omitEslintDefaultsForConfig } from '../eslint/configure';

export const parseModulesToConfig = (modulesConfig: IModulesConfig): QoqConfig => {
  const config = omitEslintDefaultsForConfig(modulesConfig, omitPrettierDefaultsForConfig(modulesConfig, omitBasicDefaultsForConfig(modulesConfig, {} as QoqConfig)));

  // const config = Object.keys(modules)
  //   .filter((key) => modules[key])
  //   .reduce(
  //     (acc, key) => {
  //       switch (true) {
  //         case key.includes('prettier'): {
  //           if (isEqual(modules[key]?.sources, DEFAULT_PRETTIER_SOURCES)) {
  //             return acc;
  //           }

  //           /**
  //            * @todo add .prettierrc file creation
  //            */

  //           acc['prettier'] = {
  //             ...modules[key],
  //           };

  //           return acc;
  //         }

  //         case key.includes('jscpd'): {
  //           if (modules[key]?.threshold === DEFAULT_JSCPD_THRESHOLD) {
  //             return acc;
  //           }

  //           acc['jscpd'] = {};

  //           return acc;
  //         }

  //         case key.includes('eslint'): {
  //           console.log(modules[key]);
  //           const newValue = merge({}, acc['eslint'] || {}, { [key]: modules[key] });

  //           // if (configType && isEmpty(newValue)) {
  //           //   return acc;
  //           // }

  //           // acc['eslint'] = newValue;

  //           return acc;
  //         }

  //         default:
  //           return acc;
  //       }
  //     },
  //     { srcPath: modules[EModulesConfig.BASIC].srcPath }
  //   );

  // if (configType) {
  //   const exports = util.inspect(config, { showHidden: false, compact: false, depth: null });

  //   writeFileSync(CONFIG_FILE_PATH, formatCode(configType, {}, [], exports));
  // }
  console.log(config);
  return config;
};

export const parseConfigToModules = (config: QoqConfig): IModulesConfig => {
  return {
    srcPath: config.srcPath ?? DEFAULT_SRC,
    modules: {}
  };
};

export const configUsesTs = (modules: IModulesConfig['modules']): boolean => (modules.eslint ?? []).some((config) => config.template === EModulesEslint.ESLINT_V9_TS || config.template === EModulesEslint.ESLINT_V9_TS_JEST || config.template === EModulesEslint.ESLINT_V9_TS_REACT || config.template === EModulesEslint.ESLINT_V9_TS_VITEST);

export const configUsesReact = (modules: IModulesConfig['modules']): boolean => (modules.eslint ?? []).some((config) => config.template === EModulesEslint.ESLINT_V9_JS_REACT || config.template === EModulesEslint.ESLINT_V9_TS_REACT);

export const configUsesTests = (modules: IModulesConfig['modules']): boolean => (modules.eslint ?? []).some((config) => config.template === EModulesEslint.ESLINT_V9_JS_JEST || config.template === EModulesEslint.ESLINT_V9_JS_VITEST || config.template === EModulesEslint.ESLINT_V9_TS_JEST || config.template === EModulesEslint.ESLINT_V9_TS_VITEST);

export const getFilesExtensions = (modules: IModulesConfig['modules']): string[] => {
  switch (true) {
    case configUsesTs(modules) && configUsesReact(modules):
      return ['js', 'jsx', 'ts', 'tsx'];

    case configUsesTs(modules):
      return ['ts'];

    case configUsesReact(modules):
      return ['js', 'jsx'];

    default:
      return ['js'];
  }
};
