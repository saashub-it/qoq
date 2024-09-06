import { execSync } from 'child_process';
import { writeFileSync, existsSync } from 'fs';

import c from 'tinyrainbow';

import pkg from '../../package.json';

import {
  DEFAULT_JSCPD_PACKAGE,
  DEFAULT_PRETTIER_PACKAGE,
  DEFAULT_SRC,
  GITIGNORE_FILE_PATH,
} from './constants';
import { getPackageInfo } from './packages';
import { EModulesEslint, IEslintModuleConfig, qoqConfig } from './types';
import { formatCjs, formatEsm } from './formatCode';

const executePrettier = (config: qoqConfig, fix: boolean): boolean => {
  process.stderr.write(c.green('\nRunning Prettier:\n'));

  const sources = config?.prettier?.sources || [config?.srcPath || DEFAULT_SRC];

  try {
    const { rootPath } = getPackageInfo(config?.prettier?.config || DEFAULT_PRETTIER_PACKAGE);

    try {
      const stdout = execSync(
        `prettier --check ${sources.join(' ')} --config ${rootPath}/index.json --ignore-path ${process.cwd()}/.gitignore ${process.cwd()}/.prettierignore --ignore-unknown ${fix ? '--write' : ''}`
      );

      process.stderr.write(stdout.toString('utf8'));
      process.stderr.write('\n');

      return false;
    } catch (e) {
      if (e.status !== 1) {
        process.stderr.write('Unknown error!\n');
      }

      return true;
    }
  } catch {
    process.stderr.write(c.red("Can't load Prettier package config!\n"));

    return true;
  }
};

const executeJscpd = (config: qoqConfig): boolean => {
  process.stderr.write(c.green('\nRunning JSCPD:\n'));

  try {
    const { rootPath } = getPackageInfo(DEFAULT_JSCPD_PACKAGE);

    try {
      const stdout = execSync(
        `jscpd ${config?.srcPath || DEFAULT_SRC} -c ${rootPath}/index.json --exitCode 1`
      );

      process.stderr.write(stdout.toString('utf8'));
      process.stderr.write('\n');

      return false;
    } catch (e) {
      if (e.status !== 1) {
        process.stderr.write('Unknown error!\n');
      } else {
        process.stderr.write(e.output.toString('utf8'));
        process.stderr.write('\n');
      }

      return true;
    }
  } catch {
    process.stderr.write(c.red("Can't load JSCPD package config!\n"));

    return true;
  }
};

const executeEslint = async (config: qoqConfig, fix: boolean): Promise<boolean> => {
  process.stderr.write(c.green('\nRunning Eslint:\n'));

  try {
    const { rootPath } = getPackageInfo(pkg.name);
    const configFilePath = `${rootPath}/bin/eslint.config.js`;
    const globalExcludeRules = config?.eslint?.excludeRules;

    const imports: Record<string, string> =
      process.env.BUILD_ENV === 'CJS'
        ? {
            tools: '@saashub/qoq-eslint-v9-js/tools',
          }
        : {
            '* as tools': '@saashub/qoq-eslint-v9-js/tools',
          };

    const content: string[] = Object.keys(config.eslint || {})
      .filter((key) => Object.values(EModulesEslint).includes(key as EModulesEslint))
      .reduce((acc: string[], dependency: string, index: number) => {
        const { files, ignores } = config.eslint[dependency] as IEslintModuleConfig;

        imports[`dependency${index}`] = `${dependency}/eslintConfig`;

        const getEslintConfigArgs: string[] = [
          `${config?.srcPath || DEFAULT_SRC}`,
          JSON.stringify(files),
          JSON.stringify(ignores),
        ];

        if (existsSync(GITIGNORE_FILE_PATH)) {
          getEslintConfigArgs.push(`${GITIGNORE_FILE_PATH}`);
        }

        acc.push(
          `const config${index} = dependency${index}.getEslintConfig(${getEslintConfigArgs.join(',')})`
        );

        return acc;
      }, []);

    const mergeConfigs = `[${Object.keys(config.eslint || {})
      .filter((key) => Object.values(EModulesEslint).includes(key as EModulesEslint))
      .map((dependency, index) => {
        const { excludeRules } = config.eslint[dependency] as IEslintModuleConfig;

        return excludeRules
          ? `...tools.omitRules(config${index}, [${excludeRules.map((key) => `'${key}'`).join(',')}])`
          : `...config${index}`;
      })
      .join(',')}]`;

    const exports = globalExcludeRules
      ? `tools.omitRulesForConfigCollection(${mergeConfigs})`
      : mergeConfigs;

    writeFileSync(
      configFilePath,
      process.env.BUILD_ENV === 'CJS'
        ? formatCjs(imports, content, exports)
        : formatEsm(imports, content, exports)
    );

    try {
      const stdout = execSync(`eslint -c ${configFilePath} --max-warnings 0 ${fix ? '--fix' : ''}`);

      process.stderr.write(stdout.toString('utf8'));
      process.stderr.write('\n');

      return false;
    } catch (e) {
      if (e.status !== 1) {
        process.stderr.write('Unknown error!\n');
      } else {
        process.stderr.write(e.output.toString('utf8'));
        process.stderr.write('\n');
      }

      return true;
    }
  } catch {
    process.stderr.write(c.red("Can't load Eslint package config!\n"));

    return true;
  }
};

export const execute = async (config: qoqConfig, fix = false) => {
  let hasErrors = false;

  if (config.prettier) {
    hasErrors = executePrettier(config, fix);
  }

  if (config.jscpd) {
    hasErrors = executeJscpd(config);
  }

  if (config.eslint) {
    hasErrors = await executeEslint(config, fix);
  }

  process.exit(hasErrors ? 1 : 0);
};
