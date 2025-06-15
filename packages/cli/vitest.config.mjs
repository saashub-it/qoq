import { defineProject, mergeConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { commonConfig } from '../../vitest.config.mjs';

export default mergeConfig(
  commonConfig,
  defineProject({
    plugins: [tsconfigPaths()],
  })
);
