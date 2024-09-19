/* eslint-disable @typescript-eslint/no-unsafe-call */

import { existsSync } from 'fs';

import c from 'picocolors';
import prompts from 'prompts';

import { CONFIG_FILE_PATH } from '@/helpers/constants';
import { EExitCode, QoqConfig } from '@/helpers/types';

import { AbstractConfigHandler } from './abstract/AbstractConfigHandler';
import { BasicConfigHandler } from './basic/BasicConfigHandler';
import { EslintConfigHandler } from './eslint/EslintConfigHandler';
import { EslintExecutor } from './eslint/EslintExecutor';
import { JscpdConfigHandler } from './jscpd/JscpdConfigHandler';
import { JscpdExecutor } from './jscpd/JscpdExecutor';
import { KnipConfigHandler } from './knip/KnipConfigHandler';
import { KnipExecutor } from './knip/KnipExecutor';
import { PrettierConfigHandler } from './prettier/PrettierConfigHandler';
import { PrettierExecutor } from './prettier/PrettierExecutor';
import { IModulesConfig } from './types';

const getHandlerBySequence = (
  modulesConfig: IModulesConfig,
  config: QoqConfig
): AbstractConfigHandler => {
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

  return basicConfigHandler;
};

export const initConfig = async (): Promise<IModulesConfig> => {
  const modulesConfig = { modules: {} } as IModulesConfig;
  const config = {} as QoqConfig;

  await getHandlerBySequence(modulesConfig, config).getPrompts();

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

  return getHandlerBySequence(modulesConfig, config).getConfigFromModules();
};

export const getModulesFromConfig = (config: QoqConfig): IModulesConfig => {
  const modulesConfig = { modules: {} } as IModulesConfig;

  return getHandlerBySequence(modulesConfig, config).getModulesFromConfig();
};

export const execute = async (
  modulesConfig: IModulesConfig,
  fix?: boolean,
  files?: string[]
): Promise<void> => {
  const prettierExecutor = new PrettierExecutor(modulesConfig);
  const jscpdExecutor = new JscpdExecutor(modulesConfig, true);
  const knipExecutor = new KnipExecutor(modulesConfig);
  const eslintExecutor = new EslintExecutor(modulesConfig);

  const responses: Record<string, EExitCode> = {
    [prettierExecutor.getName()]: EExitCode.OK,
    [jscpdExecutor.getName()]: EExitCode.OK,
    [knipExecutor.getName()]: EExitCode.OK,
    [eslintExecutor.getName()]: EExitCode.OK,
  };

  responses[prettierExecutor.getName()] = await prettierExecutor.run(fix, files);
  responses[jscpdExecutor.getName()] = await jscpdExecutor.run(fix, files);
  responses[knipExecutor.getName()] = await knipExecutor.run(fix, files);
  responses[eslintExecutor.getName()] = await eslintExecutor.run(fix, files);

  Object.keys(responses)
    .filter((key) => responses[key] > 0)
    .forEach((key) => {
      process.exitCode = EExitCode.ERROR;

      process.stderr.write(c.red(`\nQoQ found some ${key} errors!\n\n`));
    });
};
