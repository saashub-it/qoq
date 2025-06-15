module.exports = {
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
      '**/rollup.*.mjs',
      '**/vitest.config.mjs',
      'eslint.config.js',
      'qoq.config.js',
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
      'eslint-plugin-import',
      '@typescript-eslint/utils'
    ],
  },
  eslint: [
    {
      template: '@saashub/qoq-eslint-v9-ts',
      files: ['packages/**/src/**/*.{ts}'],
      ignores: ['**/*.spec.{ts}'],
    },
    {
      template: '@saashub/qoq-eslint-v9-js',
      files: ['packages/**/src/**/*.{js}'],
      ignores: ['**/*.spec.{js}'],
    },
    {
      template: '@saashub/qoq-eslint-v9-ts-vitest',
      files: ['packages/**/src/**/*.spec.{ts}'],
      ignores: [],
    },
    {
      template: '@saashub/qoq-eslint-v9-js-vitest',
      files: ['packages/**/src/**/*.spec.{js}'],
      ignores: [],
    },
  ],
};
