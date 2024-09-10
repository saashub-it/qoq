import { execSync } from 'child_process';

import { ESLint } from 'eslint';
import { describe, it, expect } from 'vitest';

import { getEslintConfig } from './eslintConfig';

describe('baseConfig', () => {
  it('can constuct Eslint object', () => {
    expect(
      () =>
        new ESLint({
          baseConfig: getEslintConfig(),
        })
    ).not.toThrowError();
  });

  it('can execute Eslint with compiled config', () => {
    const projectPath = __dirname.replace('/src', '');

    expect(() =>
      // eslint-disable-next-line sonarjs/os-command
      execSync(`eslint ${projectPath}/lib/index.cjs -c ${projectPath}/lib/eslintConfig.mjs`)
    ).not.toThrowError();
  });
});
