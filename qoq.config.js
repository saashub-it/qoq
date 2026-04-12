import { getNoRestrictedImportsPaths } from '@saashub/qoq-eslint-v9-js';

const rules = {
  'no-restricted-imports': [
    1,
    {
      paths: getNoRestrictedImportsPaths(),
    },
  ],
};

export default {
  prettier: {
    sources: ['.'],
  },
  jscpd: {
    threshold: 10,
  },
  knip: {
    entry: './src/index.{js,ts}',
    project: './src/**/*.{js,ts}',
    ignore: [
      '**/bin.ts',
      '**/rollup.*.js',
      '**/vitest.config.js',
      'eslint.config.js',
      'qoq.config.js',
      'packages/cli/src/types.ts',
    ],
    ignoreDependencies: [
      // build specific
      '@rollup/*',
      'rollup-*',
      'esbuild',
      // this is subpackage specific
      'pkg-types',
      '@eslint/compat',
      'jscpd',
      'prettier-plugin-sort-json',
      'browserslist',
      'stylelint-*',
      'eslint-plugin-import-x',
      '@typescript-eslint/utils',
      '@textlint/*',
      'textlint*',
    ],
  },
  eslint: [
    {
      template: '@saashub/qoq-eslint-v9-ts',
      files: ['packages/**/src/**/*.ts'],
      ignores: ['**/*.spec.ts'],
      rules,
    },
    {
      template: '@saashub/qoq-eslint-v9-js',
      files: ['packages/**/src/**/*.js'],
      ignores: ['**/*.spec.js'],
      rules,
    },
    {
      template: '@saashub/qoq-eslint-v9-ts-vitest',
      files: ['packages/**/src/**/*.spec.ts'],
      ignores: [],
      rules,
    },
    {
      template: '@saashub/qoq-eslint-v9-js-vitest',
      files: ['packages/**/src/**/*.spec.js'],
      ignores: [],
      rules,
    },
  ],
  skillslint: {
    path: './skills',
  },
};
