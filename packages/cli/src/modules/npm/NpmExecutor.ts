import c from 'picocolors';
import { parse, lt, gt } from 'semver';

import { AbstractExecutor } from '../abstract/AbstractExecutor';
import { IExecutorOptions } from '../types';

import { ENpmWarningType, INpmOutdatedOutputEntry, TNpmOutdatedOutput } from './types';

import { EExitCode } from '@/helpers/types';

export class NpmExecutor extends AbstractExecutor {
  getName(): string {
    return this.getCommandName().toUpperCase();
  }

  async run(options: IExecutorOptions, files?: string[]): Promise<EExitCode>;
  async run(options: IExecutorOptions, files?: string[], captureOutput?: boolean): Promise<string>;
  async run(options: IExecutorOptions, files?: string[]): Promise<string | EExitCode> {
    process.stdout.write(c.green(`\nChecking npm packages:\n`));

    const result = await super.run(options, files, true);
    const jsonResult = JSON.parse(result) as TNpmOutdatedOutput;

    const npmDictionary = Object.keys(jsonResult).reduce(
      (acc, packageName: string) => {
        let info = jsonResult[packageName];

        if (Array.isArray(info)) {
          info = info.reduce(
            (newInfo, innerInfo) => {
              if (!newInfo.current || lt(innerInfo.current, newInfo.current)) {
                newInfo.current = innerInfo.current;
              }

              if (gt(innerInfo.latest, newInfo.latest)) {
                newInfo.latest = innerInfo.latest;
              }

              return newInfo;
            },
            { current: '', latest: '0.0.0' } as INpmOutdatedOutputEntry
          );
        }

        const current = parse(info.current);
        const latest = parse(info.latest);

        switch (true) {
          case Number(latest?.major) > Number(current?.major):
            acc[ENpmWarningType.MAJOR].push(`${packageName} ${info.current} -> ${info.latest}`);
            break;

          case Number(latest?.minor) > Number(current?.minor):
            acc[ENpmWarningType.MINOR].push(`${packageName} ${info.current} -> ${info.latest}`);
            break;

          default:
            acc[ENpmWarningType.PATCH].push(`${packageName} ${info.current} -> ${info.latest}`);
            break;
        }

        return acc;
      },
      {
        [ENpmWarningType.MAJOR]: [],
        [ENpmWarningType.MINOR]: [],
        [ENpmWarningType.PATCH]: [],
      } as Record<ENpmWarningType, string[]>
    );

    if (npmDictionary[ENpmWarningType.MAJOR].length > 0) {
      process.stdout.write(
        c.red(`\nConsider update following ${ENpmWarningType.MAJOR} versions:\n`)
      );

      npmDictionary[ENpmWarningType.MAJOR].forEach((packageName) => {
        process.stdout.write(`${packageName}\n`);
      });
    }

    if (npmDictionary[ENpmWarningType.MINOR].length > 0) {
      process.stdout.write(
        c.yellow(`\nConsider update following ${ENpmWarningType.MINOR} versions:\n`)
      );

      npmDictionary[ENpmWarningType.MINOR].forEach((packageName) => {
        process.stdout.write(`${packageName}\n`);
      });
    }

    if (npmDictionary[ENpmWarningType.PATCH].length > 0) {
      process.stdout.write(
        c.cyan(`\nConsider update following ${ENpmWarningType.PATCH} versions:\n`)
      );

      npmDictionary[ENpmWarningType.PATCH].forEach((packageName) => {
        process.stdout.write(`${packageName}\n`);
      });
    }

    return EExitCode.OK;
  }

  protected getCommandName(): string {
    return 'npm';
  }

  protected getCommandArgs(): string[] {
    return ['outdated', '--json'];
  }

  protected async prepare(args: string[], options: IExecutorOptions): Promise<EExitCode> {
    return super.prepare(args, { ...options, disableCache: true });
  }
}
