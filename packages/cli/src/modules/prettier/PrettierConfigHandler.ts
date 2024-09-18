/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import c from 'picocolors';
import prompts from 'prompts';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { IModulesConfig } from '../types';
import { DEFAULT_PRETTIER_SOURCES } from './constants';
import { EModulesPrettier } from './types';
import { QoqConfig } from '../basic/types';
import isEqual from 'react-fast-compare';
import { resolveCwdRelativePath } from '@/helpers/paths';
import { existsSync } from 'fs';

export class PrettierConfigHandler extends AbstractConfigHandler {
  static CONFIG_FILE_PATH = resolveCwdRelativePath('/.prettierrc');

  getPrompts(): Promise<void> {
    return prompts
      .prompt([
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
      ])
      .then(
        ({
          /**
           * @todo write prettier confg
           */
          // prettierSources,
          prettierSources,
        }: {
          prettierPackage: EModulesPrettier.PRETTIER | EModulesPrettier.PRETTIER_WITH_JSON_SORT;
          prettierSources: string[];
        }) => {
          this.modulesConfig.modules.prettier = {
            sources: prettierSources
              ? prettierSources.filter((entry) => !!entry)
              : DEFAULT_PRETTIER_SOURCES,
          };

          return super.getPrompts();
        }
      );
  }

  getConfigFromModules(): QoqConfig {
    const {
      modules: { prettier },
    } = this.modulesConfig;

    if (prettier?.sources && !isEqual(prettier.sources, DEFAULT_PRETTIER_SOURCES)) {
      this.config.prettier = { ...prettier };
    }

    return super.getConfigFromModules();
  }

  getModulesFromConfig(): IModulesConfig {
    /**
     * @todo add logic here
     */
    return super.getModulesFromConfig();
  }

  // protected configFileExists(): boolean {
  //   return existsSync(PrettierConfigHandler.CONFIG_FILE_PATH);
  // }
}
