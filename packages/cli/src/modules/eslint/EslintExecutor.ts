import { existsSync, writeFileSync } from 'fs';

import c from 'picocolors';

import { capitalizeFirstLetter } from '@/helpers/common';
import { GITIGNORE_FILE_PATH } from '@/helpers/constants';
import { formatCode } from '@/helpers/formatCode';
import { resolveCliPackagePath, resolveCliRelativePath } from '@/helpers/paths';
import { EExitCode } from '@/helpers/types';

import { AbstractExecutor } from '../abstract/AbstractExecutor';
import { getFilesExtensions } from '../helpers';

import { EslintConfigHandler } from './EslintConfigHandler';
import { EModulesEslint, IModuleEslintConfig } from './types';

export class EslintExecutor extends AbstractExecutor {
  static readonly CACHE_PATH = resolveCliRelativePath('/bin/.eslintcache');

  getName(): string {
    return capitalizeFirstLetter(this.getCommandName());
  }
  protected getCommandName(): string {
    return 'eslint';
  }

  protected getCommandArgs(): string[] {
    return ['--max-warnings', '0'];
  }

  protected prepare(
    args: string[],
    disableCache: boolean = false,
    fix: boolean = false,
    files: string[] = []
  ): Promise<EExitCode> {
    try {
      const configFilePath = resolveCliPackagePath('/bin/eslint.config.js');

      const imports: Record<string, string> = {
        lodash: 'lodash',
        compat: '@eslint/compat',
      };

      const content = (this.modulesConfig.modules?.eslint ?? []).reduce(
        (acc: string[], current: IModuleEslintConfig, index) => {
          const { template, ...rest } = current;

          if (Object.values(EModulesEslint).includes(template as EModulesEslint)) {
            imports[`dependency${index}`] = String(template);

            acc.push(
              `const config${index} = [lodash.merge({}, dependency${index}.baseConfig, ${JSON.stringify(rest)})]`
            );
          } else {
            acc.push(`const config${index} = [${JSON.stringify(rest)}]`);
          }

          return acc;
        },
        []
      );

      const mergeConfigsInitialArray = existsSync(GITIGNORE_FILE_PATH)
        ? `[compat.includeIgnoreFile('${GITIGNORE_FILE_PATH.replaceAll('\\', '\\\\')}')]`
        : '[]';

      let exports = `${mergeConfigsInitialArray}${(this.modulesConfig.modules?.eslint ?? [])
        .map((_, index) => `.concat(config${index})`)
        .join('')}`;

      writeFileSync(
        configFilePath,
        formatCode(this.modulesConfig.configType, imports, content, exports)
      );

      args.push('-c', EslintConfigHandler.CONFIG_FILE_PATH);

      if (files.length > 0) {
        const supportedExtensions = getFilesExtensions(this.modulesConfig.modules);
        const filteredFiles = files.filter((file) =>
          supportedExtensions.some((ext) => file.endsWith(`.${ext}`))
        );

        if (filteredFiles.length === 0) {
          process.exit(EExitCode.OK);
        }

        args.push('--stdin-filename', ...filteredFiles);
      }

      if (fix) {
        args.push('--fix');
      }

      return super.prepare(args, disableCache, fix, files);
    } catch {
      process.stderr.write(c.red(`Can't load ${this.getName()} package config!\n`));

      process.exit(EExitCode.EXCEPTION);
    }
  }
}
