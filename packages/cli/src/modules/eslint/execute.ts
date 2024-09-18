/* eslint-disable consistent-return */
import { writeFileSync, existsSync } from 'fs';

import c from 'picocolors';

import { executeCommand } from '@/helpers/command';
import { DEFAULT_SRC, GITIGNORE_FILE_PATH } from '@/helpers/constants';
import { formatCode } from '@/helpers/formatCode';
import { getRelativePath, resolveCliPackagePath } from '@/helpers/paths';
import { MeasurePerformance } from '@/helpers/performance';
import { EConfigType, EExitCode } from '@/helpers/types';

import { getFilesExtensions } from '../config/helpers';
import { EModulesConfig } from '../config/types';

import { EModulesEslint, IEslintModuleConfig, TQoQEslint } from './types';
import { TModulesInitialWithEslint } from '../types';

export const executeEslint = async (
  modules: TModulesInitialWithEslint,
  fix: boolean,
  files: string[]
): Promise<EExitCode> => {
  process.stdout.write(c.green('\nRunning Eslint:\n'));

  const measurePerformance = new MeasurePerformance();
  const { srcPath } = modules[EModulesConfig.BASIC];

  try {
    const configFilePath = resolveCliPackagePath('/bin/eslint.config.js');

    const imports: Record<string, string> = {
      tools: '@saashub/qoq-eslint-v9-js/tools',
      compat: '@eslint/compat',
    };

    const content: string[] = Object.keys(modules)
      .filter((key) => Object.values(EModulesEslint).includes(key as EModulesEslint))
      .reduce((acc: string[], dependency: string, index: number) => {
        // const { files: configFiles, ignores: configIgnores } = (config.eslint as TQoQEslint)[
        //   dependency
        // ] as IEslintModuleConfig;

        // imports[`dependency${index}`] = `${dependency}/eslintConfig`;

        // const getEslintConfigArgs: string[] = [
        //   `'${srcPath}'`,
        //   JSON.stringify(configFiles),
        //   JSON.stringify(configIgnores),
        // ];

        // if (existsSync(GITIGNORE_FILE_PATH)) {
        //   getEslintConfigArgs.push(`'${GITIGNORE_FILE_PATH}'`);
        // }

        // acc.push(
        //   `const config${index} = dependency${index}.getEslintConfig(${getEslintConfigArgs.join(',')})`
        // );

        return acc;
      }, []);

    const mergeConfigsInitialArray = existsSync(GITIGNORE_FILE_PATH)
      ? `[compat.includeIgnoreFile('${GITIGNORE_FILE_PATH}')]`
      : '[]';
    let exports = `${mergeConfigsInitialArray}${Object.keys(modules)
      .filter((key) => Object.values(EModulesEslint).includes(key as EModulesEslint))
      .map((_, index) => `.concat(config${index})`)
      .join('')}`;

    if (files.length > 0) {
      exports = `${exports}.map((config) => { const { files, ...rest } = config; return rest; })`;
    }

    writeFileSync(configFilePath, formatCode(EConfigType.CJS, imports, content, exports));

    try {
      const args = ['-c', getRelativePath(configFilePath), '--max-warnings', '0'];

      if (files.length > 0) {
        args.push(
          '--stdin-filename',
          ...files.filter((file) =>
            getFilesExtensions(modules).some((ext) => file.endsWith(`.${ext}`))
          )
        );
      }

      if (fix) {
        args.push('--fix');
      }

      const exitCode = await executeCommand('eslint', args);

      measurePerformance.printExecutionTime();

      if (exitCode === EExitCode.OK) {
        process.stdout.write(c.green('All matched files passed Eslint checks\n'));
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
