#!/usr/bin/env node

import cac from 'cac';

import { createConfig, getConfig } from './helpers/config';
import { allModules } from './helpers/constants';
import { execute } from './helpers/execute';

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

cli.help();

cli.parse();
