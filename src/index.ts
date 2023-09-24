import { AbstractEslintConfigProvider, IEslintConfig, emptyEslintConfig } from '@qoq/eslint';
import EslintCommonProvider from '@qoq/eslint-common';
import EslintBrowserProvider from '@qoq/eslint-browser';

export class EslintConfig {
  constructor(private readonly providers: AbstractEslintConfigProvider[]) {
    //
  }

  getConfig(): IEslintConfig {
    return this.providers.reduce((config, provider) => {
      return provider.getConfig(config);
    }, emptyEslintConfig);
  }
}

const eslintConfig = new EslintConfig([new EslintCommonProvider(), new EslintBrowserProvider()]);

console.log(JSON.stringify(eslintConfig.getConfig()));
