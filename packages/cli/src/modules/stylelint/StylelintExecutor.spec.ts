import { describe, it, expect } from 'vitest';
import { StylelintExecutor } from './StylelintExecutor';
import { dummyModulesConfig } from '@/__tests__/common';

describe('StylelintExecutor', () => {
  const executor = new StylelintExecutor(dummyModulesConfig);

  describe('getName', () => {
    it('should return the capitalized command name', () => {
      expect(executor.getName()).toBe('Stylelint');
    });
  });
});
