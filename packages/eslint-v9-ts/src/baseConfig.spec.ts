import { ESLint } from 'eslint';
import { describe, it, expect } from 'vitest';

import baseConfig from './baseConfig';

describe('baseConfig', () => {
  it('can constuct Eslint object', () => {
    expect(
      () =>
        new ESLint({
          baseConfig,
        })
    ).not.toThrowError();
  });
});
