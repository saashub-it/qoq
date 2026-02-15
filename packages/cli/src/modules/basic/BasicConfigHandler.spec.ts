import { describe, it, expect } from 'vitest';

import { BasicConfigHandler } from './BasicConfigHandler';

import { dummyModulesConfig } from '@/__tests__/common';

describe('BasicConfigHandler', () => {
  const configHandler = new BasicConfigHandler(dummyModulesConfig, {});

  describe('getConfigFromModules', () => {
    it('should return the config for modules', () => {
      expect(configHandler.getConfigFromModules()).toStrictEqual({
        configPaths: {
          eslint: './eslint.config.js',
          prettier: './.prettierrc',
          stylelint: './stylelint.config.js',
        },
        srcPath: '',
      });
    });
  });

  describe('getModulesFromConfig', () => {
    it('should return the modules from config', () => {
      expect(configHandler.getModulesFromConfig()).toStrictEqual({
        configPaths: {
          eslint: './eslint.config.js',
          prettier: './.prettierrc',
          stylelint: './stylelint.config.js',
        },
        configType: 'CJS',
        modules: {},
        srcPath: '',
      });
    });
  });
});
