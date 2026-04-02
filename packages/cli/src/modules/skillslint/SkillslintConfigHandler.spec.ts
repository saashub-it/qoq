import { describe, it, expect } from 'vitest';

import { SkillslintConfigHandler } from './SkillslintConfigHandler';

import { dummyModulesConfig } from '@/__tests__/common';

describe('SkillslintConfigHandler', () => {
  const configHandler = new SkillslintConfigHandler(dummyModulesConfig, {});

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
        modules: {},
        srcPath: '',
      });
    });
  });
});
