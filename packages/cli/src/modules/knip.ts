/* eslint-disable consistent-return */
import { writeFileSync } from 'fs';
import { resolve } from 'path';

import { getKnipConfig } from '@saashub/qoq-knip/knipConfig';
import c from 'picocolors';

// eslint-disable-next-line no-restricted-imports
import pkg from '../../package.json';
import { executeCommand } from '../helpers/command';
import { DEFAULT_SRC, EConfigType } from '../helpers/constants';
import { formatCode } from '../helpers/formatCode';
import { getPackageInfo } from '../helpers/packages';
import { MeasurePerformance } from '../helpers/performance';
import { EExitCode, QoqConfig } from '../helpers/types';

import { configUsesReact, configUsesTs, getFilesExtensions } from './config';

export const getDefaultKnipEntry = (srcPath: string, config: QoqConfig): string[] => {
  switch (true) {
    case configUsesTs(config) && configUsesReact(config):
      return [`${srcPath}/index.tsx`];

    case configUsesTs(config):
      return [`${srcPath}/index.ts`];

    case configUsesReact(config):
      return [`${srcPath}/index.jsx`];

    default:
      return [`${srcPath}/index.js`];
  }
};

export const getDefaultKnipProject = (srcPath: string, config: QoqConfig): string[] => [
  `${srcPath}/**/*.{${getFilesExtensions(config).join()}}`,
];

export const getDefaultKnipIgnore = (config: QoqConfig): string[] => {
  const ignore = ['package.json'];

  if (configUsesTs(config)) {
    ignore.push('tsconfig.json');
  }

  return ignore;
};

export const executeKnip = async (config: QoqConfig): Promise<EExitCode> => {
  process.stdout.write(c.green('\nRunning Knip:\n'));

  const measurePerformance = new MeasurePerformance();

  const srcPath = config?.srcPath ?? DEFAULT_SRC;
  const entry = config?.knip?.entry ?? getDefaultKnipEntry(srcPath, config);
  const project = config?.knip?.project ?? getDefaultKnipProject(srcPath, config);
  const ignore = config?.knip?.ignore ?? getDefaultKnipIgnore(config);
  const ignoreDependencies = config?.knip?.ignoreDependencies ?? [];

  try {
    const { rootPath } = getPackageInfo(pkg.name) ?? {};
    const configFilePath = resolve(`${rootPath}/bin/knip.js`);

    writeFileSync(
      configFilePath,
      formatCode(
        EConfigType.CJS,
        {},
        [],
        JSON.stringify(getKnipConfig(srcPath, entry, project, ignore, ignoreDependencies))
      )
    );

    try {
      const args = [
        '-c',
        resolve(configFilePath.replace(process.cwd(), '.')),
        '--exclude',
        'enumMembers',
      ];

      const exitCode = await executeCommand('knip', args);

      measurePerformance.printExecutionTime();

      if (exitCode === EExitCode.OK) {
        process.stdout.write(c.green('All matched files passed Knip checks\n'));
      }

      return exitCode;
    } catch {
      process.stderr.write('Unknown error!\n');

      process.exit(EExitCode.EXCEPTION);
    }
  } catch {
    process.stderr.write(c.red("Can't load Eslint package config!\n"));

    process.exit(EExitCode.EXCEPTION);
  }
};
