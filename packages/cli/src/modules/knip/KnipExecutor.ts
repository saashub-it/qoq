import { writeFileSync } from 'fs';

import { getKnipConfig } from '@saashub/qoq-knip/knipConfig';
import c from 'picocolors';

import { capitalizeFirstLetter } from '@/helpers/common';
import { formatCode } from '@/helpers/formatCode';
import { getRelativePath, resolveCliPackagePath, resolveCliRelativePath } from '@/helpers/paths';
import { EExitCode } from '@/helpers/types';

import { AbstractExecutor } from '../abstract/AbstractExecutor';

import { IModuleKnipConfig } from './types';

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

  protected prepare(args: string[], disableCache: boolean = false): Promise<EExitCode> {
    try {
      const {
        srcPath,
        modules: { knip },
      } = this.modulesConfig;
      const { entry, project, ignore, ignoreDependencies } = knip as IModuleKnipConfig;
      const configFilePath = resolveCliPackagePath('/bin/knip.js');

      writeFileSync(
        configFilePath,
        formatCode(
          this.modulesConfig.configType,
          {},
          [],
          JSON.stringify(getKnipConfig(srcPath, entry, project, ignore, ignoreDependencies))
        )
      );

      args.push('-c', getRelativePath(configFilePath));

      return super.prepare(args, disableCache);
    } catch {
      process.stderr.write(c.red(`Can't load ${this.getName()} package config!\n`));

      process.exit(EExitCode.EXCEPTION);
    }
  }
}
