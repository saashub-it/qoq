/* eslint-disable consistent-return */
import { writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

import c from 'picocolors';

// eslint-disable-next-line no-restricted-imports
import pkg from '../../package.json';
import { executeCommand } from '../helpers/command';
import { DEFAULT_SRC, EConfigType, GITIGNORE_FILE_PATH } from '../helpers/constants';
import { formatCode } from '../helpers/formatCode';
import { getPackageInfo } from '../helpers/packages';
import { MeasurePerformance } from '../helpers/performance';
import {
  EModulesEslint,
  IEslintModuleConfig,
  TQoQEslint,
  QoqConfig,
  EExitCode,
} from '../helpers/types';

import { getFilesExtensions } from './config';

export const executeEslint = async (
  config: QoqConfig,
  fix: boolean,
  files: string[]
): Promise<EExitCode> => {
  process.stdout.write(c.green('\nRunning Eslint:\n'));

  const measurePerformance = new MeasurePerformance();

  try {
    const { rootPath } = getPackageInfo(pkg.name) ?? {};
    const configFilePath = resolve(`${rootPath}/bin/eslint.config.js`);
    const globalExcludeRules = config?.eslint?.excludeRules;

    const imports: Record<string, string> = {
      tools: '@saashub/qoq-eslint-v9-js/tools',
      compat: '@eslint/compat',
    };

    const content: string[] = Object.keys(config.eslint ?? {})
      .filter((key) => Object.values(EModulesEslint).includes(key as EModulesEslint))
      .reduce((acc: string[], dependency: string, index: number) => {
        const { files: configFiles, ignores: configIgnores } = (config.eslint as TQoQEslint)[
          dependency
        ] as IEslintModuleConfig;

        imports[`dependency${index}`] = `${dependency}/eslintConfig`;

        const getEslintConfigArgs: string[] = [
          `'${config?.srcPath ?? DEFAULT_SRC}'`,
          JSON.stringify(configFiles),
          JSON.stringify(configIgnores),
        ];

        if (existsSync(GITIGNORE_FILE_PATH)) {
          getEslintConfigArgs.push(`'${GITIGNORE_FILE_PATH}'`);
        }

        acc.push(
          `const config${index} = dependency${index}.getEslintConfig(${getEslintConfigArgs.join(',')})`
        );

        return acc;
      }, []);

    const mergeConfigsInitialArray = existsSync(GITIGNORE_FILE_PATH)
      ? `[compat.includeIgnoreFile('${GITIGNORE_FILE_PATH}')]`
      : '[]';
    const mergeConfigs = `${mergeConfigsInitialArray}${Object.keys(config.eslint ?? {})
      .filter((key) => Object.values(EModulesEslint).includes(key as EModulesEslint))
      .map((dependency, index) => {
        const { excludeRules } = (config.eslint as TQoQEslint)[dependency] as IEslintModuleConfig;

        return excludeRules
          ? `.concat(tools.omitRulesForConfigCollection(config${index}, ${JSON.stringify(excludeRules)}))`
          : `.concat(config${index})`;
      })
      .join('')}`;

    let exports = globalExcludeRules
      ? `tools.omitRulesForConfigCollection(${mergeConfigs}, ${JSON.stringify(globalExcludeRules)})`
      : mergeConfigs;

    if (files.length > 0) {
      exports = `${exports}.map((config) => { const { files, ...rest } = config; return rest; })`;
    }

    writeFileSync(configFilePath, formatCode(EConfigType.CJS, imports, content, exports));

    try {
      const args = ['-c', configFilePath, '--max-warnings', '0'];

      if (files.length > 0) {
        args.push(
          '--stdin-filename',
          ...files.filter((file) =>
            getFilesExtensions(config).some((ext) => file.endsWith(`.${ext}`))
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
