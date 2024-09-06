import { executeEslint } from '../modules/eslint';
import { executeJscpd } from '../modules/jscpd';
import { executePrettier } from '../modules/prettier';

import { QoqConfig } from './types';

export const execute = async (config: QoqConfig, fix = false): Promise<void> => {
  if (config.prettier) {
    await executePrettier(config, fix);
  }

  await executeJscpd(config);

  if (config.eslint) {
    await executeEslint(config, fix);
  }
};
