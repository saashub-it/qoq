/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import c from 'picocolors';
import prompts from 'prompts';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { IModulesConfig } from '../types';
import { EModulesEslint } from './types';
import { QoqConfig } from '../basic/types';

export class EslintConfigHandler extends AbstractConfigHandler {
  getPrompts(): Promise<void> {
    return prompts
      .prompt([
        {
          type: 'toggle',
          name: 'eslint',
          message: c.reset(`Do You use ${c.green('TypeScript')} in Your project?`),
          initial: true,
          active: c.green('yes'),
          inactive: c.red('no'),
        },
        {
          type: (prev: boolean) => (prev ? 'multiselect' : null),
          name: 'eslintPackages',
          message: 'What options should we use?',
          choices: [
            { title: 'Basic TypeScript only', value: EModulesEslint.ESLINT_V9_TS },
            { title: 'TypeScript + React', value: EModulesEslint.ESLINT_V9_TS_REACT },
            { title: 'TypeScript + Jest', value: EModulesEslint.ESLINT_V9_TS_JEST },
            { title: 'TypeScript + Vitest', value: EModulesEslint.ESLINT_V9_TS_VITEST },
          ],
          min: 1,
        },
        {
          type: (prev: boolean) => (!prev ? 'multiselect' : null),
          name: 'eslintPackages',
          message: 'What options should we use?',
          choices: [
            { title: 'Basic JavaScript only', value: EModulesEslint.ESLINT_V9_JS },
            { title: 'JavaScript + React', value: EModulesEslint.ESLINT_V9_JS_REACT },
            { title: 'JavaScript + Jest', value: EModulesEslint.ESLINT_V9_JS_JEST },
            { title: 'JavaScript + Vitest', value: EModulesEslint.ESLINT_V9_JS_VITEST },
          ],
          min: 1,
        },
      ])
      .then(({ eslintPackages }: { eslintPackages: EModulesEslint[] }) => {
        const { srcPath } = this.modulesConfig;

        if (eslintPackages.length > 0) {
          const eslintSrcPath = srcPath.startsWith('./') ? srcPath.replace('./', '') : srcPath;

          const configurePackages = async () => {
            this.modulesConfig.modules.eslint = [];

            for (const eslintPackage of eslintPackages) {
              process.stderr.write(
                c.green(`\nProvide configuration for ${eslintPackage} checks:\n`)
              );

              let initialFiles: string;
              let initialIgnores: string;

              switch (true) {
                case eslintPackage === EModulesEslint.ESLINT_V9_JS:
                  initialFiles = `${eslintSrcPath}/**/*.js`;
                  initialIgnores = '**/*.spec.js';
                  break;

                case eslintPackage === EModulesEslint.ESLINT_V9_JS_REACT:
                  initialFiles = `${eslintSrcPath}/**/*.{js,jsx}`;
                  initialIgnores = '**/*.spec.js';
                  break;

                case eslintPackage === EModulesEslint.ESLINT_V9_TS:
                  initialFiles = `${eslintSrcPath}/**/*.{js,ts}`;
                  initialIgnores = '**/*.spec.{js,ts}';
                  break;

                case eslintPackage === EModulesEslint.ESLINT_V9_TS_REACT:
                  initialFiles = `${eslintSrcPath}/**/*.{js,jsx,ts,tsx}`;
                  initialIgnores = '**/*.spec.{js,ts}';
                  break;

                case [
                  EModulesEslint.ESLINT_V9_JS_JEST,
                  EModulesEslint.ESLINT_V9_JS_VITEST,
                ].includes(eslintPackage):
                  initialFiles = `${eslintSrcPath}/**/*.spec.js`;
                  initialIgnores = '';
                  break;

                case [
                  EModulesEslint.ESLINT_V9_TS_JEST,
                  EModulesEslint.ESLINT_V9_TS_VITEST,
                ].includes(eslintPackage):
                  initialFiles = `${eslintSrcPath}/**/*.spec.{js,ts}`;
                  initialIgnores = '';
                  break;

                default:
                  initialFiles = '';
                  initialIgnores = '';
                  break;
              }

              const { files, ignores }: { files: string[]; ignores: string[] } =
                await prompts.prompt([
                  {
                    type: 'list',
                    name: 'files',
                    message: 'Provide files paths (from project root dir), space " " separated',
                    separator: ' ',
                    initial: initialFiles ?? false,
                  },
                  {
                    type: 'list',
                    name: 'ignores',
                    message: 'Provide files paths (from project root dir), space " " separated',
                    separator: ' ',
                    initial: initialIgnores ?? false,
                  },
                ]);

              this.modulesConfig.modules.eslint.push({
                template: eslintPackage,
                files: files.filter((entry) => !!entry),
                ignores: ignores.filter((entry) => !!entry),
              });
            }
          };

          return configurePackages();
        }

        return super.getPrompts();
      })
      .then(() => {
        return super.getPrompts();
      });
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
