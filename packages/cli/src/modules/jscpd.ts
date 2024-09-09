/* eslint-disable consistent-return */
import c from 'picocolors';

import { executeCommand } from '../helpers/command';
import { DEFAULT_JSCPD_THRESHOLD, DEFAULT_SRC } from '../helpers/constants';
import { getPackageInfo } from '../helpers/packages';
import { EExitCode, EModulesJscpd, QoqConfig } from '../helpers/types';

export const executeJscpd = async (config: QoqConfig): Promise<EExitCode> => {
  process.stdout.write(c.green('\nRunning JSCPD:\n'));

  try {
    const { rootPath } = getPackageInfo(EModulesJscpd.JSCPD);
    const threshold = String(config?.jscpd?.threshold ?? DEFAULT_JSCPD_THRESHOLD);

    try {
      const args = [
        config?.srcPath ?? DEFAULT_SRC,
        '-c',
        `${rootPath}/index.json`,
        '-t',
        threshold,
      ];

      const exitCode = await executeCommand('jscpd', args);

      if (exitCode === EExitCode.OK) {
        process.stdout.write(c.green('All matched files passed JSCPD checks\n'));
      }

      return exitCode;
    } catch {
      process.stderr.write('Unknown error!\n');

      process.exit(EExitCode.EXCEPTION);
    }
  } catch {
    process.stderr.write(c.red("Can't load JSCPD package config!\n"));

    process.exit(EExitCode.EXCEPTION);
  }
};
