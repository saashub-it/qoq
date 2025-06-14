import { describe, it, expect } from 'vitest';

import { KnipExecutor } from './KnipExecutor';

import { dummyModulesConfig } from '@/__tests__/common';

describe('KnipExecutor', () => {
  const executor = new KnipExecutor(dummyModulesConfig);

  describe('getName', () => {
    it('should return the capitalized command name', () => {
      expect(executor.getName()).toBe('Knip');
    });
  });
});
