import merge from 'lodash/merge';
import omit from 'lodash/omit';

import type { Linter } from 'eslint';

export const omitRules = (sourceConfig: Linter.Config, rulesToOmit: string[]): Linter.Config => {
  const newConfig = merge({}, sourceConfig);

  return omit(newConfig.rules, rulesToOmit);
};

export const omitRulesForConfigCollection = (
  sourceConfigs: Linter.Config[],
  rulesToOmit: string[]
): Linter.Config[] => sourceConfigs.map((sourceConfig) => omitRules(sourceConfig, rulesToOmit));
