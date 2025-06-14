import { describe, it, expect } from 'vitest';

import { StylelintConfigHandler } from './StylelintConfigHandler';

import { dummyModulesConfig } from '@/__tests__/common';

describe('StylelintConfigHandler', () => {
  const configHandler = new StylelintConfigHandler(dummyModulesConfig, {});

  describe('getConfigFromModules', () => {
    it('should return the config for modules', () => {
      expect(configHandler.getConfigFromModules()).toStrictEqual({});
    });
  });

  describe('getModulesFromConfig', () => {
    it('should return the modules from config', () => {
      expect(configHandler.getModulesFromConfig()).toStrictEqual({
        configType: 'ESM',
        modules: {},
        srcPath: '',
      });
    });
  });
});
