/* ChatGPT generated */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { execute } from './execute';
import { executeEslint } from '../modules/eslint';
import { executeJscpd } from '../modules/jscpd';
import { executePrettier } from '../modules/prettier';
import {
  EModulesPrettier,
  EModulesEslint,
  QoqConfig
} from './types';

vi.mock('../modules/eslint', () => ({
  executeEslint: vi.fn(),
}));

vi.mock('../modules/jscpd', () => ({
  executeJscpd: vi.fn(),
}));

vi.mock('../modules/prettier', () => ({
  executePrettier: vi.fn(),
}));

describe('execute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should execute Prettier, Jscpd, and ESLint when all are configured', async () => {
    const config: QoqConfig = {
      prettier: {
        config: EModulesPrettier.PRETTIER,
        sources: ['src']
      },
      eslint: {
        [EModulesEslint.ESLINT_V9_TS]: {
          files: ['src/**/*.ts'],
          ignores: ['**/*.spec.ts'],
        },
      },
      jscpd: {
        threshold: 50,
      },
    };

    await execute(config);

    expect(executePrettier).toHaveBeenCalledWith(config, false);
    expect(executeJscpd).toHaveBeenCalledWith(config);
    expect(executeEslint).toHaveBeenCalledWith(config, false);
  });

  it('should not execute Prettier if not configured', async () => {
    const config: QoqConfig = {
      prettier: undefined, // Prettier not configured
      eslint: {
        [EModulesEslint.ESLINT_V9_TS]: {
          files: ['src/**/*.ts'],
          ignores: [],
        },
      },
      jscpd: {
        threshold: 50,
      },
    };

    await execute(config);

    expect(executePrettier).not.toHaveBeenCalled();
    expect(executeJscpd).toHaveBeenCalledWith(config);
    expect(executeEslint).toHaveBeenCalledWith(config, false);
  });

  it('should not execute ESLint if not configured', async () => {
    const config: QoqConfig = {
      prettier: {
        config: EModulesPrettier.PRETTIER_WITH_JSON_SORT,
        sources: ['src'],
      },
      eslint: undefined, // ESLint not configured
      jscpd: {
        threshold: 50,
      },
    };

    await execute(config);

    expect(executePrettier).toHaveBeenCalledWith(config, false);
    expect(executeJscpd).toHaveBeenCalledWith(config);
    expect(executeEslint).not.toHaveBeenCalled();
  });

  it('should pass the "fix" argument to Prettier and ESLint when set to true', async () => {
    const config: QoqConfig = {
      prettier: {
        config: EModulesPrettier.PRETTIER,
        sources: ['src'],
      },
      eslint: {
        [EModulesEslint.ESLINT_V9_TS]: {
          files: ['src/**/*.ts'],
          ignores: [],
        },
      },
      jscpd: {
        threshold: 50,
      },
    };

    await execute(config, true);

    expect(executePrettier).toHaveBeenCalledWith(config, true);
    expect(executeEslint).toHaveBeenCalledWith(config, true);
    expect(executeJscpd).toHaveBeenCalledWith(config);
  });

  it('should execute only Jscpd if other modules are not configured', async () => {
    const config: QoqConfig = {
      prettier: undefined,
      eslint: undefined,
      jscpd: {
        threshold: 50,
      },
    };

    await execute(config);

    expect(executePrettier).not.toHaveBeenCalled();
    expect(executeEslint).not.toHaveBeenCalled();
    expect(executeJscpd).toHaveBeenCalledWith(config);
  });
});
