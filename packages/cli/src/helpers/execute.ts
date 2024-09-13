import c from 'picocolors';

import { QoqConfig } from '@/modules/config/types';
import { executeEslint } from '@/modules/eslint/execute';
import { executeJscpd } from '@/modules/jscpd/execute';
import { executeKnip } from '@/modules/knip/execute';
import { executePrettier } from '@/modules/prettier/execute';

import { EExitCode } from './types';

export const execute = async (
  config: QoqConfig,
  fix = false,
  files: string[] = []
): Promise<void> => {
  const responses = {
    Prettier: EExitCode.OK,
    JSCPD: EExitCode.OK,
    Eslint: EExitCode.OK,
    Knip: EExitCode.OK,
  };

  if (config.prettier) {
    responses.Prettier = await executePrettier(config, fix, files);
  }

  responses.JSCPD = await executeJscpd(config);

  if (config.knip) {
    responses.Knip = await executeKnip(config);
  }

  if (config.eslint) {
    responses.Eslint = await executeEslint(config, fix, files);
  }

  Object.keys(responses)
    .filter((key) => responses[key] > 0)
    .forEach((key) => {
      process.exitCode = EExitCode.ERROR;

      process.stderr.write(c.red(`\nQoQ found some ${key} errors!\n\n`));
    });
};
