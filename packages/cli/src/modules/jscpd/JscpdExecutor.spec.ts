import { describe, it, expect } from 'vitest';

import { JscpdExecutor } from './JscpdExecutor';

import { dummyModulesConfig } from '@/__tests__/common';

describe('JscpdExecutor', () => {
  const executor = new JscpdExecutor(dummyModulesConfig);

  describe('getName', () => {
    it('should return the capitalized command name', () => {
      expect(executor.getName()).toBe('JSCPD');
    });
  });
});
