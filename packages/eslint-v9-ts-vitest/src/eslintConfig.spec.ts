import { describe, test, expect } from 'vitest';
import { execSync } from 'child_process';
import { ESLint } from 'eslint';

import { getEslintConfig } from './eslintConfig';

describe('baseConfig', () => {
  test('can constuct Eslint object', () => {
    expect(
      () =>
        new ESLint({
          baseConfig: getEslintConfig(),
        })
    ).not.toThrowError();
  });

  test('can execute Eslint with compiled config', async () => {
    const projectPath = __dirname.replace('/src', '');

    expect(() =>
      execSync(`eslint ${projectPath}/lib/index.cjs -c ${projectPath}/lib/eslintConfig.mjs`)
    ).not.toThrowError();
  });
});
