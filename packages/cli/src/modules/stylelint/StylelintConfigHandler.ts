/* eslint-disable @typescript-eslint/no-unsafe-call */
import { existsSync, rmSync, writeFileSync } from 'fs';

import c from 'picocolors';
import prompts from 'prompts';

import { formatCode } from '@/helpers/formatCode';
import { resolveCwdRelativePath } from '@/helpers/paths';
import { EConfigType, QoqConfig } from '@/helpers/types';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { IModulesConfig } from '../types';

import { EModulesStylelint } from './types';

export class StylelintConfigHandler extends AbstractConfigHandler {
  static readonly CONFIG_FILE_PATH = resolveCwdRelativePath('/stylelint.config.js');

  async getPrompts(): Promise<void> {
    const {
      stylelint,
    }: {
      stylelint: boolean;
    } = await prompts.prompt([
      {
        type: 'toggle',
        name: 'stylelint',
        message: 'Should we include style linting?',
        initial: false,
        active: c.green('yes'),
        inactive: c.red('no'),
      },
    ]);

    if (!stylelint) {
      return super.getPrompts();
    }

    if (this.configFileExists()) {
      process.stdout.write(
        c.red(
          `\n 'stylelint.config.js' already exists in the project root, config will be overwritten by this setup!\n\n`
        )
      );
    }

    const {
      stylelintPackage,
      stylelintStrict,
    }: {
      stylelintPackage: EModulesStylelint;
      stylelintStrict: boolean;
    } = await prompts.prompt([
      {
        type: 'select',
        name: 'stylelintPackage',
        message: c.reset(`What options should we use for ${c.green('Stylelint')}?`),
        choices: [
          { title: 'CSS', value: EModulesStylelint.STYLELINT_CSS },
          { title: 'SCSS', value: EModulesStylelint.STYLELINT_SCSS },
        ],
      },
      {
        type: 'toggle',
        name: 'stylelintStrict',
        message: 'Should style linting be strict (fail on warnings)?',
        initial: false,
        active: c.green('yes'),
        inactive: c.red('no'),
      },
    ]);

    if (this.configFileExists()) {
      rmSync(StylelintConfigHandler.CONFIG_FILE_PATH);
    }

    writeFileSync(
      StylelintConfigHandler.CONFIG_FILE_PATH,
      formatCode(
        this.modulesConfig.configType,
        {
          config: `@saashub/qoq-cli/bin/stylelint.config.${this.modulesConfig.configType === EConfigType.ESM ? 'm' : 'c'}js`,
        },
        [],
        'config'
      )
    );

    this.modulesConfig.modules.stylelint = {
      strict: stylelintStrict,
      template: stylelintPackage,
    };

    return super.getPrompts();
  }

  getConfigFromModules(): QoqConfig {
    const {
      modules: { stylelint },
    } = this.modulesConfig;

    if (stylelint) {
      const { strict, template } = stylelint;
      this.config.stylelint = {
        strict: !!strict,
      };

      if (template) {
        this.config.stylelint.template = template;
      }
    }

    return super.getConfigFromModules();
  }

  getModulesFromConfig(): IModulesConfig {
    const { modules } = this.modulesConfig;
    const { stylelint } = this.config;

    if (stylelint) {
      const { strict, template } = stylelint;

      modules.stylelint = {
        strict: !!strict,
      };

      if (template) {
        modules.stylelint.template = template;
      }
    }

    return super.getModulesFromConfig();
  }

  getPackages(): string[] {
    const { stylelint } = this.modulesConfig.modules;

    if (stylelint?.template && Object.values(EModulesStylelint).includes(stylelint.template)) {
      this.packages = [stylelint.template];
    }

    return super.getPackages();
  }

  protected configFileExists(): boolean {
    return existsSync(StylelintConfigHandler.CONFIG_FILE_PATH);
  }
}
