import { existsSync, writeFileSync } from 'fs';
import util from 'util';
import prompts from 'prompts';
import c from 'tinyrainbow';
import { CONFIG_FILE_PATH, DEFAULT_SRC, defaultModules } from './constants';
import { EModules, qoqConfig, TModulesWithConfig } from './types';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
// import { installPackages } from './packages';

export const createConfig = async (): Promise<qoqConfig> => {
  const modulesConfig = Object.keys(defaultModules).reduce((acc, key) => {
    acc[key] = false;

    return acc;
  }, {} as TModulesWithConfig);

  const { srcPath } = await prompts.prompt({
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
      type: (prev) => (!!prev ? 'select' : null),
      name: 'prettierPackage',
      message: 'What options should we use?',
      choices: [
        { title: 'Basic Prettier', value: EModules.PRETTIER },
        { title: 'Prettier with JSON sort', value: EModules.PRETTIER_WITH_JSON_SORT },
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
      type: (prev) => (!!prev ? 'list' : null),
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
      type: (prev) => (!!prev ? 'multiselect' : null),
      name: 'eslintPackage',
      message: 'What options should we use?',
      choices: [
        { title: 'Basic TypeScript only', value: EModules.ESLINT_V9_TS },
        { title: 'TypeScript + React', value: EModules.ESLINT_V9_TS_REACT },
        { title: 'TypeScript + Jest', value: EModules.ESLINT_V9_TS_JEST },
        { title: 'TypeScript + Vitest', value: EModules.ESLINT_V9_TS_VITEST },
      ],
      min: 1,
    },
    {
      type: (prev) => (!prev ? 'multiselect' : null),
      name: 'eslintPackage',
      message: 'What options should we use?',
      choices: [
        { title: 'Basic JavaScript only', value: EModules.ESLINT_V9_JS },
        { title: 'JavaScript + React', value: EModules.ESLINT_V9_JS_REACT },
        { title: 'JavaScript + Jest', value: EModules.ESLINT_V9_JS_JEST },
        { title: 'JavaScript + Vitest', value: EModules.ESLINT_V9_JS_VITEST },
      ],
      min: 1,
    },
  ];

  const { eslintPackage } = await prompts.prompt(eslintPrompts);

  if (eslintPrompts.length > 0) {
    (eslintPackage as EModules[]).forEach((module) => {
      modulesConfig[module] = true;
    });
  }

  /**
   * @todo uncomment for final varsion
   */
  // await installPackages(Object.keys(modulesConfig).filter((key) => !!modulesConfig[key]))

  prepareConfig(srcPath, modulesConfig, true);

  return prepareConfig(srcPath, modulesConfig);
};

const prepareConfig = (
  srcPath: string,
  modulesConfig: TModulesWithConfig,
  writeFile = false
): qoqConfig => {
  const config = Object.keys(modulesConfig)
    .filter((key) => !modulesConfig[key])
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
            const newValue = merge({}, acc['eslint'] || {}, modulesConfig[key]);

            if (writeFile && isEmpty(newValue)) {
              return acc;
            }

            acc['eslint'] = newValue;

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
      `module.exports=${util.inspect(config, { showHidden: false, compact: false, depth: null })}`
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

    return createConfig();
  }

  try {
    const config = await import(CONFIG_FILE_PATH);

    return config;
  } catch {
    return prepareConfig(DEFAULT_SRC, defaultModules);
  }
};
