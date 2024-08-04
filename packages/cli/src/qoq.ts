#!/usr/bin/env node

import { existsSync } from 'fs';
import { resolve } from 'path';
import { execSync } from 'child_process';
import { kebabCase } from 'lodash';

const configuredSources = process.argv.join(' ').match(new RegExp(/(?<=--src\s+)([^-]+)/, 'gs'));
const src = configuredSources ? configuredSources.pop().trim() : '.';

const configuredPrettierSources = process.argv
  .join(' ')
  .match(new RegExp(/(?<=--prettierSrc\s+)([^-]+)/, 'gs'));
const prettierSrc = configuredPrettierSources ? configuredPrettierSources.pop().trim() : src;

enum EOptions {
  'FIX' = '--fix',
}

const avaliableOptions: Record<EOptions, boolean> = {
  [EOptions.FIX]: !!process.argv.join(' ').match(new RegExp(/--fix/, 'gs')),
};

enum EModules {
  'PRETTIER' = '@saashub/qoq-prettier',
  'JSCPD' = '@saashub/qoq-jscpd',
}

const avaliableModules: Record<EModules, boolean> = {
  [EModules.PRETTIER]: false,
  [EModules.JSCPD]: false,
};

try {
  const stdout = execSync('npm list');

  avaliableModules[EModules.PRETTIER] = stdout.includes(EModules.PRETTIER);
  avaliableModules[EModules.JSCPD] = stdout.includes(EModules.JSCPD);

  if (!Object.values(avaliableModules).some((value) => !!value)) {
    console.error('No packages installed for qoq!');
    console.info(`Consider adding any of: ${Object.keys(avaliableModules).join(', ')}`);
    process.exit(2);
  }
} catch {
  console.error('Unable to list npm packages');
  process.exit(2);
}

//------------------------------------------------------------------------------
// Execution
//------------------------------------------------------------------------------

(async function main() {
  if (avaliableModules[EModules.PRETTIER]) {
    try {
      let prettierOptions: string[] = [];

      if (avaliableOptions[EOptions.FIX]) {
        prettierOptions.push('--write');
      }

      const moduleConfig = await import(EModules.PRETTIER);

      prettierOptions = Object.keys(moduleConfig)
        .filter((option) => option !== 'default')
        .reduce((acc: string[], option: string) => {
          const prettierOption = [`--${kebabCase(option)}`];

          if (moduleConfig[option] !== true) {
            prettierOption.push(moduleConfig[option]);
          }

          return acc.concat(prettierOption);
        }, prettierOptions);

      execSync(`prettier --check ${prettierSrc} --ignore-unknown ${prettierOptions.join(' ')}`);
    } catch {
      console.error('Errors found!');
    }
  }

  if (avaliableModules[EModules.JSCPD]) {
    const configOverridePath = resolve(`${process.cwd()}/.jscpd.json`);
    const configPath = existsSync(configOverridePath)
      ? configOverridePath
      : resolve(`${process.cwd()}/node_modules/@saashub/qoq-jscpd/index.json`);

    const a = execSync(`jscpd ${src} -c ${configPath}`);
    console.log(a);
  }
})().catch((error) => {
  console.log(error);
  process.exit(2);
});
