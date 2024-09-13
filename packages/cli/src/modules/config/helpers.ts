import { EModulesEslint } from '../eslint/types';

import { QoqConfig } from './types';

export const configUsesTs = (config: QoqConfig): boolean =>
  !!config.eslint && Object.keys(config.eslint).includes(EModulesEslint.ESLINT_V9_TS);

export const configUsesReact = (config: QoqConfig): boolean =>
  !!config.eslint &&
  (Object.keys(config.eslint).includes(EModulesEslint.ESLINT_V9_JS_REACT) ||
    Object.keys(config.eslint).includes(EModulesEslint.ESLINT_V9_TS_REACT));

export const configUsesTests = (config: QoqConfig): boolean =>
  !!config.eslint &&
  (Object.keys(config.eslint).includes(EModulesEslint.ESLINT_V9_JS_JEST) ||
    Object.keys(config.eslint).includes(EModulesEslint.ESLINT_V9_TS_JEST) ||
    Object.keys(config.eslint).includes(EModulesEslint.ESLINT_V9_JS_VITEST) ||
    Object.keys(config.eslint).includes(EModulesEslint.ESLINT_V9_TS_VITEST));

export const getFilesExtensions = (config: QoqConfig): string[] => {
  switch (true) {
    case configUsesTs(config) && configUsesReact(config):
      return ['js', 'jsx', 'ts', 'tsx'];

    case configUsesTs(config):
      return ['ts'];

    case configUsesReact(config):
      return ['js', 'jsx'];

    default:
      return ['js'];
  }
};
