import { EModulesEslint } from '../eslint/types';

import { IModulesConfig } from '../types';

export const configUsesTs = (modules: IModulesConfig['modules']): boolean =>
  (modules.eslint ?? []).some(
    (config) =>
      config.template === EModulesEslint.ESLINT_V9_TS ||
      config.template === EModulesEslint.ESLINT_V9_TS_JEST ||
      config.template === EModulesEslint.ESLINT_V9_TS_REACT ||
      config.template === EModulesEslint.ESLINT_V9_TS_VITEST
  );

export const configUsesReact = (modules: IModulesConfig['modules']): boolean =>
  (modules.eslint ?? []).some(
    (config) =>
      config.template === EModulesEslint.ESLINT_V9_JS_REACT ||
      config.template === EModulesEslint.ESLINT_V9_TS_REACT
  );

export const configUsesTests = (modules: IModulesConfig['modules']): boolean =>
  (modules.eslint ?? []).some(
    (config) =>
      config.template === EModulesEslint.ESLINT_V9_JS_JEST ||
      config.template === EModulesEslint.ESLINT_V9_JS_VITEST ||
      config.template === EModulesEslint.ESLINT_V9_TS_JEST ||
      config.template === EModulesEslint.ESLINT_V9_TS_VITEST
  );

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
