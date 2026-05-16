import { dummyModulesConfig } from '__tests__/common.ts';
import { describe, it, expect } from 'vitest';

import { StylelintExecutor } from './StylelintExecutor.ts';

describe('StylelintExecutor', () => {
  const executor = new StylelintExecutor(dummyModulesConfig);

  describe('getName', () => {
    it('should return the capitalized command name', () => {
      expect(executor.getName()).toBe('Stylelint');
    });
  });
});
