/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';

import { DEFAULT_JSCPD_THRESHOLD } from '@/helpers/constants';
import { EConfigType } from '@/helpers/types';

import { prepareConfig } from '../config/execute';
import { TModulesWithConfig } from '../config/types';

import { getDefaultJscpdFormat, getDefaultJscpdIgnore } from './helpers';
import { EModulesJscpd } from './types';

export const createJscpdConfig = async (
  modulesConfig: TModulesWithConfig,
  srcPath: string,
  configType: EConfigType
): Promise<void> => {
  const jscpdPrompts = [
    {
      type: 'number',
      name: 'jscpdThreshold',
      message: `What threshold should we use for copy/paste detector?`,
      initial: DEFAULT_JSCPD_THRESHOLD,
    },
    {
      type: 'list',
      name: 'jscpdFormat',
      message:
        'Provide files format (initially autodetected from previous config), space " " separated',
      separator: ' ',
      initial: getDefaultJscpdFormat(prepareConfig(srcPath, modulesConfig, configType)).join(' '),
    },
    {
      type: 'list',
      name: 'jscpdIgnore',
      message:
        'Provide files format (initially autodetected from previous config), space " " separated',
      separator: ' ',
      initial: getDefaultJscpdIgnore(prepareConfig(srcPath, modulesConfig, configType)).join(' '),
    },
  ];

  const {
    jscpdThreshold,
    jscpdFormat,
    jscpdIgnore,
  }: { jscpdThreshold: number; jscpdFormat: string[]; jscpdIgnore: string[] } =
    await prompts.prompt(jscpdPrompts);

  if (jscpdThreshold) {
    modulesConfig[EModulesJscpd.JSCPD] = {
      threshold: jscpdThreshold,
      format: jscpdFormat.filter((entry) => !!entry),
      ignore: jscpdIgnore.filter((entry) => !!entry),
    };
  }
};
