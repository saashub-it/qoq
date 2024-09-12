#!/usr/bin/env node

import cac from 'cac';

import { allModules } from './helpers/constants';
import { execute } from './helpers/execute';
import { createConfig, getConfig } from './modules/config';

const cli = cac('qoq');

cli
  .command('')
  .option('--init', 'Initialize QoQ cli config')
  .option('--check', 'Perform QoQ quality checks')
  .option('--fix', 'Apply fixes to QoQ check findings where possible')
  .option('--use-default-config', 'Skip config initialization')
  .action(async ({ init, fix, useDefaultConfig }) => {
    if (init) {
      return await createConfig(allModules);
    }

    const config = await getConfig(!!useDefaultConfig);

    return await execute(config, !!fix);
  });

cli
  .command(
    'staged [...files]',
    'Perform QoQ quality checks but only on filelist, usefull for eg `lint-staged` config'
  )
  .action(async (files: string[] = []) => {
    const config = await getConfig(true);

    return await execute(config, false, files);
  });

cli.help();

cli.parse();
