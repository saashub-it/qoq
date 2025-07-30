/* eslint-disable @typescript-eslint/no-unsafe-call */
import { readFileSync } from 'fs';

import { resolveCwdRelativePath } from '@saashub/qoq-utils';
import prompts from 'prompts';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { IModulesConfig } from '../types';

import { DEFAULT_SRC } from '@/helpers/constants';
import { EConfigType, QoqConfig } from '@/helpers/types';

export class BasicConfigHandler extends AbstractConfigHandler {
  static readonly CONFIG_FILE_PATH = resolveCwdRelativePath('/qoq.config.js');

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

    try {
      const configFileContent = readFileSync(BasicConfigHandler.CONFIG_FILE_PATH, 'utf-8');

      this.modulesConfig.configType =
        configFileContent.includes('module.exports-') ||
        configFileContent.includes('module.exports ')
          ? EConfigType.CJS
          : EConfigType.ESM;
    } catch {
      this.modulesConfig.configType = EConfigType.ESM;
    }

    return super.getModulesFromConfig();
  }

  getPackages(): string[] {
    this.packages = ['@saashub/qoq-cli'];

    return super.getPackages();
  }
}
