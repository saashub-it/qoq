import { existsSync, writeFileSync } from 'fs';

import c from 'picocolors';

import { GITIGNORE_FILE_PATH } from '@/helpers/constants';
import { formatCode } from '@/helpers/formatCode';
import { getRelativePath, resolveCliPackagePath } from '@/helpers/paths';
import { EConfigType, EExitCode } from '@/helpers/types';

import { AbstractExecutor } from '../abstract/AbstractExecutor';
import { getFilesExtensions } from '../helpers';
import { IModuleEslintConfig } from '../types';

import { EModulesEslint } from './types';

export class EslintExecutor extends AbstractExecutor {
  getName(): string {
    return this.getCommandName().toUpperCase();
  }
  protected getCommandName(): string {
    return 'eslint';
  }

  protected getCommandArgs(): string[] {
    return ['--max-warnings', '0'];
  }

  protected prepare(
    args: string[],
    fix: boolean = false,
    files: string[] = []
  ): Promise<EExitCode> {
    try {
      const configFilePath = resolveCliPackagePath('/bin/eslint.config.js');

      const imports: Record<string, string> = {
        // tools: '@saashub/qoq-eslint-v9-js/tools',
        compat: '@eslint/compat',
      };

      const content = (this.modulesConfig.modules?.eslint ?? []).reduce(
        (acc: string[], current: IModuleEslintConfig, index) => {
          const { template, ...rest } = current;

          if (Object.values(EModulesEslint).includes(template as EModulesEslint)) {
            imports[`dependency${index}`] = `${template}/baseConfig`;

            acc.push(
              `const config${index} = [{...dependency${index}, ...${JSON.stringify(rest)}}]`
            );
          } else {
            acc.push(`const config${index} = [${JSON.stringify(rest)}]`);
          }

          return acc;
        },
        []
      );

      const mergeConfigsInitialArray = existsSync(GITIGNORE_FILE_PATH)
        ? `[compat.includeIgnoreFile('${GITIGNORE_FILE_PATH}')]`
        : '[]';

      let exports = `${mergeConfigsInitialArray}${(this.modulesConfig.modules?.eslint ?? [])
        .map((_, index) => `.concat(config${index})`)
        .join('')}`;

      if (files.length > 0) {
        exports = `${exports}.map((config) => { const { files, ...rest } = config; return rest; })`;
      }

      writeFileSync(configFilePath, formatCode(EConfigType.CJS, imports, content, exports));

      args.push('-c', getRelativePath(configFilePath));

      if (files.length > 0) {
        args.push(
          '--stdin-filename',
          ...files.filter((file) =>
            getFilesExtensions(this.modulesConfig.modules).some((ext) => file.endsWith(`.${ext}`))
          )
        );
      }

      if (fix) {
        args.push('--fix');
      }

      return super.prepare(args, fix, files);
    } catch {
      process.stderr.write(c.red(`Can't load ${this.getName()} package config!\n`));

      process.exit(EExitCode.EXCEPTION);
    }
  }
}
