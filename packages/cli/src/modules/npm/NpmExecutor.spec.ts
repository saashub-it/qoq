import { describe, it, expect } from 'vitest';

import { NpmExecutor } from './NpmExecutor';

import { dummyModulesConfig } from '@/__tests__/common';

describe('NpmExecutor', () => {
  const executor = new NpmExecutor(dummyModulesConfig);

  describe('getName', () => {
    it('should return the capitalized command name', () => {
      expect(executor.getName()).toBe('NPM');
    });
  });
});
