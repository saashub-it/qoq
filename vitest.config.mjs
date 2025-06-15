import { defineConfig } from 'vitest/config';

export const commonConfig = {
  test: {
    projects: ['packages/*'],
    coverage: {
      include: ['**/src'],
      exclude: ['**/*.spec.[jt]s', '**/__tests__/**', '**/types.ts'],
    },
  },
};

export default defineConfig(commonConfig);
