import { describe, it, expect } from 'vitest';

import { KnipConfigHandler } from './KnipConfigHandler';

import { dummyModulesConfig } from '@/__tests__/common';

describe('KnipConfigHandler', () => {
  const configHandler = new KnipConfigHandler(dummyModulesConfig, {});

  describe('getConfigFromModules', () => {
    it('should return the config for modules', () => {
      expect(configHandler.getConfigFromModules()).toStrictEqual({});
    });
  });

  describe('getModulesFromConfig', () => {
    it('should return the modules from config', () => {
      expect(configHandler.getModulesFromConfig()).toStrictEqual({
        configType: 'ESM',
        modules: {
          knip: {
            entry: ['/{index,cli,main,root}.{js}'],
            ignore: [],
            ignoreDependencies: ['@saashub/qoq-*'],
            ignoreBinaries: [],
            project: ['/**/*.{js}'],
          },
        },
        srcPath: '',
      });
    });
  });
});
