import { execSync } from 'child_process';
import c from 'tinyrainbow';
import { qoqConfig } from './types';
import { DEFAULT_PRETTIER_PACKAGE, DEFAULT_SRC } from './constants';
import { getPackageInfo } from './packages';

const executePrettier = (config: qoqConfig, fix: boolean): boolean => {
  process.stderr.write(c.green('Running Prettier:\n'));

  const sources = config?.prettier?.sources || [config?.srcPath || DEFAULT_SRC];

  try {
    const { rootPath } = getPackageInfo(config?.prettier?.config || DEFAULT_PRETTIER_PACKAGE);

    try {
      const stdout = execSync(
        `prettier --check ${sources.join()} --config ${rootPath}/index.json --ignore-unknown ${fix ? '--write' : ''}`
      );

      process.stderr.write(stdout.toString('utf8'));
      process.stderr.write('\n');

      return false;
    } catch (e) {
      if (e.status !== 1) {
        process.stderr.write('Unknown error!\n');
      }

      return true;
    }
  } catch {
    process.stderr.write(c.red("Can't load Prettier package config!\n"));

    return true;
  }
};

const executeEslint = (config: qoqConfig, fix: boolean): boolean => {
  process.stderr.write(c.green('Running Eslint:\n'));

  // config?.srcPath || DEFAULT_SRC

  try {
    //   const stdout = execSync(
    //     `prettier --check ${sources.join()} --ignore-unknown ${fix ? '--write' : ''}`
    //   );

    //   process.stderr.write(stdout.toString('utf8'));
    process.stderr.write('\n');

    return false;
  } catch (e) {
    if (e.status !== 1) {
      process.stderr.write('Unknown error!');
      process.exit(e.status);
    }

    return true;
  }
};

export const execute = (config: qoqConfig, fix = false) => {
  let hasErrors = false;

  if (config.prettier) {
    hasErrors = executePrettier(config, fix);
  }

  if (config.eslint) {
    hasErrors = executeEslint(config, fix);
  }

  process.exit(hasErrors ? 1 : 0);
};
