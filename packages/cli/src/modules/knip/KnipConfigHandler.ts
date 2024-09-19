/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';

import { QoqConfig } from '@/helpers/types';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { configUsesReact, configUsesTs, getFilesExtensions } from '../helpers';
import { IModulesConfig } from '../types';

export class KnipConfigHandler extends AbstractConfigHandler {
  static DEFAULT_IGNORE_DEPENDENCIES = [];
  async getPrompts(): Promise<void> {
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
    } = await prompts.prompt([
      {
        type: 'list',
        name: 'knipEntry',
        message: 'Provide entry (initially autodetected from previous config), space " " separated',
        separator: ' ',
        initial: this.getDefaultEntry().join(' '),
      },
      {
        type: 'list',
        name: 'knipProject',
        message:
          'Provide project (initially autodetected from previous config), space " " separated',
        separator: ' ',
        initial: this.getDefaultProject().join(' '),
      },
      {
        type: 'list',
        name: 'knipIgnore',
        message:
          'Provide ignore (initially autodetected from previous config), space " " separated',
        separator: ' ',
        initial: this.getDefaultIgnore().join(' '),
      },
      {
        type: 'list',
        name: 'knipIgnoreDependencies',
        message:
          'Provide ignoreDependencies (initially autodetected from previous config), space " " separated',
        separator: ' ',
      },
    ]);

    this.modulesConfig.modules.knip = {
      entry: knipEntry.filter((entry) => !!entry),
      project: knipProject.filter((entry) => !!entry),
      ignore: knipIgnore.filter((entry) => !!entry),
      ignoreDependencies: knipIgnoreDependencies.filter((entry) => !!entry),
    };

    return super.getPrompts();
  }

  getConfigFromModules(): QoqConfig {
    const {
      modules: { knip },
    } = this.modulesConfig;

    return super.getConfigFromModules();
  }

  getModulesFromConfig(): IModulesConfig {
    this.modulesConfig.modules.knip = {
      entry: this.config.knip?.entry ?? this.getDefaultEntry(),
      project: this.config.knip?.project ?? this.getDefaultProject(),
      ignore: this.config.knip?.ignore ?? this.getDefaultIgnore(),
      ignoreDependencies:
        this.config.knip?.ignoreDependencies ?? KnipConfigHandler.DEFAULT_IGNORE_DEPENDENCIES,
    };

    return super.getModulesFromConfig();
  }

  protected getDefaultEntry = (): string[] => {
    const { srcPath, modules } = this.modulesConfig;

    switch (true) {
      case configUsesTs(modules) && configUsesReact(modules):
        return [`${srcPath}/index.tsx`];

      case configUsesTs(modules):
        return [`${srcPath}/index.ts`];

      case configUsesReact(modules):
        return [`${srcPath}/index.jsx`];

      default:
        return [`${srcPath}/index.js`];
    }
  };

  protected getDefaultProject = (): string[] => {
    const { srcPath, modules } = this.modulesConfig;

    return [`${srcPath}/**/*.{${getFilesExtensions(modules).join()}}`];
  };

  protected getDefaultIgnore = (): string[] => {
    const { modules } = this.modulesConfig;
    const ignore = ['package.json'];

    if (configUsesTs(modules)) {
      ignore.push('tsconfig.json');
    }

    return ignore;
  };
}
