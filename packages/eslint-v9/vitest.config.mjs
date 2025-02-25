import { defineConfig } from 'vitest/config';
import commonConfig from '../../vitest.config.mjs';

commonConfig.test.coverage.exclude = ['**/*.spec.[jt]s'];

export default defineConfig(commonConfig);
