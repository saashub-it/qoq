/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';

import { DEFAULT_SRC } from '@/helpers/constants';
import { EConfigType } from '@/helpers/types';

export const createBasicConfig = async (): Promise<{
  srcPath: string;
  configType: EConfigType;
}> => {
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

  return { srcPath, configType };
};
