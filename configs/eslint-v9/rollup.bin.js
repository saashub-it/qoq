import { binPlugins } from '../bin/rollupPlugins.js';

export default {
  input: {
    bin: './src/bin.ts',
  },
  plugins: binPlugins,
  output: [
    {
      dir: './bin',
      entryFileNames: '[name].js',
    },
  ],
};
