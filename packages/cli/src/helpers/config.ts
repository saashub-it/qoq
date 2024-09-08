/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { existsSync, writeFileSync } from 'fs';
import util from 'util';

import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import prompts from 'prompts';
import c from 'tinyrainbow';

import {
  allModules,
  CONFIG_FILE_PATH,
  DEFAULT_JSCPD_THRESHOLD,
  DEFAULT_SRC,
  defaultModules,
  EConfigType,
} from './constants';
import { formatCode } from './formatCode';
import { installPackages } from './packages';
import {
  EModulesEslint,
  EModulesJscpd,
  EModulesPrettier,
  QoqConfig,
  TModulesWithConfig,
} from './types';

export const createConfig = async (modules: TModulesWithConfig): Promise<QoqConfig> => {
  const modulesConfig = Object.keys(modules).reduce((acc, key) => {
    acc[key] = false;

    return acc;
  }, {} as TModulesWithConfig);

  const { srcPath }: { srcPath: string } = await prompts.prompt({
    type: 'text',
    name: 'srcPath',
    message: `What's your project source path (from project root dir)?`,
    initial: DEFAULT_SRC,
  });

  const { configType }: { configType: EConfigType } = await prompts.prompt({
    type: 'select',
    name: 'configType',
    message: 'In what format should we create config file?',
    choices: [
      { title: EConfigType.CJS, value: EConfigType.CJS },
      { title: EConfigType.ESM, value: EConfigType.ESM },
    ],
  });

  const prettierPrompts = [
    {
      type: 'select',
      name: 'prettierPackage',
      message: c.reset(`What options should we use for ${c.green('Prettier')}?`),
      choices: [
        { title: 'Basic Prettier', value: EModulesPrettier.PRETTIER },
        { title: 'Prettier with JSON sort', value: EModulesPrettier.PRETTIER_WITH_JSON_SORT },
      ],
    },
    {
      type: 'toggle',
      name: 'otherSources',
      message: 'Should we format other paths than sources?',
      initial: false,
      active: c.green('yes'),
      inactive: c.red('no'),
    },
    {
      type: (prev: boolean) => (prev ? 'list' : null),
      name: 'prettierSources',
      message: 'Provide paths (from project root dir), space " " separated',
      separator: ' ',
    },
  ];

  const { prettierPackage, prettierSources } = await prompts.prompt(prettierPrompts);

  if (prettierPackage) {
    modulesConfig[prettierPackage] = prettierSources
      ? { config: prettierPackage, sources: prettierSources }
      : { config: prettierPackage };
  }

  const { jscpdThreshold }: { jscpdThreshold: number } = await prompts.prompt({
    type: 'number',
    name: 'jscpdThreshold',
    message: `What threshold should we use for copy/paste detector?`,
    initial: DEFAULT_JSCPD_THRESHOLD,
  });

  if (jscpdThreshold) {
    modulesConfig[EModulesJscpd.JSCPD] = { threshold: jscpdThreshold };
  }

  const eslintPrompts = [
    {
      type: 'toggle',
      name: 'eslint',
      message: c.reset(`Do You use ${c.green('TypeScript')} in Your project?`),
      initial: true,
      active: c.green('yes'),
      inactive: c.red('no'),
    },
    {
      type: (prev: boolean) => (prev ? 'multiselect' : null),
      name: 'eslintPackages',
      message: 'What options should we use?',
      choices: [
        { title: 'Basic TypeScript only', value: EModulesEslint.ESLINT_V9_TS },
        { title: 'TypeScript + React', value: EModulesEslint.ESLINT_V9_TS_REACT },
        { title: 'TypeScript + Jest', value: EModulesEslint.ESLINT_V9_TS_JEST },
        { title: 'TypeScript + Vitest', value: EModulesEslint.ESLINT_V9_TS_VITEST },
      ],
      min: 1,
    },
    {
      type: (prev: boolean) => (!prev ? 'multiselect' : null),
      name: 'eslintPackages',
      message: 'What options should we use?',
      choices: [
        { title: 'Basic JavaScript only', value: EModulesEslint.ESLINT_V9_JS },
        { title: 'JavaScript + React', value: EModulesEslint.ESLINT_V9_JS_REACT },
        { title: 'JavaScript + Jest', value: EModulesEslint.ESLINT_V9_JS_JEST },
        { title: 'JavaScript + Vitest', value: EModulesEslint.ESLINT_V9_JS_VITEST },
      ],
      min: 1,
    },
  ];

  const { eslintPackages }: { eslintPackages: EModulesEslint[] } =
    await prompts.prompt(eslintPrompts);

  if (eslintPackages.length > 0) {
    const eslintSrcPath = srcPath.startsWith('./') ? srcPath.replace('./', '') : srcPath;

    for (const eslintPackage of eslintPackages) {
      process.stderr.write(c.green(`\nProvide configuration for ${eslintPackage} checks:\n`));

      let initialFiles: string;
      let initialIgnores: string;

      switch (true) {
        case eslintPackage === EModulesEslint.ESLINT_V9_JS:
          initialFiles = `${eslintSrcPath}/**/*.js`;
          initialIgnores = '**/*.spec.js';
          break;

        case eslintPackage === EModulesEslint.ESLINT_V9_JS_REACT:
          initialFiles = `${eslintSrcPath}/**/*.{js,jsx}`;
          initialIgnores = '**/*.spec.js';
          break;

        case eslintPackage === EModulesEslint.ESLINT_V9_TS:
          initialFiles = `${eslintSrcPath}/**/*.{js,ts}`;
          initialIgnores = '**/*.spec.{js,ts}';
          break;

        case eslintPackage === EModulesEslint.ESLINT_V9_TS_REACT:
          initialFiles = `${eslintSrcPath}/**/*.{js,jsx,ts,tsx}`;
          initialIgnores = '**/*.spec.{js,ts}';
          break;

        case [EModulesEslint.ESLINT_V9_JS_JEST, EModulesEslint.ESLINT_V9_JS_VITEST].includes(
          eslintPackage
        ):
          initialFiles = `${eslintSrcPath}/**/*.spec.js`;
          initialIgnores = '';
          break;

        case [EModulesEslint.ESLINT_V9_TS_JEST, EModulesEslint.ESLINT_V9_TS_VITEST].includes(
          eslintPackage
        ):
          initialFiles = `${eslintSrcPath}/**/*.spec.{js,ts}`;
          initialIgnores = '';
          break;

        default:
          initialFiles = '';
          initialIgnores = '';
          break;
      }

      const { files, ignores }: { files: string[]; ignores: string[] } = await prompts.prompt([
        {
          type: 'list',
          name: 'files',
          message: 'Provide files paths (from project root dir), space " " separated',
          separator: ' ',
          initial: initialFiles ?? false,
        },
        {
          type: 'list',
          name: 'ignores',
          message: 'Provide files paths (from project root dir), space " " separated',
          separator: ' ',
          initial: initialIgnores ?? false,
        },
      ]);

      modulesConfig[eslintPackage] = {
        files: files.filter((entry) => !!entry),
        ignores: ignores.filter((entry) => !!entry),
      };
    }
  }

  await installPackages(Object.keys(modulesConfig).filter((key) => !!modulesConfig[key]));

  prepareConfig(srcPath, modulesConfig, configType);

  return prepareConfig(srcPath, modulesConfig);
};

const prepareConfig = (
  srcPath: string,
  modulesConfig: TModulesWithConfig,
  configType?: EConfigType
): QoqConfig => {
  const config = Object.keys(modulesConfig)
    .filter((key) => modulesConfig[key])
    .reduce(
      (acc, key) => {
        switch (true) {
          case key.includes('prettier'): {
            const newValue = merge({}, acc['prettier'] || {}, modulesConfig[key]);

            if (configType && isEmpty(newValue)) {
              return acc;
            }

            acc['prettier'] = newValue;

            return acc;
          }

          case key.includes('eslint'): {
            const newValue = merge({}, acc['eslint'] || {}, { [key]: modulesConfig[key] });

            if (configType && isEmpty(newValue)) {
              return acc;
            }

            acc['eslint'] = newValue;

            return acc;
          }

          case key.includes('jscpd'): {
            acc['jscpd'] = {};

            return acc;
          }

          default:
            return acc;
        }
      },
      configType && srcPath === DEFAULT_SRC ? {} : { srcPath }
    );

  if (configType) {
    const exports = util.inspect(config, { showHidden: false, compact: false, depth: null });

    writeFileSync(CONFIG_FILE_PATH, formatCode(configType, {}, [], exports));
  }

  return config;
};

export const getConfig = async (skipInit: boolean): Promise<QoqConfig> => {
  if (!skipInit && !existsSync(CONFIG_FILE_PATH)) {
    const { config } = await prompts.prompt({
      type: 'toggle',
      name: 'config',
      message: `No QoQ config found, do You want to run setup now?`,
      initial: true,
      active: c.green('yes'),
      inactive: c.red('no'),
    });

    if (!config) {
      process.stderr.write('Running with defaults\n');

      return prepareConfig(DEFAULT_SRC, defaultModules);
    }

    return createConfig(skipInit ? defaultModules : allModules);
  }

  try {
    const config = await import(CONFIG_FILE_PATH);

    return config.default as QoqConfig;
  } catch {
    return prepareConfig(DEFAULT_SRC, defaultModules);
  }
};
