import merge from 'lodash/merge.js';
import omit from 'lodash/omit.js';

import type { EslintConfig } from './index';

export const omitRules = (sourceConfig: EslintConfig, rulesToOmit: string[]): EslintConfig => {
  const newConfig = merge({}, sourceConfig);

  newConfig.rules = omit(newConfig.rules, rulesToOmit);

  return newConfig;
};

export const omitRulesForConfigCollection = (
  sourceConfigs: EslintConfig[],
  rulesToOmit: string[]
): EslintConfig[] => sourceConfigs.map((sourceConfig) => omitRules(sourceConfig, rulesToOmit));

export const addIgnoresToConfigCollection = (
  sourceConfigs: EslintConfig[],
  ignores: string[]
): EslintConfig[] =>
  sourceConfigs.map((sourceConfig) =>
    merge({}, sourceConfig, { ignores: [...(sourceConfig.ignores ?? []), ...ignores] })
  );
