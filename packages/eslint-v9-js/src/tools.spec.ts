import { describe, it, expect } from 'vitest';

import { omitRules } from './tools';

import type { EslintConfig } from './index';

describe('tools', () => {
  it('omitRules', () => {
    const dummyConfig = { rules: { a: 1, b: 2 } } as EslintConfig;

    expect(omitRules(dummyConfig, ['a'])).toEqual({ rules: { b: 2 } });
  });
});
