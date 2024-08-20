const typescript = require('@rollup/plugin-typescript');

const sourceDir = './src';
const outputDir = './lib';
const input = {
  'index': `${sourceDir}/index.ts`,
  'baseConfig': `${sourceDir}/baseConfig.ts`,
  'eslintConfig': `${sourceDir}/eslintConfig.ts`,
};
const plugins = [typescript()];

module.exports = {
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
      exports: 'auto',
    },
  ],
};
