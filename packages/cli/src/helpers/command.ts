import { spawn } from 'child_process';

import { EExitCode } from './types';

export const executeCommand = (command: string, args: readonly string[] = []): Promise<EExitCode> =>
  new Promise((resolve, reject) => {
    // eslint-disable-next-line sonarjs/os-command
    const child = spawn(command, args, { shell: true });

    child.stdout.on('data', (data: Buffer) => {
      process.stdout.write(data.toString('utf-8'));
    });

    child.stderr.on('data', (data: Buffer) => {
      process.stderr.write(data.toString('utf-8'));
    });

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      resolve(code ?? EExitCode.OK);
    });
  });
