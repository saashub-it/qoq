import c from 'picocolors';

import { executeCommand } from '@/helpers/command';
import { MeasurePerformance } from '@/helpers/performance';
import { EExitCode } from '@/helpers/types';

import { IModulesConfig } from '../types';

interface IExecutor {
  getName: () => string;
  run: (disableCache?: boolean, fix?: boolean, files?: string[]) => Promise<EExitCode>;
}
export abstract class AbstractExecutor implements IExecutor {
  abstract getName(): string;
  protected abstract getCommandName(): string;
  protected abstract getCommandArgs(): string[];

  constructor(modulesConfig: IModulesConfig, silent: boolean = false) {
    this.modulesConfig = modulesConfig;

    this.measurePerformance = new MeasurePerformance(this.getName(), !!silent);
  }

  async run(disableCache?: boolean, fix?: boolean, files?: string[]): Promise<EExitCode> {
    process.stdout.write(c.green(`\nRunning ${this.getName()}:\n`));

    const args = [...this.getCommandArgs()];

    try {
      await this.prepare(args, disableCache, fix, files);

      return await executeCommand(this.getCommandName(), args);
    } catch {
      process.stderr.write('Unknown error!\n');

      process.exit(EExitCode.EXCEPTION);
    } finally {
      this.measurePerformance.printExecutionTime();
    }
  }

  protected modulesConfig: IModulesConfig;
  protected measurePerformance: MeasurePerformance;

  protected prepare(
    args: string[],
    disableCache: boolean = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fix: boolean = false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    files: string[] = []
  ): Promise<EExitCode> {
    if (disableCache === false) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      args.push('--cache', '--cache-location', this.constructor.CACHE_PATH);
    }

    return Promise.resolve(EExitCode.OK);
  }
}