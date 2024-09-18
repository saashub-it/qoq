/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import c from 'picocolors';
import prompts from 'prompts';

import { DEFAULT_PRETTIER_SOURCES } from './constants';
import { EModulesPrettier } from './types';
import { IModulesConfig } from '../types';
import { QoqConfig } from '../config/types';
import isEqual from 'react-fast-compare';

export const createPrettierConfig = async (
  modulesConfig: IModulesConfig
): Promise<IModulesConfig> => {
  const prettierPrompts = [
    {
      type: 'select',
      name: 'packages',
      message: c.reset(`What options should we use for ${c.green('Prettier')}?`),
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
      type: (prev: boolean) => (prev ? 'list' : null),
      name: 'prettierSources',
      message: 'Provide paths (from project root dir), space " " separated',
      separator: ' ',
    },
  ];

  const {
    /**
     * @todo write prettier confg
     */
    // prettierPackage
    prettierSources,
  }: {
    prettierPackage: EModulesPrettier.PRETTIER | EModulesPrettier.PRETTIER_WITH_JSON_SORT;
    prettierSources: string[];
  } = await prompts.prompt(prettierPrompts);

  modulesConfig.modules.prettier = {
    sources: prettierSources.filter((entry) => !!entry) ?? DEFAULT_PRETTIER_SOURCES
  }

  return modulesConfig;
};

export const omitPrettierDefaultsForConfig = (modulesConfig: IModulesConfig, config: QoqConfig): QoqConfig => {
  const { modules: { prettier } } = modulesConfig;

  if (prettier?.sources && !isEqual(prettier.sources, DEFAULT_PRETTIER_SOURCES)) {
    config.prettier = {...prettier};
  }

  return config;
}