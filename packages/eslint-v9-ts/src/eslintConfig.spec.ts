import { describe, test, expect } from 'vitest';
import { ESLint } from 'eslint';

import eslintConfig from './eslintConfig';

describe('eslintConfig', () => {
  test('can constuct Eslint object', () => {
    expect(
      () =>
        new ESLint({
          baseConfig: eslintConfig,
        })
    ).not.toThrowError();
  });
});
