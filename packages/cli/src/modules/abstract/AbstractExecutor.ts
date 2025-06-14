import { existsSync, rmSync } from 'fs';

import c from 'picocolors';

import { IExecutorOptions, IModulesConfig } from '../types';

import { executeCommand } from '@/helpers/command';
import { TerminateExecutorGracefully } from '@/helpers/exceptions/TerminateExecutorGracefully';
import { EExitCode } from '@/helpers/types';

interface IExecutor {
  getName: () => string;
  run: (options: IExecutorOptions, files?: string[]) => Promise<EExitCode>;
}
export abstract class AbstractExecutor implements IExecutor {
  abstract getName(): string;
  protected abstract getCommandName(): string;
  protected abstract getCommandArgs(): string[];

  constructor(modulesConfig: IModulesConfig, silent: boolean = false, hideTimer: boolean = false) {
    this.modulesConfig = modulesConfig;
    this.silent = silent;
    this.hideTimer = hideTimer;
  }

  async run(options: IExecutorOptions, files?: string[]): Promise<EExitCode> {
    const consoleTimeName = `${this.getName()} execution time:`;
    console.time(c.italic(c.gray(consoleTimeName)));

    if (!this.silent) {
      process.stdout.write(c.green(`\nRunning ${this.getName()}:\n`));
    }

    const args = [...this.getCommandArgs()];

    try {
      await this.prepare(args, options, files);

      if (options.warmup) {
        return EExitCode.OK;
      }

      return await executeCommand(this.getCommandName(), args);
    } catch (e) {
      if (!(e instanceof TerminateExecutorGracefully)) {
        process.stderr.write('Unknown error!\n');

        process.exit(EExitCode.EXCEPTION);
      }

      return EExitCode.OK;
    } finally {
      if (!this.silent && !this.hideTimer) {
        console.timeEnd(c.italic(c.gray(consoleTimeName)));
      }
    }
  }

  protected modulesConfig: IModulesConfig;
  protected silent: boolean;
  protected hideTimer: boolean;

  protected async prepare(
    args: string[],
    options: IExecutorOptions,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    files: string[] = []
  ): Promise<EExitCode> {
    if (!options.disableCache) {
      const cachePath = this.constructor.CACHE_PATH as string | undefined;

      if (!cachePath) {
        throw new Error('No cache path for executor defined!');
      }

      args.push('--cache', '--cache-location', cachePath);

      if (options.warmup && existsSync(cachePath)) {
        rmSync(cachePath);
      }
    }

    return Promise.resolve(EExitCode.OK);
  }
}
