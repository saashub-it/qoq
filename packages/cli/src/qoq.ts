#!/usr/bin/env node

import { execSync } from 'child_process';
import { kebabCase } from 'lodash';

let src = '.';
const configuredSources = new RegExp(/--src (.*) --|--src (.*)$/, 'gs').exec(
  process.argv.join(' ')
);

if (configuredSources) {
  src = configuredSources[1];
}

enum EOptions {
  'FIX' = '--fix',
}

const avaliableOptions: Record<EOptions, boolean> = {
  [EOptions.FIX]: !!process.argv.join(' ').match(new RegExp(/--fix/, 'gs')),
};

enum EModules {
  'PRETTIER' = '@saashub/qoq-prettier',
}

const avaliableModules: Record<EModules, boolean> = {
  [EModules.PRETTIER]: false,
};

try {
  const stdout = execSync('npm list');

  avaliableModules[EModules.PRETTIER] = stdout.includes('@saashub/qoq-prettier');

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

      prettierOptions = Object.keys(moduleConfig.default).reduce(
        (acc: string[], option: string) => {
          const prettierOption = [`--${kebabCase(option)}`];

          if (moduleConfig.default[option] !== true) {
            prettierOption.push(moduleConfig.default[option]);
          }

          return acc.concat(prettierOption);
        },
        prettierOptions
      );

      execSync(`prettier --check ${src} --ignore-unknown ${prettierOptions.join(' ')}`);
    } catch {
      console.error('Errors found!');
    }
  }
})().catch((error) => {
  console.log(error);
  process.exit(2);
});
