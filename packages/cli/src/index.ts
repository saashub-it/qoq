#!/usr/bin/env node

import cac from 'cac';
import { createConfig, getConfig } from './helpers/config';
import { check } from './helpers/prettier';

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

cli.command('check', 'Perform QoQ quality checks').action(async () => {
  const config = await getConfig();

  await check(config);

  console.log(config);

  console.log('check');
});

cli.command('fix', 'Apply fixes to QoQ check findings where possible').action(async () => {
  const config = await getConfig();

  console.log(config);

  console.log('fix');
});

cli.command('audit', 'Audit project with QoQ').action(() => {
  console.log('audit');
});

// Display help message when `-h` or `--help` appears
cli.help();

cli.parse();

// import { existsSync } from 'fs';
// import { resolve } from 'path';
// import { execSync } from 'child_process';
// import { kebabCase } from 'lodash';

// const configuredSources = process.argv.join(' ').match(new RegExp(/(?<=--src\s+)([^-]+)/, 'gs'));
// const src = configuredSources ? configuredSources.pop().trim() : '.';

// const configuredPrettierSources = process.argv
//   .join(' ')
//   .match(new RegExp(/(?<=--prettierSrc\s+)([^-]+)/, 'gs'));
// const prettierSrc = configuredPrettierSources ? configuredPrettierSources.pop().trim() : src;

// enum EOptions {
//   'FIX' = '--fix',
// }

// const avaliableOptions: Record<EOptions, boolean> = {
//   [EOptions.FIX]: !!process.argv.join(' ').match(new RegExp(/--fix/, 'gs')),
// };

// enum EModules {
//   'PRETTIER' = '@saashub/qoq-prettier',
//   'PRETTIER_WITH_JSON_SORT' = '@saashub/qoq-prettier-with-json-sort',
//   'JSCPD' = '@saashub/qoq-jscpd',
//   'ESLINT_V9_JS' = '@saashub/qoq-eslint-v9-js',
//   'ESLINT_V9_TS' = '@saashub/qoq-eslint-v9-ts',
// }

// const avaliableModules: Record<EModules, boolean> = {
//   [EModules.PRETTIER]: false,
//   [EModules.PRETTIER_WITH_JSON_SORT]: false,
//   [EModules.JSCPD]: false,
//   [EModules.ESLINT_V9_JS]: false,
//   [EModules.ESLINT_V9_TS]: false,
// };

// try {
//   const stdout = execSync('npm list');

//   for (const module in EModules) {
//     avaliableModules[EModules[module]] = stdout.includes(`${EModules[module]}@`);
//   }

//   if (!Object.values(avaliableModules).some((value) => !!value)) {
//     console.error('No packages installed for qoq!');
//     console.info(`Consider adding any of: ${Object.keys(avaliableModules).join(', ')}`);
//     process.exit(2);
//   }
// } catch {
//   console.error('Unable to list npm packages');
//   process.exit(2);
// }

// //------------------------------------------------------------------------------
// // Execution
// //------------------------------------------------------------------------------

// (async function main() {
//   if (avaliableModules[EModules.PRETTIER] || avaliableModules[EModules.PRETTIER_WITH_JSON_SORT]) {
//     try {
//       let prettierOptions: string[] = [];

//       if (avaliableOptions[EOptions.FIX]) {
//         prettierOptions.push('--write');
//       }

//       const moduleConfig = avaliableModules[EModules.PRETTIER_WITH_JSON_SORT]
//         ? await import(`${EModules.PRETTIER_WITH_JSON_SORT}/config`)
//         : await import(`${EModules.PRETTIER}/config`);

//       prettierOptions = Object.keys(moduleConfig)
//         .filter((option) => option !== 'default')
//         .reduce((acc: string[], option: string) => {
//           const prettierOption = [`--${kebabCase(option)}`];

//           if (moduleConfig[option] !== true) {
//             prettierOption.push(moduleConfig[option]);
//           }

//           return acc.concat(prettierOption);
//         }, prettierOptions);

//       const stdout = execSync(
//         `prettier --check ${prettierSrc} --ignore-unknown ${prettierOptions.join(' ')}`
//       );

//       console.log(stdout.toString());
//     } catch {
//       console.error('Errors found!');
//     }
//   }

//   if (avaliableModules[EModules.ESLINT_V9_TS]) {
//     try {
//       console.log(EModules.ESLINT_V9_TS);
//     } catch {
//       console.error('Errors found!');
//     }
//   } else if (avaliableModules[EModules.ESLINT_V9_JS]) {
//     try {
//       console.log(EModules.ESLINT_V9_JS);
//     } catch {
//       console.error('Errors found!');
//     }
//   }

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
// })().catch((error) => {
//   console.log(error);
//   process.exit(2);
// });
