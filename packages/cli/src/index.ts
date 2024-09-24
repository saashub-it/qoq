#!/usr/bin/env node

import cac from 'cac';

import { getConfig, initConfig, execute } from './modules';

const cli = cac('qoq');

cli
  .command('')
  .option('--init', 'Initialize QoQ cli config')
  .option('--check', 'Perform QoQ quality checks')
  .option('--fix', 'Apply fixes to QoQ check findings where possible')
  .option('--disable-cache', 'Disable cache to all tools')
  .action(
    async ({
      init,
      fix,
      disableCache,
    }: {
      init: boolean | undefined;
      fix: boolean | undefined;
      disableCache: boolean | undefined;
    }) => {
      if (init) {
        return await initConfig();
      }

      const config = await getConfig();

      return await execute(config, !!disableCache, !!fix);
    }
  );

cli
  .command(
    'staged [...files]',
    'Perform QoQ quality checks but only on filelist, usefull for eg `lint-staged` config'
  )
  .option('--disable-cache', 'Disable cache to all tools')
  // eslint-disable-next-line sonarjs/default-param-last
  .action(async (files: string[] = [], { disableCache }: { disableCache: boolean | undefined }) => {
    const config = await getConfig(true);

    return await execute(config, disableCache, false, files);
  });

cli.help();

cli.parse();
