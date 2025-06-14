import type { Config } from 'stylelint';

export interface StylelintConfig extends Config {
  // just for sake os TS
}

export const baseConfig: StylelintConfig = {
  extends: ['stylelint-config-standard', 'stylelint-config-clean-order', 'stylelint-prettier'],
  plugins: [
    'stylelint-file-max-lines',
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
  ],
  rules: {
    'plugin/file-max-lines': 600,
    'plugin/no-low-performance-animation-properties': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
      },
    ],
  },
};
