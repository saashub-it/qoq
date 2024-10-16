import typescript from '@rollup/plugin-typescript';

const sourceDir = './src';
const outputDir = './lib';
const input = {
  index: `${sourceDir}/index.ts`,
};
const plugins = [typescript({
  exclude: ['**/*.spec.{js,ts}', 'types.ts']
})];

export default {
  input,
  plugins,
  output: [
    {
      dir: outputDir,
      format: 'esm',
      entryFileNames: '[name].mjs',
    },
    {
      dir: outputDir,
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
  ],
};