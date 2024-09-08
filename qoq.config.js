module.exports = {
  prettier: {
    config: '@saashub/qoq-prettier',
  },
  eslint: {
    excludeRules: ['no-restricted-imports'],
    '@saashub/qoq-eslint-v9-ts': {
      files: ['src/**/*.{js,ts}'],
      ignores: ['**/*.spec.{js,ts}'],
    },
    '@saashub/qoq-eslint-v9-ts-vitest': {
      files: ['src/**/*.spec.{js,ts}'],
      ignores: [],
    },
  },
};
