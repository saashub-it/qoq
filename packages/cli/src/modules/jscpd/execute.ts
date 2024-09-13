/* eslint-disable consistent-return */
import c from 'picocolors';

import { executeCommand } from '@/helpers/command';
import { DEFAULT_JSCPD_THRESHOLD, DEFAULT_SRC } from '@/helpers/constants';
import { EExitCode } from '@/helpers/types';

import { QoqConfig } from '../config/types';

import { getDefaultJscpdFormat, getDefaultJscpdIgnore } from './helpers';

export const executeJscpd = async (config: QoqConfig): Promise<EExitCode> => {
  process.stdout.write(c.green('\nRunning JSCPD:\n'));

  const format = config?.jscpd?.format ?? getDefaultJscpdFormat(config);
  const ignore = config?.jscpd?.ignore ?? getDefaultJscpdIgnore(config);
  const threshold = String(config?.jscpd?.threshold ?? DEFAULT_JSCPD_THRESHOLD);

  try {
    const args = [config?.srcPath ?? DEFAULT_SRC, '-a', '-f', format.join(), '-t', threshold];

    if (ignore.length > 0) {
      args.push('-i', ignore.join());
    }

    const exitCode = await executeCommand('jscpd', args);

    if (exitCode === EExitCode.OK) {
      process.stdout.write(c.green('All matched files passed JSCPD checks\n'));
    }

    return exitCode;
  } catch {
    process.stderr.write('Unknown error!\n');

    process.exit(EExitCode.EXCEPTION);
  }
};
