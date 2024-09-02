import { existsSync } from 'fs';
import prompts from 'prompts';
import c from 'tinyrainbow';
import { CONFIG_FILE_PATH, defaultModules } from './constants';
import { EModules, TModulesWithConfig } from './types';
// import { installPackages } from './packages';

export const createConfig = async (): Promise<TModulesWithConfig> => {
  const modulesConfig = Object.keys(defaultModules).reduce((acc, key) => {
    acc[key] = false;

    return acc;
  }, {} as TModulesWithConfig);

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
  ];

  const { prettierPackage } = await prompts.prompt(prettierPrompts);

  if (prettierPackage) {
    modulesConfig[prettierPackage] = true;
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

  const { srcPath } = await prompts.prompt({
    type: 'text',
    name: 'srcPath',
    message: `What's your project source path (from project root dir)?`,
    initial: './src',
  });

  // console.log(srcPath)

  return modulesConfig;
};

export const getConfig = async (): TModulesWithConfig => {
  if (!existsSync(CONFIG_FILE_PATH)) {
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

      return defaultModules;
    }
  }

  try {
    const config = import(CONFIG_FILE_PATH);
  } catch {
    process.stderr.write(c.red('Error while processing config!, Running with defaults...\n'));
  }

  return defaultModules;
};
