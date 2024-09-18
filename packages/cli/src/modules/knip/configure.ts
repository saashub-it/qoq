/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';

import { getDefaultKnipEntry, getDefaultKnipIgnore, getDefaultKnipProject } from './helpers';
import { IModulesConfig } from '../types';

export const createKnipConfig = async (
  modulesConfig: IModulesConfig
): Promise<IModulesConfig> => {
  const knipPrompts = [
    {
      type: 'list',
      name: 'knipEntry',
      message: 'Provide entry (initially autodetected from previous config), space " " separated',
      separator: ' ',
      initial: getDefaultKnipEntry(modulesConfig).join(' '),
    },
    {
      type: 'list',
      name: 'knipProject',
      message: 'Provide project (initially autodetected from previous config), space " " separated',
      separator: ' ',
      initial: getDefaultKnipProject(modulesConfig).join(' '),
    },
    {
      type: 'list',
      name: 'knipIgnore',
      message: 'Provide ignore (initially autodetected from previous config), space " " separated',
      separator: ' ',
      initial: getDefaultKnipIgnore(modulesConfig).join(' '),
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

  modulesConfig.modules.knip = {
    entry: knipEntry.filter((entry) => !!entry),
    project: knipProject.filter((entry) => !!entry),
    ignore: knipIgnore.filter((entry) => !!entry),
    ignoreDependencies: knipIgnoreDependencies.filter((entry) => !!entry),
  }

  return modulesConfig;
};
