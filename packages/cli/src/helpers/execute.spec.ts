import { describe, it, expect, vi, beforeEach } from 'vitest';

import { executeEslint } from '../modules/eslint';
import { executeJscpd } from '../modules/jscpd';
import { executePrettier } from '../modules/prettier';

import { execute } from './execute';
import { EModulesPrettier, EModulesEslint, QoqConfig } from './types';

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

  it('should execute all modules when all are configured', async () => {
    const config: QoqConfig = {
      prettier: {
        config: EModulesPrettier.PRETTIER,
        sources: ['src'],
      },
      jscpd: {
        threshold: 50,
      },
      eslint: {
        [EModulesEslint.ESLINT_V9_TS]: {
          files: ['src/**/*.ts'],
          ignores: [],
        },
      },
    };

    await execute(config);

    expect(executePrettier).toHaveBeenCalledWith(config, false);
    expect(executeJscpd).toHaveBeenCalledWith(config);
    expect(executeEslint).toHaveBeenCalledWith(config, false);
  });

  it('should not execute Prettier if not configured', async () => {
    const config: QoqConfig = {
      prettier: undefined,
      jscpd: {
        threshold: 50,
      },
      eslint: {
        [EModulesEslint.ESLINT_V9_TS]: {
          files: ['src/**/*.ts'],
          ignores: [],
        },
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
        config: EModulesPrettier.PRETTIER,
        sources: ['src'],
      },
      jscpd: {
        threshold: 50,
      },
      eslint: undefined,
    };

    await execute(config);

    expect(executePrettier).toHaveBeenCalledWith(config, false);
    expect(executeJscpd).toHaveBeenCalledWith(config);
    expect(executeEslint).not.toHaveBeenCalled();
  });

  it('should not execute Jscpd if not configured', async () => {
    const config: QoqConfig = {
      prettier: {
        config: EModulesPrettier.PRETTIER,
        sources: ['src'],
      },
      jscpd: undefined,
      eslint: {
        [EModulesEslint.ESLINT_V9_TS]: {
          files: ['src/**/*.ts'],
          ignores: [],
        },
      },
    };

    await execute(config);

    expect(executePrettier).toHaveBeenCalledWith(config, false);
    expect(executeJscpd).toHaveBeenCalledWith(config);
    expect(executeEslint).toHaveBeenCalledWith(config, false);
  });

  it('should pass the "fix" argument to Prettier and ESLint when set to true', async () => {
    const config: QoqConfig = {
      prettier: {
        config: EModulesPrettier.PRETTIER,
        sources: ['src'],
      },
      jscpd: {
        threshold: 50,
      },
      eslint: {
        [EModulesEslint.ESLINT_V9_TS]: {
          files: ['src/**/*.ts'],
          ignores: [],
        },
      },
    };

    await execute(config, true);

    expect(executePrettier).toHaveBeenCalledWith(config, true);
    expect(executeJscpd).toHaveBeenCalledWith(config);
    expect(executeEslint).toHaveBeenCalledWith(config, true);
  });
});
