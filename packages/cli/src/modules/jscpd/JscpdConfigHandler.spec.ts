import { describe, it, expect } from 'vitest';

import { JscpdConfigHandler } from './JscpdConfigHandler';

import { dummyModulesConfig } from '@/__tests__/common';

describe('JscpdConfigHandler', () => {
  const configHandler = new JscpdConfigHandler(dummyModulesConfig, {});

  describe('getConfigFromModules', () => {
    it('should return the config for modules', () => {
      expect(configHandler.getConfigFromModules()).toStrictEqual({
        jscpd: {
          format: undefined,
        },
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
        configType: 'ESM',
        modules: {
          jscpd: {
            format: ['javascript'],
            ignore: ['**/*.spec.js'],
            threshold: 2,
          },
        },
        srcPath: '',
      });
    });
  });
});
