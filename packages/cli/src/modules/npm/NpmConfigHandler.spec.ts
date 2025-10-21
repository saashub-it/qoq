import { describe, it, expect } from 'vitest';

import { NpmConfigHandler } from './NpmConfigHandler';

import { dummyModulesConfig } from '@/__tests__/common';

describe('NpmConfigHandler', () => {
  const configHandler = new NpmConfigHandler(dummyModulesConfig, {});

  describe('getConfigFromModules', () => {
    it('should return the config for modules', () => {
      expect(configHandler.getConfigFromModules()).toStrictEqual({});
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
        configType: 'ESM',
        modules: {
          npm: {
            checkOutdatedEvery: 1,
          },
        },
        srcPath: '',
      });
    });
  });
});
