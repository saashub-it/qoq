import { describe, it, expect } from 'vitest';

import { omitRules, omitRulesForConfigCollection, addIgnoresToConfigCollection } from './tools';

import type { EslintConfig } from './index';

describe('tools', () => {
  it('omitRules', () => {
    const dummyConfig = { rules: { a: 1, b: 2 } } as EslintConfig;

    expect(omitRules(dummyConfig, ['a'])).toEqual({ rules: { b: 2 } });
  });

  it('omitRulesForConfigCollection', () => {
    const dummyConfigs = [{ rules: { a: 1, b: 2 } }, { rules: { a: 1, c: 2 } }] as EslintConfig[];

    expect(omitRulesForConfigCollection(dummyConfigs, ['a'])).toEqual([
      { rules: { b: 2 } },
      { rules: { c: 2 } },
    ]);
  });

  it('addIgnoresToConfigCollection', () => {
    const dummyConfigs = [
      { rules: { a: 1, b: 2 }, ignores: ['a'] },
      { rules: { a: 1, c: 2 }, ignores: ['b'] },
    ] as EslintConfig[];

    expect(addIgnoresToConfigCollection(dummyConfigs, ['c'])).toEqual([
      { rules: { a: 1, b: 2 }, ignores: ['a', 'c'] },
      { rules: { a: 1, c: 2 }, ignores: ['b', 'c'] },
    ]);
  });
});
