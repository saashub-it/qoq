import c from 'picocolors';

import { executeCommand } from '@/helpers/command';
import { MeasurePerformance } from '@/helpers/performance';
import { EExitCode } from '@/helpers/types';

import { IModulesConfig } from '../types';

interface IExecutor {
  getName: () => string;
  run: (fix?: boolean, files?: string[]) => Promise<EExitCode>;
}
export abstract class AbstractExecutor implements IExecutor {
  abstract getName(): string;
  protected abstract getCommandName(): string;
  protected abstract getCommandArgs(): string[];

  constructor(modulesConfig: IModulesConfig, silent: boolean = false) {
    this.modulesConfig = modulesConfig;

    this.measurePerformance = new MeasurePerformance(this.getName(), !!silent);
  }

  async run(fix?: boolean, files?: string[]): Promise<EExitCode> {
    process.stdout.write(c.green(`\nRunning ${this.getName()}:\n`));

    const args = [...this.getCommandArgs()];

    try {
      await this.prepare(args, fix, files);

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected prepare(args: string[], fix?: boolean, files?: string[]): Promise<EExitCode> {
    return Promise.resolve(EExitCode.OK);
  }
}
