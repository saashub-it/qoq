import { existsSync, rmSync, writeFileSync } from 'fs';
import { pathToFileURL } from 'url';

import c from 'picocolors';
import prompts from 'prompts';

import { CONFIG_FILE_PATH } from '@/helpers/constants';
import { formatCode } from '@/helpers/formatCode';
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
import { IExecutorOptions, IModulesConfig } from './types';
import { executeCommand } from '@/helpers/command';
import { installPackages } from '@/helpers/packages';

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

const getModulesFromConfig = (config: QoqConfig): IModulesConfig => {
  const modulesConfig = { modules: {} } as IModulesConfig;

  return getHandlerBySequence(modulesConfig, config).getModulesFromConfig();
};

export const initConfig = async (skipWarmup: boolean = false): Promise<IModulesConfig> => {
  const modulesConfig = { modules: {} } as IModulesConfig;
  const config = {} as QoqConfig;

  await getHandlerBySequence(modulesConfig, config).getPrompts();

  if (existsSync(BasicConfigHandler.CONFIG_FILE_PATH)) {
    rmSync(BasicConfigHandler.CONFIG_FILE_PATH);
  }

  writeFileSync(
    BasicConfigHandler.CONFIG_FILE_PATH,
    formatCode(modulesConfig.configType, {}, [], JSON.stringify(config))
  );

  const packages = getHandlerBySequence(modulesConfig, config).getPackages();

  await installPackages(packages);

  if (!skipWarmup) {
    await executeCommand('qoq', ['--warmup']);
  }

  return modulesConfig;
};

export const getConfig = async (skipInit: boolean = false): Promise<IModulesConfig> => {
  if (!skipInit && !existsSync(CONFIG_FILE_PATH)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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

    return initConfig(true);
  }

  try {
    const config = await import(pathToFileURL(CONFIG_FILE_PATH).toString());

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return getModulesFromConfig(config.default as QoqConfig);
  } catch {
    process.stderr.write('Running with defaults\n');

    return getModulesFromConfig({} as QoqConfig);
  }
};

export const execute = async (
  modulesConfig: IModulesConfig,
  options: IExecutorOptions,
  files?: string[]
): Promise<void> => {
  const { silent, warmup, skipPrettier, skipJscpd, skipKnip, skipEslint } = options;
  const hideMessages = !!silent || !!warmup;

  const consoleTimeName = `Total execution time:`;
  console.time(c.italic(c.gray(consoleTimeName)));

  const prettierExecutor = new PrettierExecutor(modulesConfig, hideMessages);
  const jscpdExecutor = new JscpdExecutor(modulesConfig, hideMessages, true);
  const knipExecutor = new KnipExecutor(modulesConfig, hideMessages);
  const eslintExecutor = new EslintExecutor(modulesConfig, hideMessages);

  const responses: Record<string, EExitCode> = {
    [prettierExecutor.getName()]: EExitCode.OK,
    [jscpdExecutor.getName()]: EExitCode.OK,
    [knipExecutor.getName()]: EExitCode.OK,
    [eslintExecutor.getName()]: EExitCode.OK,
  };

  if (!skipPrettier) {
    responses[prettierExecutor.getName()] = await prettierExecutor.run(options, files);
  }

  if (!skipJscpd) {
    responses[jscpdExecutor.getName()] = await jscpdExecutor.run(options, files);
  }

  if (!skipKnip) {
    responses[knipExecutor.getName()] = await knipExecutor.run(options, files);
  }

  if (!skipEslint) {
    responses[eslintExecutor.getName()] = await eslintExecutor.run(options, files);
  }

  Object.keys(responses)
    .filter((key) => responses[key] !== EExitCode.OK)
    .forEach((key) => {
      process.exitCode = EExitCode.ERROR;

      process.stderr.write(c.red(`\nQoQ found some ${key} errors!\n\n`));
    });

  if (!hideMessages) {
    process.stdout.write('\n-------------------------\n\n');

    console.timeEnd(c.italic(c.gray(consoleTimeName)));
  }
};
