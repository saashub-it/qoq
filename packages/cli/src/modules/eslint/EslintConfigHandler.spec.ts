import { describe, it, expect } from 'vitest';

import { EslintConfigHandler } from './EslintConfigHandler';

import { dummyModulesConfig } from '@/__tests__/common';

describe('EslintConfigHandler', () => {
  const configHandler = new EslintConfigHandler(dummyModulesConfig, {});

  describe('getConfigFromModules', () => {
    it('should return the config for modules', () => {
      expect(configHandler.getConfigFromModules()).toStrictEqual({
        eslint: undefined,
      });
    });
  });

  describe('getModulesFromConfig', () => {
    it('should return the modules from config', () => {
      expect(configHandler.getModulesFromConfig()).toStrictEqual({
        configType: 'ESM',
        modules: {
          eslint: undefined,
        },
        srcPath: '',
      });
    });
  });
});
