import { describe, it, expect, vi } from 'vitest';
import { BasicConfigHandler } from './BasicConfigHandler';
import { dummyModulesConfig } from '@/__tests__/common';

describe('BasicConfigHandler', () => {
  const configHandler = new BasicConfigHandler(dummyModulesConfig, {});

  describe('getConfigFromModules', () => {
    it('should return the config for modules', () => {
      expect(configHandler.getConfigFromModules()).toStrictEqual({
        srcPath: '',
      });
    });
  });

  describe('getModulesFromConfig', () => {
    it('should return the modules from config', () => {
      expect(configHandler.getModulesFromConfig()).toStrictEqual({
        configType: 'CJS',
        modules: {},
        srcPath: '',
      });
    });
  });
});
