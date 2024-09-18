#!/usr/bin/env node

import cac from 'cac';

import { execute } from './helpers/execute';
import { createConfig, getConfig } from './modules/config/execute';

const cli = cac('qoq');

cli
  .command('')
  .option('--init', 'Initialize QoQ cli config')
  .option('--check', 'Perform QoQ quality checks')
  .option('--fix', 'Apply fixes to QoQ check findings where possible')
  .action(async ({ init, fix }) => {
    if (init) {
      return await createConfig();
    }

    const config = await getConfig();

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
