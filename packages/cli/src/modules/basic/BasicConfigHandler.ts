/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';

import { DEFAULT_SRC } from '@/helpers/constants';
import { EConfigType, QoqConfig } from '@/helpers/types';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { IModulesConfig } from '../types';

export class BasicConfigHandler extends AbstractConfigHandler {
  async getPrompts(): Promise<void> {
    const { srcPath, configType }: { srcPath: string; configType: EConfigType } =
      await prompts.prompt([
        {
          type: 'text',
          name: 'srcPath',
          message: `What's your project source path (from project root dir)?`,
          initial: DEFAULT_SRC,
        },
        {
          type: 'select',
          name: 'configType',
          message: 'In what format should we create config file?',
          choices: [
            { title: EConfigType.CJS, value: EConfigType.CJS },
            { title: EConfigType.ESM, value: EConfigType.ESM },
          ],
        },
      ]);

    this.modulesConfig.srcPath = srcPath;
    this.modulesConfig.configType = configType;

    return super.getPrompts();
  }

  getConfigFromModules(): QoqConfig {
    const { srcPath } = this.modulesConfig;

    if (srcPath !== DEFAULT_SRC) {
      this.config.srcPath = srcPath;
    }

    return super.getConfigFromModules();
  }

  getModulesFromConfig(): IModulesConfig {
    this.modulesConfig.srcPath = this.config.srcPath ?? DEFAULT_SRC;

    return super.getModulesFromConfig();
  }
}
