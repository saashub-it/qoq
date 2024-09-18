/* eslint-disable @typescript-eslint/no-unsafe-call */
import prompts from 'prompts';

import { AbstractConfigHandler } from '../abstract/AbstractConfigHandler';
import { IModulesConfig } from '../types';
import { QoqConfig } from '../basic/types';
import { DEFAULT_JSCPD_THRESHOLD } from './constants';
import { getDefaultJscpdFormat, getDefaultJscpdIgnore } from './helpers';

export class JscpdConfigHandler extends AbstractConfigHandler {
  getPrompts(): Promise<void> {
    return prompts
      .prompt([
        {
          type: 'number',
          name: 'jscpdThreshold',
          message: `What threshold should we use for copy/paste detector?`,
          initial: DEFAULT_JSCPD_THRESHOLD,
        },
        {
          type: 'list',
          name: 'jscpdFormat',
          message:
            'Provide files format (initially autodetected from previous config), space " " separated',
          separator: ' ',
          initial: getDefaultJscpdFormat(this.modulesConfig).join(' '),
        },
        {
          type: 'list',
          name: 'jscpdIgnore',
          message:
            'Provide files format (initially autodetected from previous config), space " " separated',
          separator: ' ',
          initial: getDefaultJscpdIgnore(this.modulesConfig).join(' '),
        },
      ])
      .then(
        ({
          jscpdThreshold,
          jscpdFormat,
          jscpdIgnore,
        }: {
          jscpdThreshold: number;
          jscpdFormat: string[];
          jscpdIgnore: string[];
        }) => {
          this.modulesConfig.modules.jscpd = {
            threshold: Number(jscpdThreshold) ?? DEFAULT_JSCPD_THRESHOLD,
            format: jscpdFormat.filter((entry) => !!entry),
            ignore: jscpdIgnore.filter((entry) => !!entry),
          };

          return super.getPrompts();
        }
      );
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
