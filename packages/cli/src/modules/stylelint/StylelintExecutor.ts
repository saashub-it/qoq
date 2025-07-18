/* eslint-disable sonarjs/cognitive-complexity */
import { existsSync, writeFileSync } from 'fs';
import { open } from 'fs/promises';

import micromatch from 'micromatch';
import c from 'picocolors';

import { AbstractExecutor } from '../abstract/AbstractExecutor';
import { IExecutorOptions } from '../types';

import { StylelintConfigHandler } from './StylelintConfigHandler';
import {
  EModulesStylelint,
  IModuleStylelintConfigWithPattern,
  IModuleStylelintConfigWithTemplate,
} from './types';

// eslint-disable-next-line no-restricted-imports
import type { StylelintConfig } from '../../../../stylelint-css/src';

import { capitalizeFirstLetter } from '@/helpers/common';
import { GITIGNORE_FILE_PATH } from '@/helpers/constants';
import { TerminateExecutorGracefully } from '@/helpers/exceptions/TerminateExecutorGracefully';
import { formatCode } from '@/helpers/formatCode';
import { resolveCliPackagePath, resolveCliRelativePath } from '@/helpers/paths';
import { EConfigType, EExitCode } from '@/helpers/types';

export class StylelintExecutor extends AbstractExecutor {
  static readonly CACHE_PATH = resolveCliRelativePath('/bin/.stylelintcache');

  getName(): string {
    return capitalizeFirstLetter(this.getCommandName());
  }

  protected getCommandName(): string {
    return 'stylelint';
  }

  protected getCommandArgs(): string[] {
    return [];
  }

  protected async prepare(
    args: string[],
    options: IExecutorOptions,
    files: string[] = []
  ): Promise<EExitCode> {
    const {
      srcPath,
      configType,
      modules: { stylelint },
    } = this.modulesConfig;

    if (!stylelint) {
      throw new TerminateExecutorGracefully();
    }

    const { strict } = stylelint;
    let rest: StylelintConfig;

    if ((<IModuleStylelintConfigWithPattern>stylelint).pattern) {
      const { pattern, ...other } = <IModuleStylelintConfigWithPattern>stylelint;

      rest = other;

      args.push(`"${pattern}"`);
    } else if ((<IModuleStylelintConfigWithTemplate>stylelint).template) {
      const { template, ...other } = <IModuleStylelintConfigWithTemplate>stylelint;

      rest = other;

      if (template === EModulesStylelint.STYLELINT_SCSS) {
        args.push(`${srcPath}/**/*.{css,scss,sass}`);
      } else {
        args.push(`${srcPath}/**/*.css`);
      }
    } else {
      throw new Error('Bad config!');
    }

    const { disableCache, fix } = options;

    if (!disableCache) {
      args.push('--cache-strategy', 'metadata');
    }

    try {
      if (strict) {
        args.push('--max-warnings', '0');
      }

      const configFilePath = resolveCliPackagePath(
        `/bin/stylelint.config.${configType === EConfigType.ESM ? 'm' : 'c'}js`
      );

      const imports: Record<string, string> = {
        '{ objectMergeRight }': '@saashub/qoq-utils',
      };

      const content: string[] = [];

      if ((<IModuleStylelintConfigWithTemplate>stylelint).template) {
        imports[`{ baseConfig }`] = String(
          (<IModuleStylelintConfigWithTemplate>stylelint).template
        );
        content.push(`const config = objectMergeRight(baseConfig, ${JSON.stringify(rest)})`);
      } else {
        content.push(`const config = ${JSON.stringify(rest)}`);
      }

      const exports = 'config';

      writeFileSync(configFilePath, formatCode(configType, imports, content, exports));

      args.push('-c', StylelintConfigHandler.CONFIG_FILE_PATH);

      if (files.length > 0) {
        // eslint-disable-next-line sonarjs/no-dead-store
        let filteredFiles = [...files];

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

          filteredFiles = files.filter((file) => !micromatch.isMatch(file, ignores));
        } catch {
          throw new Error();
        }

        if (filteredFiles.length === 0) {
          throw new TerminateExecutorGracefully();
        }

        args.push('--stdin-filename', ...filteredFiles);
      }

      if (fix) {
        args.push('--fix');
      }

      return super.prepare(args, options, files);
    } catch (e) {
      if (e instanceof TerminateExecutorGracefully) {
        throw e;
      }

      process.stderr.write(c.red(`Can't load ${this.getName()} package config!\n`));

      return process.exit(EExitCode.EXCEPTION);
    }
  }
}
