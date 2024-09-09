import packageBaseConfig from './baseConfig';
import packageEslintConfig from './eslintConfig';

import type { Linter } from 'eslint';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface EslintConfig extends Linter.Config {
  rules: Linter.RulesRecord;
}

export const baseConfig = packageBaseConfig;
export const eslintConfig = packageEslintConfig;
