import c from 'picocolors';
import { executeCommand } from '@/helpers/command';
import { IModulesConfig } from '../types';
import { EExitCode } from '@/helpers/types';
import { MeasurePerformance } from '@/helpers/performance';

interface IExecutor {
  getName: () => string;
  run: (fix?: boolean, files?: string[]) => Promise<EExitCode>;
}
export abstract class AbstractExecutor implements IExecutor {
  abstract getName(): string;
  protected abstract getCommandName(): string;
  protected abstract getCommandArgs(): string[];

  constructor(modulesConfig: IModulesConfig) {
    this.modulesConfig = modulesConfig;
    this.measurePerformance = new MeasurePerformance();
  }

  run(fix?: boolean, files?: string[]): Promise<EExitCode> {
    process.stdout.write(c.green('\nRunning Prettier:\n'));
    const args = [...this.getCommandArgs()];

    return this.prepare(args, fix, files)
      .then(() => executeCommand(this.getCommandName(), args))
      .then((exitCode) => exitCode)
      .catch(() => {
        process.stderr.write('Unknown error!\n');

        process.exit(EExitCode.EXCEPTION);
      })
      .finally(() => {
        this.measurePerformance.printExecutionTime();
      });
  }

  protected modulesConfig: IModulesConfig;
  protected measurePerformance: MeasurePerformance;

  protected prepare(args: string[], fix?: boolean, files?: string[]): Promise<EExitCode> {
    return new Promise((resolve) => resolve(EExitCode.OK));
  }
}
