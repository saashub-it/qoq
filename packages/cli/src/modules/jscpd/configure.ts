/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';

import { DEFAULT_JSCPD_THRESHOLD } from './constants';
import { getDefaultJscpdFormat, getDefaultJscpdIgnore } from './helpers';
import { IModulesConfig } from '../types';
import { QoqConfig } from '../config/types';
import isEqual from 'react-fast-compare';

export const createJscpdConfig = async (
  modulesConfig: IModulesConfig
): Promise<IModulesConfig> => {
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
      initial: getDefaultJscpdFormat(modulesConfig).join(' '),
    },
    {
      type: 'list',
      name: 'jscpdIgnore',
      message:
        'Provide files format (initially autodetected from previous config), space " " separated',
      separator: ' ',
      initial: getDefaultJscpdIgnore(modulesConfig).join(' '),
    },
  ];

  const {
    jscpdThreshold,
    jscpdFormat,
    jscpdIgnore,
  }: { jscpdThreshold: number; jscpdFormat: string[]; jscpdIgnore: string[] } =
    await prompts.prompt(jscpdPrompts);

    modulesConfig.modules.jscpd = {
      threshold: Number(jscpdThreshold) ?? DEFAULT_JSCPD_THRESHOLD,
      format: jscpdFormat.filter((entry) => !!entry),
      ignore: jscpdIgnore.filter((entry) => !!entry),
    }

  return modulesConfig;
};

export const omitJscpdDefaultsForConfig = (modulesConfig: IModulesConfig, config: QoqConfig): QoqConfig => {
  const { modules: { jscpd } } = modulesConfig;

  config.jscpd = {
    format: jscpd?.format as string[],
  }

  if (jscpd?.ignore && !isEqual(jscpd.ignore, [])) {

  }
  

  return config;
}