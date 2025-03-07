import { spawn } from 'child_process';
import { resolve } from 'path';

import { getPackageInfoSync } from 'local-pkg';
import merge from 'lodash/merge.js';
import omit from 'lodash/omit.js';

import type { EslintConfig } from './index';

export const omitRules = (sourceConfig: EslintConfig, rulesToOmit: string[]): EslintConfig => {
  const newConfig = merge({}, sourceConfig);

  newConfig.rules = omit(newConfig.rules, rulesToOmit);

  return newConfig;
};

export const executeInspector = (packageName: string): void => {
  const { rootPath } = getPackageInfoSync(packageName) as { rootPath: string };

  const child = spawn(
    // eslint-disable-next-line sonarjs/no-os-command-from-path
    'npx',
    [
      '-y',
      '@eslint/config-inspector',
      '--config',
      resolve(`${rootPath}/eslint.config-inspector.js`),
    ],
    { shell: true }
  );

  child.stdout.on('data', (data: Buffer) => {
    process.stdout.write(data.toString('utf-8'));
  });

  child.stderr.on('data', (data: Buffer) => {
    process.stderr.write(data.toString('utf-8'));
  });
};
