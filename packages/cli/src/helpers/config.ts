import { existsSync, writeFileSync } from 'fs';
import util from 'util';

import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import prompts from 'prompts';
import c from 'tinyrainbow';

import { allModules, CONFIG_FILE_PATH, DEFAULT_SRC, defaultModules } from './constants';
import { EModulesEslint, EModulesPrettier, qoqConfig, TModulesWithConfig } from './types';
import { installPackages } from './packages';
import { formatCjs, formatEsm } from './formatCode';

export const createConfig = async (modules: TModulesWithConfig): Promise<qoqConfig> => {
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

  const prettierPrompts = [
    {
      type: 'toggle',
      name: 'prettier',
      message: c.reset(`Would You like to use ${c.green('Prettier')} as a formatter?`),
      initial: true,
      active: c.green('yes'),
      inactive: c.red('no'),
    },
    {
      type: (prev) => (prev ? 'select' : null),
      name: 'prettierPackage',
      message: 'What options should we use?',
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
      type: (prev) => (prev ? 'list' : null),
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
      type: (prev) => (prev ? 'multiselect' : null),
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
      type: (prev) => (!prev ? 'multiselect' : null),
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
          initialIgnores = '**/*.spec.js';
          break;

        case eslintPackage === EModulesEslint.ESLINT_V9_TS_REACT:
          initialFiles = `${eslintSrcPath}/**/*.{js,jsx,ts,tsx}`;
          initialIgnores = '**/*.spec.js';
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

  /**
   * @todo uncomment for final varsion
   */
  await installPackages(Object.keys(modulesConfig).filter((key) => !!modulesConfig[key]));

  prepareConfig(srcPath, modulesConfig, true);

  return prepareConfig(srcPath, modulesConfig);
};

const prepareConfig = (
  srcPath: string,
  modulesConfig: TModulesWithConfig,
  writeFile = false
): qoqConfig => {
  const config = Object.keys(modulesConfig)
    .filter((key) => modulesConfig[key])
    .reduce(
      (acc, key) => {
        switch (true) {
          case key.includes('prettier'): {
            const newValue = merge({}, acc['prettier'] || {}, modulesConfig[key]);

            if (writeFile && isEmpty(newValue)) {
              return acc;
            }

            acc['prettier'] = newValue;

            return acc;
          }

          case key.includes('eslint'): {
            const newValue = merge({}, acc['eslint'] || {}, { [key]: modulesConfig[key] });

            if (writeFile && isEmpty(newValue)) {
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
      writeFile && srcPath === DEFAULT_SRC ? {} : { srcPath }
    );

  if (writeFile) {
    writeFileSync(
      CONFIG_FILE_PATH,
      process.env.BUILD_ENV === 'CJS'
        ? formatCjs(
            {},
            [],
            util.inspect(config, { showHidden: false, compact: false, depth: null })
          )
        : formatEsm(
            {},
            [],
            util.inspect(config, { showHidden: false, compact: false, depth: null })
          )
    );
  }

  return config;
};

export const getConfig = async (skipInit: boolean): Promise<qoqConfig> => {
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

    if (process.env.BUILD_ENV === 'CJS') {
      return config.default;
    }

    return config;
  } catch {
    return prepareConfig(DEFAULT_SRC, defaultModules);
  }
};
