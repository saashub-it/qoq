import { writeFileSync, existsSync } from 'fs';

import c from 'tinyrainbow';

import pkg from '../../package.json';
import { executeCommand } from '../helpers/command';
import { DEFAULT_SRC, EConfigType, GITIGNORE_FILE_PATH } from '../helpers/constants';
import { formatCode } from '../helpers/formatCode';
import { getPackageInfo } from '../helpers/packages';
import { EModulesEslint, IEslintModuleConfig, IQoQEslint, QoqConfig } from '../helpers/types';

export const executeEslint = async (config: QoqConfig, fix: boolean): Promise<boolean> => {
  process.stdout.write(c.green('\nRunning Eslint:\n'));

  try {
    const { rootPath } = getPackageInfo(pkg.name) ?? {};
    const configFilePath = `${rootPath}/bin/eslint.config.js`;
    const globalExcludeRules = config?.eslint?.excludeRules;

    const imports: Record<string, string> = {
      tools: '@saashub/qoq-eslint-v9-js/tools',
      compat: '@eslint/compat',
    };

    const content: string[] = Object.keys(config.eslint ?? {})
      .filter((key) => Object.values(EModulesEslint).includes(key as EModulesEslint))
      .reduce((acc: string[], dependency: string, index: number) => {
        const { files, ignores } = (config.eslint as IQoQEslint)[dependency] as IEslintModuleConfig;

        imports[`dependency${index}`] = `${dependency}/eslintConfig`;

        const getEslintConfigArgs: string[] = [
          `'${config?.srcPath ?? DEFAULT_SRC}'`,
          JSON.stringify(files),
          JSON.stringify(ignores),
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
        const { excludeRules } = (config.eslint as IQoQEslint)[dependency] as IEslintModuleConfig;

        return excludeRules
          ? `.concat(tools.omitRulesForConfigCollection(config${index}, ${JSON.stringify(excludeRules)}))`
          : `.concat(config${index})`;
      })
      .join('')}`;

    const exports = globalExcludeRules
      ? `tools.omitRulesForConfigCollection(${mergeConfigs}, ${JSON.stringify(globalExcludeRules)})`
      : mergeConfigs;

    writeFileSync(configFilePath, formatCode(EConfigType.CJS, imports, content, exports));

    try {
      const args = ['-c', configFilePath, '--max-warnings', '0'];

      if (fix) {
        args.push('--fix');
      }

      const exitCode = await executeCommand('eslint', args);

      return exitCode === 0;
    } catch {
      process.stderr.write('Unknown error!\n');

      return true;
    }
  } catch {
    process.stderr.write(c.red("Can't load Eslint package config!\n"));

    return true;
  }
};
