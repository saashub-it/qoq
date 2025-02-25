import tsconfigPaths from 'vite-tsconfig-paths';
import { commonConfig } from '../../vitest.config.mjs';

commonConfig.test.coverage.exclude = [...commonConfig.test.coverage.exclude, '**/__tests__/**', '**/types.ts'];

export default { ...commonConfig, plugins: [tsconfigPaths()] };
