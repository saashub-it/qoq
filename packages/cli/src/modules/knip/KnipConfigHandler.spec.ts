import { describe, it, expect, vi } from 'vitest';
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
            entry: ['/index.js'],
            ignore: [],
            ignoreDependencies: ['@saashub/qoq-*'],
            project: ['/**/*.js'],
          },
        },
        srcPath: '',
      });
    });
  });
});
