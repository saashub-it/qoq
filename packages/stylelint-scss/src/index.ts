import { baseConfig as baseCssConfig } from '@saashub/qoq-stylelint-css';

import type { Config } from 'stylelint';

export const baseConfig: Config = {
  ...baseCssConfig,
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order', 'stylelint-prettier'],
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      rules: {
        'plugin/no-unsupported-browser-features': [
          true,
          {
            severity: 'warning',
            ignore: ['css-nesting'],
          },
        ],
      },
    },
  ],
};
