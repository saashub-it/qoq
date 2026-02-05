import { readFileSync } from 'fs';
import { builtinModules } from 'module';
import nodeResolve from '@rollup/plugin-node-resolve';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { binPlugins } from '../bin/rollupPlugins.mjs';

const pkg = JSON.parse(readFileSync('./package.json'));

const sourceDir = './src';
const outputDir = './bin';
const input = {
  qoq: `${sourceDir}/index.ts`,
};
const plugins = [
  typescriptPaths({ preserveExtensions: true }),
  nodeResolve({
    preferBuiltins: true,
  }),
  ...binPlugins,
];

const external = [...builtinModules, ...Object.keys(pkg.dependencies)];

export default {
  input,
  plugins,
  external,
  output: [
    {
      dir: outputDir,
      format: 'cjs',
      entryFileNames: '[name].cjs',
    },
  ],
};
