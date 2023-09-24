import merge from 'lodash/merge';
import { IEslintConfig, AbstractEslintConfigProvider, emptyEslintConfig } from '@qoq/eslint';

export default class EslintCommonProvider extends AbstractEslintConfigProvider {
  protected providerConfig: IEslintConfig = merge({}, emptyEslintConfig, {
    plugins: ['import', 'sonarjs'],
    extends: ['airbnb', 'plugin:sonarjs/recommended'],
    overrides: [
      {
        files: ['./**/*.spec.ts', './**/*.spec.tsx', './typings/**/*'],
        rules: {
          'sonarjs/no-duplicate-string': 0,
          'sonarjs/cognitive-complexity': 0,
          'sonarjs/no-identical-functions': 0,
          'max-lines-per-function': 0,
        },
      },
    ],
  });

  getConfig(config: IEslintConfig): IEslintConfig {
    return merge({}, config, this.providerConfig);
  }
}
