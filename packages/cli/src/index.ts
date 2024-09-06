#!/usr/bin/env node

import cac from 'cac';

import { createConfig, getConfig } from './helpers/config';
import { execute } from './helpers/execute';
import { allModules } from './helpers/constants';

const cli = cac('qoq');

cli.command('').action(async () => {
  console.log(
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

// cli.command('audit', 'Audit project with QoQ').action(() => {
//   console.log('audit');
// });

// Display help message when `-h` or `--help` appears
cli.help();

cli.parse();
