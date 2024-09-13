/* eslint-disable consistent-return */
import { writeFileSync } from 'fs';

import { getKnipConfig } from '@saashub/qoq-knip/knipConfig';
import c from 'picocolors';

import { executeCommand } from '@/helpers/command';
import { DEFAULT_SRC } from '@/helpers/constants';
import { formatCode } from '@/helpers/formatCode';
import { getRelativePath, resolveCliPackagePath } from '@/helpers/paths';
import { MeasurePerformance } from '@/helpers/performance';
import { EConfigType, EExitCode } from '@/helpers/types';

import { QoqConfig } from '../config/types';

import { getDefaultKnipEntry, getDefaultKnipIgnore, getDefaultKnipProject } from './helpers';

export const executeKnip = async (config: QoqConfig): Promise<EExitCode> => {
  process.stdout.write(c.green('\nRunning Knip:\n'));

  const measurePerformance = new MeasurePerformance();

  const srcPath = config?.srcPath ?? DEFAULT_SRC;
  const entry = config?.knip?.entry ?? getDefaultKnipEntry(srcPath, config);
  const project = config?.knip?.project ?? getDefaultKnipProject(srcPath, config);
  const ignore = config?.knip?.ignore ?? getDefaultKnipIgnore(config);
  const ignoreDependencies = config?.knip?.ignoreDependencies ?? [];

  try {
    const configFilePath = resolveCliPackagePath('/bin/knip.js');

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
      const args = ['-c', getRelativePath(configFilePath), '--exclude', 'enumMembers'];

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
