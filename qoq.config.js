module.exports = {
  srcPath: './src',
  eslint: [
      {
        extends: '@saashub/qoq-eslint-v9-ts',
        files: ['src/**/*.{js,ts}'],
        ignores: ['**/*.spec.{js,ts}'],
      },
      {
        extends: '@saashub/qoq-eslint-v9-ts-vitest',
        files: ['src/**/*.spec.{js,ts}'],
        ignores: [],
      },
    
  ],
};
