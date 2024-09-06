import { spawn } from 'child_process';

export const executeCommand = (
  command: string,
  args: readonly string[] = []
): Promise<Error | number> =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args);

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
      resolve(code ?? 0);
    });
  });
