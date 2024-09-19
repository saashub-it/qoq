/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';
import isEqual from 'react-fast-compare';

import { QoqConfig } from '@/helpers/types';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { getFilesExtensions } from '../helpers';
import { IModulesConfig } from '../types';

import { TJscpdFormat } from './types';

export class JscpdConfigHandler extends AbstractConfigHandler {
  static readonly DEFAULT_THRESHOLD = 2;
  static readonly DEFAULT_IGNORE = [];
  async getPrompts(): Promise<void> {
    const {
      jscpdThreshold,
      jscpdFormat,
      jscpdIgnore,
    }: {
      jscpdThreshold: number;
      jscpdFormat: string[];
      jscpdIgnore: string[];
    } = await prompts.prompt([
      {
        type: 'number',
        name: 'jscpdThreshold',
        message: `What threshold should we use for copy/paste detector?`,
        initial: JscpdConfigHandler.DEFAULT_THRESHOLD,
      },
      {
        type: 'list',
        name: 'jscpdFormat',
        message:
          'Provide files format (initially autodetected from previous config), space " " separated',
        separator: ' ',
        initial: this.getDefaultFormat().join(' '),
      },
      {
        type: 'list',
        name: 'jscpdIgnore',
        message:
          'Provide files format (initially autodetected from previous config), space " " separated',
        separator: ' ',
        initial: this.getDefaultIgnore().join(' '),
      },
    ]);

    this.modulesConfig.modules.jscpd = {
      threshold: jscpdThreshold ?? JscpdConfigHandler.DEFAULT_THRESHOLD,
      format: jscpdFormat.filter((entry) => !!entry),
      ignore: jscpdIgnore.filter((entry) => !!entry),
    };

    return super.getPrompts();
  }

  getConfigFromModules(): QoqConfig {
    const {
      modules: { jscpd },
    } = this.modulesConfig;

    this.config.jscpd = { format: jscpd?.format as TJscpdFormat[] };

    if (jscpd?.threshold && jscpd.threshold !== JscpdConfigHandler.DEFAULT_THRESHOLD) {
      this.config.jscpd.threshold = jscpd.threshold;
    }

    if (jscpd?.ignore && !isEqual(jscpd.ignore, JscpdConfigHandler.DEFAULT_IGNORE)) {
      this.config.jscpd.ignore = jscpd.ignore;
    }

    return super.getConfigFromModules();
  }

  getModulesFromConfig(): IModulesConfig {
    this.modulesConfig.modules.jscpd = {
      format: this.config.jscpd?.format ?? this.getDefaultFormat(),
      threshold: this.config.jscpd?.threshold ?? JscpdConfigHandler.DEFAULT_THRESHOLD,
      ignore: this.config.jscpd?.ignore ?? this.getDefaultIgnore(),
    };

    return super.getModulesFromConfig();
  }

  protected getDefaultFormat = (): TJscpdFormat[] =>
    getFilesExtensions(this.modulesConfig.modules).map((key) => {
      switch (key) {
        case 'js':
          return 'javascript';

        case 'ts':
          return 'typescript';

        default:
          return key;
      }
    }) as TJscpdFormat[];

  protected getDefaultIgnore = (): string[] =>
    this.getDefaultFormat().map(
      (key) => `**/*.spec.${key.replace('javascript', 'js').replace('typescript', 'ts')}`
    );
}
