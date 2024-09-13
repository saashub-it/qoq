/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import c from 'picocolors';
import prompts from 'prompts';

import { TModulesWithConfig } from '../config/types';

import { EModulesPrettier } from './types';

export const createPrettierConfig = async (modulesConfig: TModulesWithConfig): Promise<void> => {
  const prettierPrompts = [
    {
      type: 'select',
      name: 'prettierPackage',
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

  const { prettierPackage, prettierSources } = await prompts.prompt(prettierPrompts);

  if (prettierPackage) {
    modulesConfig[prettierPackage] = prettierSources
      ? { config: prettierPackage, sources: prettierSources }
      : { config: prettierPackage };
  }
};
