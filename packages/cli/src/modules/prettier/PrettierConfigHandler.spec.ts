import { describe, it, expect } from 'vitest';

import { PrettierConfigHandler } from './PrettierConfigHandler';

import { dummyModulesConfig } from '@/__tests__/common';

describe('PrettierConfigHandler', () => {
  const configHandler = new PrettierConfigHandler(dummyModulesConfig, {});

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
          prettier: {
            sources: [''],
          },
        },
        srcPath: '',
      });
    });
  });
});
