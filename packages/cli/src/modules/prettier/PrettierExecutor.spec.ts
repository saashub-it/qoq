import { describe, it, expect } from 'vitest';
import { PrettierExecutor } from './PrettierExecutor';
import { dummyModulesConfig } from '@/__tests__/common';

describe('PrettierExecutor', () => {
  const executor = new PrettierExecutor(dummyModulesConfig);

  describe('getName', () => {
    it('should return the capitalized command name', () => {
      expect(executor.getName()).toBe('Prettier');
    });
  });
});
