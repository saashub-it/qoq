/* eslint-disable @typescript-eslint/no-unsafe-call */
import { spawn } from 'child_process';

import { describe, it, expect, vi, beforeEach } from 'vitest';

import { executeCommand } from './command';

vi.mock('child_process');

describe('executeCommand', () => {
  const mockSpawn = spawn as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockSpawn.mockReset();
  });

  it('should execute command and return exit code', async () => {
    const mockChildProcess = {
      stdout: { on: vi.fn() },
      stderr: { on: vi.fn() },
      on: vi.fn((event, callback) => {
        if (event === 'close') {
          callback(0);
        }
      }),
    };
    mockSpawn.mockReturnValue(mockChildProcess);

    const result = await executeCommand('echo', ['Hello, world!']);
    expect(result).toBe(0);
    expect(mockSpawn).toHaveBeenCalledWith('echo', ['Hello, world!']);
  });

  it('should handle command error', async () => {
    const mockChildProcess = {
      stdout: { on: vi.fn() },
      stderr: { on: vi.fn() },
      on: vi.fn((event, callback) => {
        if (event === 'error') {
          callback(new Error('command failed'));
        }
      }),
    };
    mockSpawn.mockReturnValue(mockChildProcess);

    await expect(executeCommand('wrong-command')).rejects.toThrow('command failed');
    expect(mockSpawn).toHaveBeenCalledWith('wrong-command', []);
  });

  it('should print stdout and stderr data', async () => {
    const mockChildProcess = {
      stdout: {
        on: vi.fn((event, callback) => {
          if (event === 'data') {
            callback(Buffer.from('stdout data'));
          }
        }),
      },
      stderr: {
        on: vi.fn((event, callback) => {
          if (event === 'data') {
            callback(Buffer.from('stderr data'));
          }
        }),
      },
      on: vi.fn((event, callback) => {
        if (event === 'close') {
          callback(0);
        }
      }),
    };
    mockSpawn.mockReturnValue(mockChildProcess);

    const logSpy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
    const errorSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    await executeCommand('some-command');

    expect(logSpy).toHaveBeenCalledWith('stdout data');
    expect(errorSpy).toHaveBeenCalledWith('stderr data');

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});
