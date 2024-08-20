import { describe, test, expect } from 'vitest';

import { omitRules, omitRulesForConfigCollection, addIgnoresToConfigCollection } from './tools';

import type { Linter } from 'eslint';

describe('tools', () => {
  test('omitRules', () => {
    const dummyConfig = { rules: { a: 1, b: 2 } } as Linter.Config;

    expect(omitRules(dummyConfig, ['a'])).toEqual({ rules: { b: 2 } });
  });

  test('omitRulesForConfigCollection', () => {
    const dummyConfigs = [{ rules: { a: 1, b: 2 } }, { rules: { a: 1, c: 2 } }] as Linter.Config[];

    expect(omitRulesForConfigCollection(dummyConfigs, ['a'])).toEqual([
      { rules: { b: 2 } },
      { rules: { c: 2 } },
    ]);
  });

  test('addIgnoresToConfigCollection', () => {
    const dummyConfigs = [
      { rules: { a: 1, b: 2 }, ignores: ['a'] },
      { rules: { a: 1, c: 2 }, ignores: ['b'] },
    ] as Linter.Config[];

    expect(addIgnoresToConfigCollection(dummyConfigs, ['c'])).toEqual([
      { rules: { a: 1, b: 2 }, ignores: ['a', 'c'] },
      { rules: { a: 1, c: 2 }, ignores: ['b', 'c'] },
    ]);
  });
});
