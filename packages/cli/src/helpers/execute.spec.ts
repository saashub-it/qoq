import { describe, it, expect, vi, beforeEach } from 'vitest';

import { executeEslint } from '../modules/eslint';
import { executeJscpd } from '../modules/jscpd';
import { executePrettier } from '../modules/prettier';

import { execute } from './execute';
import { EModulesPrettier, QoqConfig, EExitCode } from './types';
import { executeKnip } from '../modules/knip';

vi.mock('../modules/eslint', () => ({
  executeEslint: vi.fn(),
}));

vi.mock('../modules/jscpd', () => ({
  executeJscpd: vi.fn(),
}));

vi.mock('../modules/knip', () => ({
  executeKnip: vi.fn(),
}));

vi.mock('../modules/prettier', () => ({
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
    const config: QoqConfig = { prettier: {config: EModulesPrettier.PRETTIER} };
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
    const config: QoqConfig = { prettier: {config: EModulesPrettier.PRETTIER}, knip: {}, eslint: {} };
    await execute(config);
    expect(executePrettier).toHaveBeenCalledTimes(1);
    expect(executeKnip).toHaveBeenCalledTimes(1);
    expect(executeEslint).toHaveBeenCalledTimes(1);
  });

  it('should pass fix option to executePrettier and executeEslint', async () => {
    const config: QoqConfig = { prettier: {config: EModulesPrettier.PRETTIER}, eslint: {} };
    await execute(config, true);
    expect(executePrettier).toHaveBeenCalledTimes(1);
    expect(executePrettier).toHaveBeenCalledWith(config, true, []);
    expect(executeEslint).toHaveBeenCalledTimes(1);
    expect(executeEslint).toHaveBeenCalledWith(config, true, []);
  });

  it('should pass files option to executePrettier and executeEslint', async () => {
    const config: QoqConfig = { prettier: {config: EModulesPrettier.PRETTIER}, eslint: {} };
    const files = ['file1', 'file2'];
    await execute(config, false, files);
    expect(executePrettier).toHaveBeenCalledTimes(1);
    expect(executePrettier).toHaveBeenCalledWith(config, false, files);
    expect(executeEslint).toHaveBeenCalledTimes(1);
    expect(executeEslint).toHaveBeenCalledWith(config, false, files);
  });

  it('should set process.exitCode to EExitCode.ERROR with error responses', async () => {
    const config: QoqConfig = { prettier: {config: EModulesPrettier.PRETTIER}, eslint: {} };
    executePrettier.mockResolvedValue(EExitCode.ERROR);
    executeEslint.mockResolvedValue(EExitCode.ERROR);
    await execute(config);
    expect(process.exitCode).toBe(EExitCode.ERROR);
  });
});
