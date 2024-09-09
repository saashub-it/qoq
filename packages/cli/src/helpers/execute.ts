import c from 'picocolors';

import { executeEslint } from '../modules/eslint';
import { executeJscpd } from '../modules/jscpd';
import { executePrettier } from '../modules/prettier';

import { EExitCode, QoqConfig } from './types';

export const execute = async (config: QoqConfig, fix = false): Promise<void> => {
  const responses = {
    Prettier: EExitCode.OK,
    JSCPD: EExitCode.OK,
    Eslint: EExitCode.OK,
  };

  if (config.prettier) {
    responses.Prettier = await executePrettier(config, fix);
  }

  responses.JSCPD = await executeJscpd(config);

  if (config.eslint) {
    responses.Eslint = await executeEslint(config, fix);
  }

  Object.keys(responses)
    .filter((key) => responses[key] > 0)
    .forEach((key) => {
      process.exitCode = EExitCode.ERROR;

      process.stderr.write(c.red(`\nQoQ found some ${key} errors!\n\n`));
    });
};
