/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';

import { EConfigType } from '@/helpers/types';

import { prepareConfig } from '../config/execute';
import { TModulesWithConfig } from '../config/types';

import { getDefaultKnipEntry, getDefaultKnipIgnore, getDefaultKnipProject } from './helpers';
import { EModulesKnip } from './types';

export const createKnipConfig = async (
  modulesConfig: TModulesWithConfig,
  srcPath: string,
  configType: EConfigType
): Promise<void> => {
  const knipPrompts = [
    {
      type: 'list',
      name: 'knipEntry',
      message: 'Provide entry (initially autodetected from previous config), space " " separated',
      separator: ' ',
      initial: getDefaultKnipEntry(srcPath, prepareConfig(srcPath, modulesConfig, configType)).join(
        ' '
      ),
    },
    {
      type: 'list',
      name: 'knipProject',
      message: 'Provide project (initially autodetected from previous config), space " " separated',
      separator: ' ',
      initial: getDefaultKnipProject(
        srcPath,
        prepareConfig(srcPath, modulesConfig, configType)
      ).join(' '),
    },
    {
      type: 'list',
      name: 'knipIgnore',
      message: 'Provide ignore (initially autodetected from previous config), space " " separated',
      separator: ' ',
      initial: getDefaultKnipIgnore(prepareConfig(srcPath, modulesConfig, configType)).join(' '),
    },
    {
      type: 'list',
      name: 'knipIgnoreDependencies',
      message:
        'Provide ignoreDependencies (initially autodetected from previous config), space " " separated',
      separator: ' ',
    },
  ];

  const {
    knipEntry,
    knipProject,
    knipIgnore,
    knipIgnoreDependencies,
  }: {
    knipEntry: string[];
    knipProject: string[];
    knipIgnore: string[];
    knipIgnoreDependencies: string[];
  } = await prompts.prompt(knipPrompts);

  if (knipEntry.length > 0 && knipProject.length > 0) {
    modulesConfig[EModulesKnip.KNIP] = {
      entry: knipEntry.filter((entry) => !!entry),
      project: knipProject.filter((entry) => !!entry),
      ignore: knipIgnore.filter((entry) => !!entry),
      ignoreDependencies: knipIgnoreDependencies.filter((entry) => !!entry),
    };
  }
};
