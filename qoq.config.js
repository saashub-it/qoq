module.exports = {
  prettier: {
    sources: ['.']
  },
  eslint: [
    {
      template: '@saashub/qoq-eslint-v9-ts',
      files: ['src/**/*.{js,ts}'],
      ignores: ['**/*.spec.{js,ts}'],
    },
    {
      template: '@saashub/qoq-eslint-v9-ts-vitest',
      files: ['src/**/*.spec.{js,ts}'],
      ignores: [],
    },
  ],
};
