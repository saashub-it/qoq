import { resolve } from 'path';
import * as prettier from 'prettier';
import { EModules, TModulesWithConfig } from './types';
import { getPackageInfo } from './packages';

const applyConfig = async (config: TModulesWithConfig): Promise<prettier.Options | null> => {
  const dependency = config[EModules.PRETTIER_WITH_JSON_SORT]
    ? EModules.PRETTIER_WITH_JSON_SORT
    : EModules.PRETTIER;
  const { rootPath } = getPackageInfo(dependency);

  return await prettier.resolveConfig(resolve(rootPath, 'index.json'));
};

export const check = async (config: TModulesWithConfig) => {
  const options = await applyConfig(config);
};

// const text = await fs.readFile(filePath, "utf8");
// const options = await prettier.resolveConfig(filePath);
// const formatted = await prettier.format(text, options);
