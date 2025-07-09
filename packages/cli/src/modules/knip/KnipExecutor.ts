import { writeFileSync } from 'fs';

import c from 'picocolors';

// eslint-disable-next-line no-restricted-imports
import { getKnipConfig } from '../../../../knip/src/knipConfig';
import { AbstractExecutor } from '../abstract/AbstractExecutor';
import { IExecutorOptions } from '../types';

import { IModuleKnipConfig } from './types';

import { capitalizeFirstLetter } from '@/helpers/common';
import { formatCode } from '@/helpers/formatCode';
import { getRelativePath, resolveCliPackagePath, resolveCliRelativePath } from '@/helpers/paths';
import { EConfigType, EExitCode } from '@/helpers/types';

export class KnipExecutor extends AbstractExecutor {
  static readonly CACHE_PATH = resolveCliRelativePath('/bin/.knipcache');

  getName(): string {
    return capitalizeFirstLetter(this.getCommandName());
  }
  protected getCommandName(): string {
    return 'knip';
  }

  protected getCommandArgs(): string[] {
    return ['--exclude', 'enumMembers'];
  }

  protected prepare(args: string[], options: IExecutorOptions): Promise<EExitCode> {
    const { configHints } = options;

    if (!configHints) {
      args.push('--no-config-hints');
    }

    try {
      const {
        srcPath,
        configType,
        workspaces,
        modules: { knip },
      } = this.modulesConfig;
      const { entry, project, ignore, ignoreDependencies } = knip as IModuleKnipConfig;
      const configFilePath = resolveCliPackagePath(
        `/bin/knip.config.${configType === EConfigType.ESM ? 'm' : 'c'}js`
      );

      const configForFile = getKnipConfig(srcPath, entry, project, ignore, ignoreDependencies);

      if (!workspaces) {
        writeFileSync(
          configFilePath,
          formatCode(this.modulesConfig.configType, {}, [], JSON.stringify(configForFile))
        );
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars, sonarjs/no-unused-vars
        const { entry: srcEntry, project: srcProject, ...rest } = configForFile;

        const newConfigForMonorepo = {
          ...rest,
          workspaces: workspaces.reduce(
            (acc: Record<string, { entry: string[]; project: string[] }>, current: string) => {
              acc[current] = {
                entry,
                project,
              };
              return acc;
            },
            {}
          ),
        };

        writeFileSync(
          configFilePath,
          formatCode(this.modulesConfig.configType, {}, [], JSON.stringify(newConfigForMonorepo))
        );
      }

      args.push('-c', getRelativePath(configFilePath));

      return super.prepare(args, options);
    } catch {
      process.stderr.write(c.red(`Can't load ${this.getName()} package config!\n`));

      return process.exit(EExitCode.EXCEPTION);
    }
  }
}
