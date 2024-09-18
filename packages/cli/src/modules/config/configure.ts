/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';

import { DEFAULT_SRC } from '@/helpers/constants';
import { EConfigType } from '@/helpers/types';

import { IModulesConfig } from '../types';
import { QoqConfig } from './types';

export const createBasicConfig = async (
  modulesConfig: IModulesConfig
): Promise<IModulesConfig> => {
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

  modulesConfig.srcPath = srcPath;
  modulesConfig.configType = configType;

  return modulesConfig;
};

export const omitBasicDefaultsForConfig = (modulesConfig: IModulesConfig, config: QoqConfig): QoqConfig => {
  const { srcPath } = modulesConfig;

  if (srcPath !== DEFAULT_SRC) {
    config.srcPath = srcPath;
  }

  return config;
}