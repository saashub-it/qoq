import { defineConfig } from 'vitest/config';

export const commonConfig = {
  test: {
    coverage: {
      include: ['**/src'],
      exclude: ['**/*.spec.[jt]s', '**/index.[jt]s'],
    },
  },
};

export default defineConfig(commonConfig);
