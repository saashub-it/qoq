import { EslintConfig, baseConfig } from '@saashub/qoq-eslint-v9-js';
import { omitRules } from '@saashub/qoq-eslint-v9-js/tools';
import typeScriptPlugin from '@typescript-eslint/eslint-plugin';
import * as typeScriptParser from '@typescript-eslint/parser';
import * as importPlugin from 'eslint-plugin-import';
import merge from 'lodash/merge.js';

const config: EslintConfig = merge(
  {},
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
  omitRules(baseConfig, Object.keys(importPlugin.configs.recommended.rules)),
  {
    name: '@saashub/qoq-eslint-v9-ts',
    languageOptions: {
      parser: typeScriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': typeScriptPlugin,
    },
    rules: {
      'no-undef': 0, // from plugin page: "It is safe to disable this rule when using TypeScript because TypeScript's compiler enforces this check
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ...importPlugin.configs.typescript.rules,
      'import/no-cycle': 'warn',
      'import/no-duplicates': 'warn',
      'import/no-named-default': 'warn',
      ...typeScriptPlugin.configs.recommended.rules,
      ...typeScriptPlugin.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/no-unsafe-assignment': 0, // strange rule, turned off for now
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'interface',
          prefix: ['I'],
          format: ['PascalCase'],
        },
        {
          selector: 'typeAlias',
          prefix: ['T'],
          format: ['PascalCase'],
        },
        {
          selector: 'enum',
          prefix: ['E'],
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: ['classProperty', 'classMethod', 'method', 'function'],
          format: ['camelCase'],
        },
        {
          selector: ['classProperty'],
          modifiers: ['static'],
          format: ['UPPER_CASE'],
        },
        {
          selector: 'parameter',
          leadingUnderscore: 'allow',
          format: ['camelCase'],
          filter: {
            regex: '(_{1}|_{2})',
            match: false,
          },
        },
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-misused-promises': ['warn', { checksVoidReturn: false }],
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'after-used' }],
      '@typescript-eslint/require-await': 'warn',
    },
    settings: {
      'import/resolver': {
        typescript: {},
      },
    },
  }
);

export default config;
