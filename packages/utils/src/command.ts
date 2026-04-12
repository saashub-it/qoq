/* eslint-disable no-redeclare */
import { CommonSpawnOptions, spawn } from 'child_process';

export enum EExitCode {
  OK = 0,
  ERROR = 1,
  EXCEPTION = 2,
}

export async function executeCommand(
  command: string,
  args?: string[],
  stdio?: CommonSpawnOptions['stdio']
): Promise<EExitCode>;
export async function executeCommand(
  command: string,
  args?: string[],
  stdio?: CommonSpawnOptions['stdio'],
  captureOutput?: boolean
): Promise<string>;
export async function executeCommand(
  command: string,
  args: string[] = [],
  stdio: CommonSpawnOptions['stdio'] = 'inherit',
  captureOutput: boolean = false
): Promise<string | EExitCode> {
  // const commandArgs

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line sonarjs/os-command
    const child = spawn(command, args, {
      shell: true,
      stdio,
    });

    if (child.stdout) {
      child.stdout.on('data', (data: Buffer) => {
        if (captureOutput) {
          resolve(data.toString('utf-8'));
        } else {
          process.stdout.write(data.toString('utf-8'));
        }
      });
    }

    if (child.stderr) {
      child.stderr.on('data', (data: Buffer) => {
        process.stderr.write(data.toString('utf-8'));
      });
    }

    child.on('error', (error) => {
      reject(error);
    });

    child.on('close', (code) => {
      resolve(code ?? EExitCode.OK);
    });
  });
}
