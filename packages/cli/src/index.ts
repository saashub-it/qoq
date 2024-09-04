#!/usr/bin/env node

import cac from 'cac';
import { createConfig, getConfig } from './helpers/config';
import { execute } from './helpers/execute';

const cli = cac('qoq');

cli.command('').action(async () => {
  console.log(
    'Please pass valid QoQ command to execute. Use `qoq --help` or `qoq -h` for avaliable options'
  );
});

cli.command('init', 'Initialize QoQ cli config').action(async () => {
  await createConfig();
  console.log('init');
});

cli
  .command('check', 'Perform QoQ quality checks')
  .option('--skip-init', 'Skip config initialization')
  .action(async ({ skipInit }) => {
    const config = await getConfig(!!skipInit);

    execute(config);
  });

cli
  .command('fix', 'Apply fixes to QoQ check findings where possible')
  .option('--skip-init', 'Skip config initialization')
  .action(async ({ skipInit }) => {
    const config = await getConfig(!!skipInit);

    execute(config, true);
  });

cli.command('audit', 'Audit project with QoQ').action(() => {
  console.log('audit');
});

// Display help message when `-h` or `--help` appears
cli.help();

cli.parse();

//   if (avaliableModules[EModules.JSCPD]) {
//     try {
//       const configOverridePath = resolve(`${process.cwd()}/.jscpd.json`);
//       const configPath = existsSync(configOverridePath)
//         ? configOverridePath
//         : resolve(`${process.cwd()}/node_modules/@saashub/qoq-jscpd/index.json`);

//       const stdout = execSync(`jscpd ${src} -c ${configPath}`);

//       console.log(stdout.toString());
//     } catch {
//       console.error('Errors found!');
//     }
//   }
