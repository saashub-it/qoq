/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access */
import { existsSync } from 'fs';
import c from 'picocolors';
import prompts from 'prompts';

import { CONFIG_FILE_PATH, DEFAULT_SRC } from '@/helpers/constants';
import { EConfigType } from '@/helpers/types';

import { allModules } from '../constants';
import { createEslintConfig } from '../eslint/configure';
import { createJscpdConfig } from '../jscpd/configure';
import { createKnipConfig } from '../knip/configure';
import { createPrettierConfig } from '../prettier/configure';

import { createBasicConfig } from './configure';
import { EModulesConfig, QoqConfig } from './types';
import { parseConfigToModules, parseModulesToConfig } from './helpers';
import { TModulesInitialWithEslint } from '../types';

export const createConfig = async (): Promise<TModulesInitialWithEslint> => {
  const modules = await createKnipConfig(
    await createJscpdConfig(
      await createEslintConfig(
        await createPrettierConfig(await createBasicConfig({ ...allModules }))
      )
    )
  );

  // await installPackages(Object.keys(modulesConfig).filter((key) => !!modulesConfig[key]));

  // prepareConfig(srcPath, modulesConfig, configType);

  return modules;
};

export const getConfig = async (skipInit: boolean = false): Promise<TModulesInitialWithEslint> => {
  if (!skipInit && !existsSync(CONFIG_FILE_PATH)) {
    const { config } = await prompts.prompt({
      type: 'toggle',
      name: 'config',
      message: `No QoQ config found, do You want to run setup now?`,
      initial: true,
      active: c.green('yes'),
      inactive: c.red('no'),
    });

    // if (!config) {
    //   process.stderr.write('Running with defaults\n');

    //   return parseModulesToConfig({
    //     ...allModules,
    //     [EModulesConfig.BASIC]: { srcPath: DEFAULT_SRC, configType: '' as EConfigType },
    //   });
    // }

    return createConfig();
  }

  try {
    const config = await import(CONFIG_FILE_PATH);

    return parseConfigToModules(config.default as QoqConfig);
  } catch {
    // return prepareConfig({
    //   ...allModules,
    //   [EModulesConfig.BASIC]: { srcPath: DEFAULT_SRC, configType: '' as EConfigType },
    // });
  }
};
