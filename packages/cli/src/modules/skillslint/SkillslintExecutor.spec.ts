import { describe, it, expect } from 'vitest';

import { SkillslintExecutor } from './SkillslintExecutor';

import { dummyModulesConfig } from '@/__tests__/common';

describe('SkillslintExecutor', () => {
  const executor = new SkillslintExecutor(dummyModulesConfig);

  describe('getName', () => {
    it('should return the capitalized command name', () => {
      expect(executor.getName()).toBe('Skillslint');
    });
  });
});
