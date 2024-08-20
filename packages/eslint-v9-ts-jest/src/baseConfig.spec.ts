import { describe, test, expect } from 'vitest';
import { ESLint } from 'eslint';

import baseConfig from './baseConfig';

describe('baseConfig', () => {
  test('can constuct Eslint object', () => {
    expect(
      () =>
        new ESLint({
          baseConfig,
        })
    ).not.toThrowError();
  });
});
