/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';
import c from 'picocolors';

import { BasicConfigHandler } from './basic/BasicConfigHandler';
import { IModulesConfig } from './types';
import { QoqConfig } from './basic/types';
import { PrettierConfigHandler } from './prettier/PrettierConfigHandler';
import { EslintConfigHandler } from './eslint/EslintConfigHandler';
import { JscpdConfigHandler } from './jscpd/JscpdConfigHandler';
import { KnipConfigHandler } from './knip/KnipConfigHandler';
import { existsSync } from 'fs';
import { CONFIG_FILE_PATH } from '@/helpers/constants';
import { PrettierExecutor } from './prettier/PrettierExecutor';
import { EExitCode } from '@/helpers/types';
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter';

export const initConfig = async (): Promise<IModulesConfig> => {
  const modulesConfig = { modules: {} } as IModulesConfig;
  const config = {} as QoqConfig;

  const basicConfigHandler = new BasicConfigHandler(modulesConfig, config);
  const prettierConfigHandler = new PrettierConfigHandler(modulesConfig, config);
  const eslintConfigHandler = new EslintConfigHandler(modulesConfig, config);
  const jscpdConfigHandler = new JscpdConfigHandler(modulesConfig, config);
  const knipConfigHandler = new KnipConfigHandler(modulesConfig, config);

  basicConfigHandler
    .setNext(prettierConfigHandler)
    .setNext(eslintConfigHandler)
    .setNext(jscpdConfigHandler)
    .setNext(knipConfigHandler);

  await basicConfigHandler.getPrompts();

  return modulesConfig;
};

export const getConfig = async (skipInit: boolean = false): Promise<IModulesConfig> => {
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

      return getModulesFromConfig({} as QoqConfig);
    }

    return initConfig();
  }

  try {
    const config = await import(CONFIG_FILE_PATH);

    return getModulesFromConfig(config.default as QoqConfig);
  } catch {
    process.stderr.write('Running with defaults\n');

    return getModulesFromConfig({} as QoqConfig);
  }
};

export const getConfigFromModules = (modulesConfig: IModulesConfig): QoqConfig => {
  const config = {} as QoqConfig;

  const basicConfigHandler = new BasicConfigHandler(modulesConfig, config);
  const prettierConfigHandler = new PrettierConfigHandler(modulesConfig, config);
  const eslintConfigHandler = new EslintConfigHandler(modulesConfig, config);
  const jscpdConfigHandler = new JscpdConfigHandler(modulesConfig, config);
  const knipConfigHandler = new KnipConfigHandler(modulesConfig, config);

  basicConfigHandler
    .setNext(prettierConfigHandler)
    .setNext(eslintConfigHandler)
    .setNext(jscpdConfigHandler)
    .setNext(knipConfigHandler);

  return basicConfigHandler.getConfigFromModules();
};

export const getModulesFromConfig = (config: QoqConfig): IModulesConfig => {
  const modulesConfig = { modules: {} } as IModulesConfig;

  const basicConfigHandler = new BasicConfigHandler(modulesConfig, config);
  const prettierConfigHandler = new PrettierConfigHandler(modulesConfig, config);
  const eslintConfigHandler = new EslintConfigHandler(modulesConfig, config);
  const jscpdConfigHandler = new JscpdConfigHandler(modulesConfig, config);
  const knipConfigHandler = new KnipConfigHandler(modulesConfig, config);

  knipConfigHandler
    .setNext(jscpdConfigHandler)
    .setNext(eslintConfigHandler)
    .setNext(prettierConfigHandler)
    .setNext(basicConfigHandler);

  return knipConfigHandler.getModulesFromConfig();
};

export const execute = async (
  modulesConfig: IModulesConfig,
  fix?: boolean,
  files?: string[]
): Promise<void> => {
  const prettierExecutor = new PrettierExecutor(modulesConfig);

  const responses: Record<string, EExitCode> = {
    [prettierExecutor.getName()]: EExitCode.OK,
  };

  responses[prettierExecutor.getName()] = await prettierExecutor.run(fix, files);

  Object.keys(responses)
    .filter((key) => responses[key] > 0)
    .forEach((key) => {
      process.exitCode = EExitCode.ERROR;

      process.stderr.write(c.red(`\nQoQ found some ${key} errors!\n\n`));
    });
};
