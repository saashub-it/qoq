/* eslint-disable consistent-return */
import c from 'picocolors';

import { executeCommand } from '@/helpers/command';
import { EExitCode } from '@/helpers/types';

import { EModulesConfig } from '../basic/types';

import { TModulesInitialWithJscpd } from '../types';
import { EModulesJscpd } from './types';

export const executeJscpd = async (modules: TModulesInitialWithJscpd): Promise<EExitCode> => {
  process.stdout.write(c.green('\nRunning JSCPD:\n'));

  const { srcPath } = modules[EModulesConfig.BASIC];
  const { format, ignore, threshold } = modules[EModulesJscpd.JSCPD];

  try {
    const args = [srcPath, '-a', '-f', format.join(), '-t', String(threshold)];

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
