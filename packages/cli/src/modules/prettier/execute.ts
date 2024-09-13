/* eslint-disable consistent-return */
import { existsSync } from 'fs';
import { resolve } from 'path';

import c from 'picocolors';

import { executeCommand } from '@/helpers/command';
import { DEFAULT_PRETTIER_PACKAGE, DEFAULT_SRC, GITIGNORE_FILE_PATH } from '@/helpers/constants';
import { getPackageInfo } from '@/helpers/packages';
import { getRelativePath, resolveCwdPath } from '@/helpers/paths';
import { MeasurePerformance } from '@/helpers/performance';
import { EExitCode } from '@/helpers/types';

import { QoqConfig } from '../config/types';

export const executePrettier = async (
  config: QoqConfig,
  fix: boolean,
  files: string[]
): Promise<EExitCode> => {
  process.stdout.write(c.green('\nRunning Prettier:\n'));

  const measurePerformance = new MeasurePerformance();
  const sources =
    files.length > 0 ? files : (config?.prettier?.sources ?? [config?.srcPath ?? DEFAULT_SRC]);

  try {
    const { rootPath } = getPackageInfo(config?.prettier?.config ?? DEFAULT_PRETTIER_PACKAGE);

    try {
      const args = [
        '--check',
        ...sources,
        '--config',
        getRelativePath(resolve(`${rootPath}/index.json`)),
        '--ignore-unknown',
      ];

      const prettierignorePath = resolveCwdPath('/.prettierignore');

      if (existsSync(GITIGNORE_FILE_PATH) || existsSync(prettierignorePath)) {
        args.push('--ignore-path');

        if (existsSync(GITIGNORE_FILE_PATH)) {
          args.push(getRelativePath(GITIGNORE_FILE_PATH));
        }

        if (existsSync(prettierignorePath)) {
          args.push(prettierignorePath);
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
