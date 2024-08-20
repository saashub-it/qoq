import merge from 'lodash/merge';
import omit from 'lodash/omit';

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
