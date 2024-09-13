import { describe, it, expect, vi, beforeEach } from 'vitest';

import { QoqConfig } from '@/modules/config/types';
import { executeEslint } from '@/modules/eslint/execute';
import { executeJscpd } from '@/modules/jscpd/execute';
import { executeKnip } from '@/modules/knip/execute';
import { executePrettier } from '@/modules/prettier/execute';
import { EModulesPrettier } from '@/modules/prettier/types';

import { execute } from './execute';

vi.mock('@/modules/eslint/execute', () => ({
  executeEslint: vi.fn(),
}));

vi.mock('@/modules/jscpd/execute', () => ({
  executeJscpd: vi.fn(),
}));

vi.mock('@/modules/knip/execute', () => ({
  executeKnip: vi.fn(),
}));

vi.mock('@/modules/prettier/execute', () => ({
  executePrettier: vi.fn(),
}));

describe('execute function', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call executeJscpd with default config', async () => {
    const config: QoqConfig = {};
    await execute(config);
    expect(executeJscpd).toHaveBeenCalledTimes(1);
  });

  it('should call executePrettier with config.prettier enabled', async () => {
    const config: QoqConfig = { prettier: { config: EModulesPrettier.PRETTIER } };
    await execute(config);
    expect(executePrettier).toHaveBeenCalledTimes(1);
  });

  it('should call executeKnip with config.knip enabled', async () => {
    const config: QoqConfig = { knip: {} };
    await execute(config);
    expect(executeKnip).toHaveBeenCalledTimes(1);
  });

  it('should call executeEslint with config.eslint enabled', async () => {
    const config: QoqConfig = { eslint: {} };
    await execute(config);
    expect(executeEslint).toHaveBeenCalledTimes(1);
  });

  it('should call multiple execute functions with multiple config options enabled', async () => {
    const config: QoqConfig = {
      prettier: { config: EModulesPrettier.PRETTIER },
      knip: {},
      eslint: {},
    };
    await execute(config);
    expect(executePrettier).toHaveBeenCalledTimes(1);
    expect(executeKnip).toHaveBeenCalledTimes(1);
    expect(executeEslint).toHaveBeenCalledTimes(1);
  });

  it('should pass fix option to executePrettier and executeEslint', async () => {
    const config: QoqConfig = { prettier: { config: EModulesPrettier.PRETTIER }, eslint: {} };
    await execute(config, true);
    expect(executePrettier).toHaveBeenCalledTimes(1);
    expect(executePrettier).toHaveBeenCalledWith(config, true, []);
    expect(executeEslint).toHaveBeenCalledTimes(1);
    expect(executeEslint).toHaveBeenCalledWith(config, true, []);
  });

  it('should pass files option to executePrettier and executeEslint', async () => {
    const config: QoqConfig = { prettier: { config: EModulesPrettier.PRETTIER }, eslint: {} };
    const files = ['file1', 'file2'];
    await execute(config, false, files);
    expect(executePrettier).toHaveBeenCalledTimes(1);
    expect(executePrettier).toHaveBeenCalledWith(config, false, files);
    expect(executeEslint).toHaveBeenCalledTimes(1);
    expect(executeEslint).toHaveBeenCalledWith(config, false, files);
  });
});
