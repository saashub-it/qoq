/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { existsSync, writeFileSync } from 'fs';
import util from 'util';

import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import c from 'picocolors';
import prompts from 'prompts';

import { CONFIG_FILE_PATH, DEFAULT_SRC } from '@/helpers/constants';
import { formatCode } from '@/helpers/formatCode';
import { installPackages } from '@/helpers/packages';
import { allModules, defaultModules, EConfigType } from '@/helpers/types';

import { createEslintConfig } from '../eslint/configure';
import { createJscpdConfig } from '../jscpd/configure';
import { createKnipConfig } from '../knip/configure';
import { createPrettierConfig } from '../prettier/configure';

import { createBasicConfig } from './configure';
import { QoqConfig, TModulesWithConfig } from './types';

export const prepareConfig = (
  srcPath: string,
  modulesConfig: TModulesWithConfig,
  configType?: EConfigType
): QoqConfig => {
  const config = Object.keys(modulesConfig)
    .filter((key) => modulesConfig[key])
    .reduce(
      (acc, key) => {
        switch (true) {
          case key.includes('prettier'): {
            const newValue = merge({}, acc['prettier'] || {}, modulesConfig[key]);

            if (configType && isEmpty(newValue)) {
              return acc;
            }

            acc['prettier'] = newValue;

            return acc;
          }

          case key.includes('eslint'): {
            const newValue = merge({}, acc['eslint'] || {}, { [key]: modulesConfig[key] });

            if (configType && isEmpty(newValue)) {
              return acc;
            }

            acc['eslint'] = newValue;

            return acc;
          }

          case key.includes('jscpd'): {
            acc['jscpd'] = {};

            return acc;
          }

          default:
            return acc;
        }
      },
      configType && srcPath === DEFAULT_SRC ? {} : { srcPath }
    );

  if (configType) {
    const exports = util.inspect(config, { showHidden: false, compact: false, depth: null });

    writeFileSync(CONFIG_FILE_PATH, formatCode(configType, {}, [], exports));
  }

  return config;
};

export const createConfig = async (modules: TModulesWithConfig): Promise<QoqConfig> => {
  const modulesConfig = Object.keys(modules).reduce((acc, key) => {
    acc[key] = false;

    return acc;
  }, {} as TModulesWithConfig);

  const { srcPath, configType } = await createBasicConfig();

  await createPrettierConfig(modulesConfig);
  await createEslintConfig(modulesConfig, srcPath);
  await createJscpdConfig(modulesConfig, srcPath, configType);
  await createKnipConfig(modulesConfig, srcPath, configType);

  await installPackages(Object.keys(modulesConfig).filter((key) => !!modulesConfig[key]));

  prepareConfig(srcPath, modulesConfig, configType);

  return prepareConfig(srcPath, modulesConfig);
};

export const getConfig = async (skipInit: boolean = false): Promise<QoqConfig> => {
  if (!skipInit && !existsSync(CONFIG_FILE_PATH)) {
    const { config } = await prompts.prompt({
      type: 'toggle',
      name: 'config',
      message: `No QoQ config found, do You want to run setup now?`,
      initial: true,
      active: c.green('yes'),
      inactive: c.red('no'),
    });

    if (!config) {
      process.stderr.write('Running with defaults\n');

      return prepareConfig(DEFAULT_SRC, defaultModules);
    }

    return createConfig(skipInit ? defaultModules : allModules);
  }

  try {
    const config = await import(CONFIG_FILE_PATH);

    return config.default as QoqConfig;
  } catch {
    return prepareConfig(DEFAULT_SRC, defaultModules);
  }
};
