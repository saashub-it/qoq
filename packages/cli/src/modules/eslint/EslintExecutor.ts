import { existsSync, writeFileSync } from 'fs';

import c from 'picocolors';

import { capitalizeFirstLetter } from '@/helpers/common';
import { GITIGNORE_FILE_PATH } from '@/helpers/constants';
import { formatCode } from '@/helpers/formatCode';
import { resolveCliPackagePath, resolveCliRelativePath } from '@/helpers/paths';
import { EConfigType, EExitCode } from '@/helpers/types';

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
      const { configType, modules } = this.modulesConfig;
      const configFilePath = resolveCliPackagePath(
        `/bin/eslint.config.${configType === EConfigType.ESM ? 'm' : 'c'}js`
      );

      const imports: Record<string, string> = {
        lodash: 'lodash',
        '{ includeIgnoreFile }': '@eslint/compat',
      };

      const content = (modules?.eslint ?? []).reduce(
        (acc: string[], current: IModuleEslintConfig, index) => {
          const { template, ...rest } = current;

          if (Object.values(EModulesEslint).includes(template as EModulesEslint)) {
            if (configType === EConfigType.ESM) {
              imports[`{ baseConfig as baseConfig${index} }`] = String(template);
            } else {
              imports[`{ baseConfig: baseConfig${index} }`] = String(template);
            }

            acc.push(
              `const config${index} = [lodash.merge({}, baseConfig${index}, ${JSON.stringify(rest)})]`
            );
          } else {
            acc.push(`const config${index} = [${JSON.stringify(rest)}]`);
          }

          return acc;
        },
        []
      );

      const mergeConfigsInitialArray = existsSync(GITIGNORE_FILE_PATH)
        ? `[includeIgnoreFile('${GITIGNORE_FILE_PATH.replaceAll('\\', '\\\\')}')]`
        : '[]';

      let exports = `${mergeConfigsInitialArray}${(modules?.eslint ?? [])
        .map((_, index) => `.concat(config${index})`)
        .join('')}`;

      writeFileSync(configFilePath, formatCode(configType, imports, content, exports));

      args.push('-c', EslintConfigHandler.CONFIG_FILE_PATH);

      if (files.length > 0) {
        const supportedExtensions = getFilesExtensions(modules);
        const filteredFiles = files.filter((file) =>
          supportedExtensions.some((ext) => file.endsWith(`.${ext}`))
        );

        if (filteredFiles.length === 0) {
          process.exit(EExitCode.OK);
        }

        args.push('--stdin-filename', ...filteredFiles);
        args.push('--no-error-on-unmatched-pattern');
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
