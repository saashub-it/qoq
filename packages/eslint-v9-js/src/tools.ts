import merge from 'lodash/merge.js';
import omit from 'lodash/omit.js';

import type { Linter } from 'eslint';

export const omitRules = (sourceConfig: Linter.Config, rulesToOmit: string[]): Linter.Config => {
  const newConfig = merge({}, sourceConfig);

  newConfig.rules = omit(newConfig.rules, rulesToOmit);

  return newConfig;
};

export const omitRulesForConfigCollection = (
  sourceConfigs: Linter.Config[],
  rulesToOmit: string[]
): Linter.Config[] => sourceConfigs.map((sourceConfig) => omitRules(sourceConfig, rulesToOmit));

export const addIgnoresToConfigCollection = (
  sourceConfigs: Linter.Config[],
  ignores: string[]
): Linter.Config[] =>
  sourceConfigs.map((sourceConfig) =>
    merge({}, sourceConfig, { ignores: [...sourceConfig.ignores, ...ignores] })
  );
