import c from 'tinyrainbow';

import { executeCommand } from '../helpers/command';
import { DEFAULT_JSCPD_THRESHOLD, DEFAULT_SRC } from '../helpers/constants';
import { getPackageInfo } from '../helpers/packages';
import { EModulesJscpd, QoqConfig } from '../helpers/types';

export const executeJscpd = async (config: QoqConfig): Promise<boolean> => {
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
        '--exitCode',
        '1',
      ];

      const exitCode = await executeCommand('jscpd', args);

      return exitCode === 0;
    } catch {
      process.stderr.write('Unknown error!\n');

      return true;
    }
  } catch {
    process.stderr.write(c.red("Can't load JSCPD package config!\n"));

    return true;
  }
};
