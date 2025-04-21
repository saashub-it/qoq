/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';
import isEqual from 'react-fast-compare';

import { omitStartingDotFromPath } from '@/helpers/common';
import { QoqConfig } from '@/helpers/types';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { getFilesExtensions } from '../helpers';
import { IModulesConfig } from '../types';

export class KnipConfigHandler extends AbstractConfigHandler {
  static readonly DEFAULT_IGNORE = [];
  static readonly DEFAULT_IGNORE_DEPENDENCIES = ['@saashub/qoq-*'];

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
      entry: knipEntry.filter((entry) => !!entry).map(omitStartingDotFromPath),
      project: knipProject.filter((entry) => !!entry).map(omitStartingDotFromPath),
      ignore: knipIgnore.filter((entry) => !!entry).map(omitStartingDotFromPath),
      ignoreDependencies: knipIgnoreDependencies.filter((entry) => !!entry),
    };

    return super.getPrompts();
  }

  getConfigFromModules(): QoqConfig {
    const {
      modules: { knip },
    } = this.modulesConfig;

    this.config.knip = {};

    if (knip?.entry && !isEqual(knip.entry, this.getDefaultEntry())) {
      this.config.knip.entry = knip.entry;
    }

    if (knip?.project && !isEqual(knip.project, this.getDefaultProject())) {
      this.config.knip.project = knip.project;
    }

    if (
      knip?.ignore &&
      knip.ignore.length > 0 &&
      !isEqual(knip.ignore, KnipConfigHandler.DEFAULT_IGNORE)
    ) {
      this.config.knip.ignore = knip.ignore;
    }

    if (
      knip?.ignoreDependencies &&
      knip.ignoreDependencies.length > 0 &&
      !isEqual(knip.ignoreDependencies, KnipConfigHandler.DEFAULT_IGNORE_DEPENDENCIES)
    ) {
      this.config.knip.ignoreDependencies = knip.ignoreDependencies;
    }

    if (Object.keys(this.config.knip).length === 0) {
      delete this.config.knip;
    }

    return super.getConfigFromModules();
  }

  getModulesFromConfig(): IModulesConfig {
    this.modulesConfig.modules.knip = {
      entry: this.config.knip?.entry ?? this.getDefaultEntry(),
      project: this.config.knip?.project ?? this.getDefaultProject(),
      ignore: this.config.knip?.ignore
        ? [...KnipConfigHandler.DEFAULT_IGNORE, ...this.config.knip.ignore]
        : KnipConfigHandler.DEFAULT_IGNORE,
      ignoreDependencies: this.config.knip?.ignoreDependencies
        ? [...KnipConfigHandler.DEFAULT_IGNORE_DEPENDENCIES, ...this.config.knip.ignoreDependencies]
        : KnipConfigHandler.DEFAULT_IGNORE_DEPENDENCIES,
    };

    return super.getModulesFromConfig();
  }

  getPackages(): string[] {
    this.packages = ['@saashub/qoq-knip'];

    return super.getPackages();
  }

  protected getDefaultEntry = (): string[] => {
    const { srcPath, modules } = this.modulesConfig;
    const pathString = omitStartingDotFromPath(srcPath);

    return [`${pathString}/{index,cli,main,root}.{${getFilesExtensions(modules).join()}}`];
  };

  protected getDefaultProject = (): string[] => {
    const { srcPath, modules } = this.modulesConfig;
    const pathString = omitStartingDotFromPath(srcPath);

    return [`${pathString}/**/*.{${getFilesExtensions(modules).join()}}`];
  };
}
