import { existsSync } from 'fs';

import c from 'picocolors';

import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';
import { GITIGNORE_FILE_PATH } from '@/helpers/constants';
import { getRelativePath, resolveCwdPath } from '@/helpers/paths';
import { EExitCode } from '@/helpers/types';

import { AbstractExecutor } from '../abstract/AbstractExecutor';

import { PrettierConfigHandler } from './PrettierConfigHandler';

export class PrettierExecutor extends AbstractExecutor {
  getName(): string {
    return capitalizeFirstLetter(this.getCommandName());
  }
  protected getCommandName(): string {
    return 'prettier';
  }

  protected getCommandArgs(): string[] {
    return ['--config', PrettierConfigHandler.CONFIG_FILE_PATH, '--ignore-unknown'];
  }

  protected prepare(
    args: string[],
    fix: boolean = false,
    files: string[] = []
  ): Promise<EExitCode> {
    try {
      const { srcPath, modules } = this.modulesConfig;
      const sources: string[] =
        files.length > 0 ? files : (modules?.prettier?.sources ?? [srcPath]);

      args.push('--check', ...sources);

      const prettierignorePath = resolveCwdPath('/.prettierignore');

      if (existsSync(GITIGNORE_FILE_PATH) || existsSync(prettierignorePath)) {
        args.push('--ignore-path');

        if (existsSync(GITIGNORE_FILE_PATH)) {
          args.push(getRelativePath(GITIGNORE_FILE_PATH));
        }

        if (existsSync(prettierignorePath)) {
          args.push(prettierignorePath);
        }
      }

      if (fix) {
        args.push('--write');
      }

      return super.prepare(args, fix, files);
    } catch {
      process.stderr.write(c.red(`Can't load ${this.getName()} package config!\n`));

      process.exit(EExitCode.EXCEPTION);
    }
  }
}
