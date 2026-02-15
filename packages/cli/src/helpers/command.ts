/* eslint-disable no-redeclare */
import { spawn } from 'child_process';

import { EExitCode } from './types';

export async function executeCommand(command: string, args?: string[]): Promise<EExitCode>;
export async function executeCommand(
  command: string,
  args?: string[],
  captureOutput?: boolean
): Promise<string>;
export async function executeCommand(
  command: string,
  args: string[] = [],
  captureOutput: boolean = false
): Promise<string | EExitCode> {
  // const commandArgs

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line sonarjs/os-command
    const child = spawn(command, args, { shell: true });

    child.stdout.on('data', (data: Buffer) => {
      if (captureOutput) {
        resolve(data.toString('utf-8'));
      } else {
        process.stdout.write(data.toString('utf-8'));
      }
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
}
