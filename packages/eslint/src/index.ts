import merge from 'lodash/merge';

type TRules = Record<string, any>;

interface IEslintConfigOverrides {
  files: string[];
  rules: TRules;
}

export interface IEslintConfig {
  root: boolean;
  plugins: string[];
  extends: string[];
  rules: TRules;
  overrides: IEslintConfigOverrides[];
}

export const emptyEslintConfig: IEslintConfig = {
  root: true,
  plugins: [],
  extends: [],
  rules: {},
  overrides: [],
};

export abstract class AbstractEslintConfigProvider {
  getProviderConfig() {
    return this.providerConfig;
  }

  protected providerConfig: Partial<IEslintConfig> = merge({}, emptyEslintConfig);

  abstract getConfig(config: IEslintConfig): IEslintConfig;
}
