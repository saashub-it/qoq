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
  .option('--skip-prettier', 'Skip Prettier checks')
  .option('--skip-jscpd', 'Skip JSCPD checks')
  .option('--skip-knip', 'Skip Knip checks')
  .option('--skip-eslint', 'Skip Eslint checks')
  .action(
    async ({
      init,
      fix,
      disableCache,
      skipPrettier,
      skipJscpd,
      skipKnip,
      skipEslint,
    }: {
      init: boolean | undefined;
      fix: boolean | undefined;
      disableCache: boolean | undefined;
      skipPrettier: boolean | undefined;
      skipJscpd: boolean | undefined;
      skipKnip: boolean | undefined;
      skipEslint: boolean | undefined;
    }) => {
      if (init) {
        return await initConfig();
      }

      const config = await getConfig();

      return await execute(
        config,
        { skipPrettier, skipJscpd, skipKnip, skipEslint },
        !!disableCache,
        !!fix
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
      {
        disableCache,
        skipPrettier,
        skipJscpd,
        skipKnip,
        skipEslint,
      }: {
        disableCache: boolean | undefined;
        skipPrettier: boolean | undefined;
        skipJscpd: boolean | undefined;
        skipKnip: boolean | undefined;
        skipEslint: boolean | undefined;
      }
    ) => {
      const config = await getConfig(true);

      return await execute(
        config,
        { skipPrettier, skipJscpd, skipKnip, skipEslint },
        disableCache,
        false,
        files
      );
    }
  );

cli.help();

cli.parse();
