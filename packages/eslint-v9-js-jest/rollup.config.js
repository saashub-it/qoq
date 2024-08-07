const typescript = require('@rollup/plugin-typescript');

const sourceDir = './src';
const outputDir = './lib';
const input = `${sourceDir}/index.ts`;
const plugins = [typescript()];

module.exports = {
  input,
  plugins,
  output: [
    {
      dir: outputDir,
      format: 'esm',
      preserveModules: true,
      entryFileNames: '[name].mjs',
    },
    {
      dir: outputDir,
      format: 'cjs',
      preserveModules: true,
      exports: 'auto',
    },
  ],
};
