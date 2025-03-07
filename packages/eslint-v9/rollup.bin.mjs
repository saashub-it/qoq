import { binPlugins } from '../bin/rollupPlugins.mjs';

export default {
  input: {
    bin: './src/bin.ts'
  },
  plugins: binPlugins,
  output: [
    {
      dir: './bin',
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
  ],
};
