/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { IModulesConfig } from '../types';
import { QoqConfig } from '../basic/types';
import { getDefaultKnipEntry, getDefaultKnipIgnore, getDefaultKnipProject } from './helpers';

export class KnipConfigHandler extends AbstractConfigHandler {
  getPrompts(): Promise<void> {
    return prompts
      .prompt([
        {
          type: 'list',
          name: 'knipEntry',
          message:
            'Provide entry (initially autodetected from previous config), space " " separated',
          separator: ' ',
          initial: getDefaultKnipEntry(this.modulesConfig).join(' '),
        },
        {
          type: 'list',
          name: 'knipProject',
          message:
            'Provide project (initially autodetected from previous config), space " " separated',
          separator: ' ',
          initial: getDefaultKnipProject(this.modulesConfig).join(' '),
        },
        {
          type: 'list',
          name: 'knipIgnore',
          message:
            'Provide ignore (initially autodetected from previous config), space " " separated',
          separator: ' ',
          initial: getDefaultKnipIgnore(this.modulesConfig).join(' '),
        },
        {
          type: 'list',
          name: 'knipIgnoreDependencies',
          message:
            'Provide ignoreDependencies (initially autodetected from previous config), space " " separated',
          separator: ' ',
        },
      ])
      .then(
        ({
          knipEntry,
          knipProject,
          knipIgnore,
          knipIgnoreDependencies,
        }: {
          knipEntry: string[];
          knipProject: string[];
          knipIgnore: string[];
          knipIgnoreDependencies: string[];
        }) => {
          this.modulesConfig.modules.knip = {
            entry: knipEntry.filter((entry) => !!entry),
            project: knipProject.filter((entry) => !!entry),
            ignore: knipIgnore.filter((entry) => !!entry),
            ignoreDependencies: knipIgnoreDependencies.filter((entry) => !!entry),
          };

          return super.getPrompts();
        }
      );
  }

  getConfigFromModules(): QoqConfig {
    /**
     * @todo add logic here
     */
    return super.getConfigFromModules();
  }

  getModulesFromConfig(): IModulesConfig {
    /**
     * @todo add logic here
     */
    return super.getModulesFromConfig();
  }
}
