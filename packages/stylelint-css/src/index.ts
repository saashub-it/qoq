import { Config } from 'stylelint';

export const baseConfig: Config = {
  extends: ['stylelint-config-standard', 'stylelint-prettier'],
  plugins: [
    'stylelint-file-max-lines',
    'stylelint-high-performance-animation',
    'stylelint-no-unsupported-browser-features',
    'stylelint-order',
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
