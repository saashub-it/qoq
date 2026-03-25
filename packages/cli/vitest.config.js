import { defineProject, mergeConfig } from 'vitest/config';
import { commonConfig } from '../../vitest.config.js';

export default mergeConfig(
  commonConfig,
  defineProject({
    resolve: {
      tsconfigPaths: true,
    },
  })
);
