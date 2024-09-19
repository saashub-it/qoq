/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import c from 'picocolors';
import prompts from 'prompts';
import isEqual from 'react-fast-compare';

import { resolveCwdRelativePath } from '@/helpers/paths';
import { QoqConfig } from '@/helpers/types';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { IModulesConfig } from '../types';

import { EModulesPrettier } from './types';

export class PrettierConfigHandler extends AbstractConfigHandler {
  static CONFIG_FILE_PATH = resolveCwdRelativePath('/.prettierrc');

  async getPrompts(): Promise<void> {
    const {
      /**
       * @todo write prettier confg
       */
      // prettierSources,
      prettierSources,
    }: {
      prettierPackage: EModulesPrettier.PRETTIER | EModulesPrettier.PRETTIER_WITH_JSON_SORT;
      prettierSources: string[];
    } = await prompts.prompt([
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
    ]);

    const { srcPath } = this.modulesConfig;

    this.modulesConfig.modules.prettier = {
      sources: prettierSources ? prettierSources.filter((entry) => !!entry) : [srcPath],
    };

    return super.getPrompts();
  }

  getConfigFromModules(): QoqConfig {
    const {
      srcPath,
      modules: { prettier },
    } = this.modulesConfig;

    if (prettier?.sources && !isEqual(prettier.sources, [srcPath])) {
      this.config.prettier = { ...prettier };
    }

    return super.getConfigFromModules();
  }

  getModulesFromConfig(): IModulesConfig {
    const { srcPath, modules } = this.modulesConfig;

    modules.prettier = {
      sources: this.config.prettier?.sources ?? [srcPath],
    };

    return super.getModulesFromConfig();
  }

  // protected configFileExists(): boolean {
  //   return existsSync(PrettierConfigHandler.CONFIG_FILE_PATH);
  // }
}
