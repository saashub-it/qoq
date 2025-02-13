#!/usr/bin/env node

import cac from 'cac';

import { getConfig, initConfig, execute } from './modules';
import { IExecuteOptions, IExecuteStagedOptions } from './modules/types';

const cli = cac('qoq');

cli
  .command('')
  .option('--init', 'Initialize QoQ cli config')
  .option('--check', 'Perform QoQ quality checks')
  .option('--fix', 'Apply fixes to QoQ check findings where possible')
  .option('--disable-cache', 'Disable cache to all tools')
  .option('--skip-prettier', 'Skip Prettier checks')
  .option('--skip-jscpd', 'Skip JSCPD checks')
  .option('--skip-knip', 'Skip Knip checks')
  .option('--skip-eslint', 'Skip Eslint checks')
  .option('--warmup', 'Create configs for tools without QoQ execution')
  .option('--silent', 'Mute all QoQ messages')
  .action(
    async (options: IExecuteOptions) => {
      const { init, fix, disableCache } = options;

      if (init) {
        return await initConfig();
      }

      const config = await getConfig();

      return await execute(
        config,
        {...options, fix: !!fix, disableCache: !!disableCache}
      );
    }
  );

cli
  .command(
    'staged [...files]',
    'Perform QoQ quality checks but only on filelist, usefull for eg `lint-staged` config'
  )
  .option('--disable-cache', 'Disable cache to all tools')
  .option('--skip-prettier', 'Skip Prettier checks')
  .option('--skip-jscpd', 'Skip JSCPD checks')
  .option('--skip-knip', 'Skip Knip checks')
  .option('--skip-eslint', 'Skip Eslint checks')
  .action(
    async (
      // eslint-disable-next-line sonarjs/default-param-last
      files: string[] = [],
      options: IExecuteStagedOptions
    ) => {
      const config = await getConfig(true);

      return await execute(
        config,
        {...options, fix: false, disableCache: !!options.disableCache},
        files
      );
    }
  );

cli.help();

cli.parse();
