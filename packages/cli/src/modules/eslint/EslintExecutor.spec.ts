import { describe, it, expect } from 'vitest';
import { EslintExecutor } from './EslintExecutor';
import { dummyModulesConfig } from '@/__tests__/common';

describe('EslintExecutor', () => {
  const executor = new EslintExecutor(dummyModulesConfig);

  describe('getName', () => {
    it('should return the capitalized command name', () => {
      expect(executor.getName()).toBe('Eslint');
    });
  });
});
