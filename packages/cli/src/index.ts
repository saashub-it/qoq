#!/usr/bin/env node

import cac from 'cac';

import { createConfig, getConfig } from './helpers/config';
import { allModules } from './helpers/constants';
import { execute } from './helpers/execute';

const cli = cac('qoq');

cli.command('').action(() => {
  process.stdout.write(
    'Please pass valid QoQ command to execute. Use `qoq --help` or `qoq -h` for avaliable options'
  );
});

cli.command('init', 'Initialize QoQ cli config').action(async () => {
  await createConfig(allModules);
});

cli
  .command('check', 'Perform QoQ quality checks')
  .option('--use-default-config', 'Skip config initialization')
  .action(async ({ useDefaultConfig }) => {
    const config = await getConfig(!!useDefaultConfig);

    await execute(config);
  });

cli
  .command('fix', 'Apply fixes to QoQ check findings where possible')
  .option('--use-default-config', 'Skip config initialization')
  .action(async ({ useDefaultConfig }) => {
    const config = await getConfig(!!useDefaultConfig);

    await execute(config, true);
  });

cli.help();

cli.parse();
