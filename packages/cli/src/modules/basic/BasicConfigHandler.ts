/* eslint-disable @typescript-eslint/no-unsafe-call */
import { readFileSync } from 'fs';

import { resolveCwdRelativePath } from '@saashub/qoq-utils';
import prompts from 'prompts';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { EslintConfigHandler } from '../eslint/EslintConfigHandler';
import { PrettierConfigHandler } from '../prettier/PrettierConfigHandler';
import { StylelintConfigHandler } from '../stylelint/StylelintConfigHandler';
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
    const {
      srcPath,
      configPaths: { eslint, prettier, stylelint },
    } = this.modulesConfig;

    if (srcPath !== DEFAULT_SRC) {
      this.config.srcPath = srcPath;
    }

    this.config.configPaths = {};

    if (eslint !== EslintConfigHandler.CONFIG_FILE_PATH) {
      this.config.configPaths.eslint = eslint;
    }

    if (prettier !== PrettierConfigHandler.CONFIG_FILE_PATH) {
      this.config.configPaths.prettier = prettier;
    }

    if (stylelint !== StylelintConfigHandler.CONFIG_FILE_PATH) {
      this.config.configPaths.stylelint = stylelint;
    }

    if (Object.keys(this.config.configPaths).length === 0) {
      delete this.config.configPaths;
    }

    return super.getConfigFromModules();
  }

  getModulesFromConfig(): IModulesConfig {
    this.modulesConfig.srcPath = this.config.srcPath ?? DEFAULT_SRC;
    this.modulesConfig.configPaths = {
      eslint: this.config.configPaths?.eslint ?? EslintConfigHandler.CONFIG_FILE_PATH,
      prettier: this.config.configPaths?.prettier ?? PrettierConfigHandler.CONFIG_FILE_PATH,
      stylelint: this.config.configPaths?.stylelint ?? StylelintConfigHandler.CONFIG_FILE_PATH,
    };

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
