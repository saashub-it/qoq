import merge from 'lodash/merge';
import { IEslintConfig, AbstractEslintConfigProvider } from '@qoq/eslint';

export default class EslintBrowserProvider extends AbstractEslintConfigProvider {
  protected providerConfig: Partial<IEslintConfig> = {
    extends: ['plugin:compat/recommended'],
  };

  getConfig(config: IEslintConfig): IEslintConfig {
    return merge({}, config, this.providerConfig);
  }
}
