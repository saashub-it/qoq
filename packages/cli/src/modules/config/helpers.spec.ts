import { describe, expect, it } from 'vitest';

import { EModulesEslint } from '../eslint/types';

import { configUsesTs } from './helpers';
import { QoqConfig } from './types';

describe('configUsesTs', () => {
  it('should return true when config uses TypeScript', () => {
    const config: QoqConfig = {
      eslint: {
        [EModulesEslint.ESLINT_V9_TS]: { files: [], ignores: [] },
      },
    };

    expect(configUsesTs(config)).toBe(true);
  });

  it('should return false when config does not use TypeScript', () => {
    const config: QoqConfig = {
      eslint: {
        [EModulesEslint.ESLINT_V9_JS]: { files: [], ignores: [] },
      },
    };

    expect(configUsesTs(config)).toBe(false);
  });

  it('should return false when config has no eslint property', () => {
    expect(configUsesTs({})).toBe(false);
  });
});
