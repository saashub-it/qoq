#!/usr/bin/env node

import { readPackage } from '@npmcli/package-json/lib/read-package';
import cac from 'cac';

import { PACKAGE_JSON_PATH } from './helpers/constants';
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
  .option('--config-hints', 'Enable config hints')
  .action(async (options: IExecuteOptions) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const { workspaces } = (await readPackage(PACKAGE_JSON_PATH)) as { workspaces?: string[] };
    const { init, fix, disableCache } = options;

    if (init) {
      return await initConfig(workspaces);
    }

    const config = await getConfig(workspaces);

    return await execute(config, { ...options, fix: !!fix, disableCache: !!disableCache });
  });

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
  .option('--config-hints', 'Enable config hints')
  // eslint-disable-next-line @typescript-eslint/default-param-last
  .action(async (files: string[] = [], options: IExecuteStagedOptions) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const { workspaces } = (await readPackage(PACKAGE_JSON_PATH)) as { workspaces?: string[] };
    const config = await getConfig(workspaces, true);

    return await execute(
      config,
      { ...options, fix: false, disableCache: !!options.disableCache },
      files
    );
  });

cli.help();

cli.parse();
