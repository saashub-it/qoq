import { existsSync } from 'fs';
import { open } from 'fs/promises';

import micromatch from 'micromatch';
import c from 'picocolors';

import { AbstractExecutor } from '../abstract/AbstractExecutor';
import { IExecutorOptions } from '../types';

import { PrettierConfigHandler } from './PrettierConfigHandler';

import { capitalizeFirstLetter } from '@/helpers/common';
import { GITIGNORE_FILE_PATH } from '@/helpers/constants';
import { TerminateExecutorGracefully } from '@/helpers/exceptions/TerminateExecutorGracefully';
import { getRelativePath, resolveCliRelativePath, resolveCwdPath } from '@/helpers/paths';
import { EExitCode } from '@/helpers/types';

export class PrettierExecutor extends AbstractExecutor {
  static readonly CACHE_PATH = resolveCliRelativePath('/bin/.prettiercache');

  getName(): string {
    return capitalizeFirstLetter(this.getCommandName());
  }
  protected getCommandName(): string {
    return 'prettier';
  }

  protected getCommandArgs(): string[] {
    return ['--config', PrettierConfigHandler.CONFIG_FILE_PATH, '--ignore-unknown'];
  }

  protected async prepare(
    args: string[],
    options: IExecutorOptions,
    files: string[] = []
  ): Promise<EExitCode> {
    const { disableCache, fix } = options;
    if (!disableCache) {
      args.push('--cache-strategy', 'metadata');
    }

    try {
      const { srcPath, modules } = this.modulesConfig;
      const prettierignorePath = resolveCwdPath('/.prettierignore');
      let sources: string[] = modules?.prettier?.sources ?? [srcPath];

      if (files.length > 0) {
        try {
          const ignores: string[] = [];

          if (existsSync(GITIGNORE_FILE_PATH)) {
            const file = await open(GITIGNORE_FILE_PATH);

            for await (const line of file.readLines()) {
              if (!line.startsWith('#') && line !== '') {
                ignores.push(line);
              }
            }
          }

          if (existsSync(prettierignorePath)) {
            const file = await open(prettierignorePath);

            for await (const line of file.readLines()) {
              if (!line.startsWith('#') && line !== '') {
                ignores.push(line);
              }
            }
          }

          sources = files.filter((file) => !micromatch.isMatch(file, ignores));
        } catch {
          throw new Error();
        }

        if (sources.length === 0) {
          throw new TerminateExecutorGracefully();
        }
      }

      args.push('--check', ...sources);

      if (existsSync(GITIGNORE_FILE_PATH) || existsSync(prettierignorePath)) {
        args.push('--ignore-path');

        if (existsSync(GITIGNORE_FILE_PATH)) {
          args.push(getRelativePath(GITIGNORE_FILE_PATH));
        }

        if (existsSync(prettierignorePath)) {
          args.push(getRelativePath(prettierignorePath));
        }
      }

      if (fix) {
        args.push('--write');
      }

      return super.prepare(args, options, files);
    } catch (e) {
      if (e instanceof TerminateExecutorGracefully) {
        throw e;
      }

      process.stderr.write(c.red(`Can't load ${this.getName()} package config!\n`));

      process.exit(EExitCode.EXCEPTION);
    }
  }
}
