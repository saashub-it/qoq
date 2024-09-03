import typescript from '@rollup/plugin-typescript';

const sourceDir = './src';
const outputDir = './bin';
const input = {
  qoq: `${sourceDir}/index.ts`,
};
const plugins = [typescript()];

export default {
  input,
  plugins,
  output: [
    {
      dir: outputDir,
      format: 'cjs',
      exports: 'auto',
    },
  ],
};
