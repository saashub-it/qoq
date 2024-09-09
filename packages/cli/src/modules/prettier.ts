/* eslint-disable consistent-return */
import { existsSync } from 'fs';

import c from 'picocolors';

import { executeCommand } from '../helpers/command';
import { DEFAULT_PRETTIER_PACKAGE, DEFAULT_SRC } from '../helpers/constants';
import { getPackageInfo } from '../helpers/packages';
import { MeasurePerformance } from '../helpers/performance';
import { EExitCode, QoqConfig } from '../helpers/types';

export const executePrettier = async (config: QoqConfig, fix: boolean): Promise<EExitCode> => {
  process.stdout.write(c.green('\nRunning Prettier:\n'));

  const measurePerformance = new MeasurePerformance();
  const sources = config?.prettier?.sources ?? [config?.srcPath ?? DEFAULT_SRC];

  try {
    const { rootPath } = getPackageInfo(config?.prettier?.config ?? DEFAULT_PRETTIER_PACKAGE);

    try {
      const args = [
        '--check',
        ...sources,
        '--config',
        `${rootPath}/index.json`,
        '--ignore-unknown',
      ];

      if (
        existsSync(`${process.cwd()}/.gitignore`) ||
        existsSync(`${process.cwd()}/.prettierignore`)
      ) {
        args.push('--ignore-path');

        if (existsSync(`${process.cwd()}/.gitignore`)) {
          args.push(`${process.cwd()}/.gitignore`);
        }

        if (existsSync(`${process.cwd()}/.prettierignore`)) {
          args.push(`${process.cwd()}/.prettierignore`);
        }
      }

      if (fix) {
        args.push('--write');
      }

      const exitCode = await executeCommand('prettier', args);

      measurePerformance.printExecutionTime();

      return exitCode;
    } catch {
      process.stderr.write('Unknown error!\n');

      process.exit(EExitCode.EXCEPTION);
    }
  } catch {
    process.stderr.write(c.red("Can't load Prettier package config!\n"));

    process.exit(EExitCode.EXCEPTION);
  }
};
