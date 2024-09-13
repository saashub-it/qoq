import tsconfigPaths from 'vite-tsconfig-paths'
import config from '../../vitest.config.mjs';

export default { ...config, plugins: [tsconfigPaths()] };
