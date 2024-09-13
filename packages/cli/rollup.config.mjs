import { readFileSync } from 'fs';
import { builtinModules } from 'module';
import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

const pkg = JSON.parse(readFileSync('./package.json'));

const sourceDir = './src';
const outputDir = './bin';
const input = {
  qoq: `${sourceDir}/index.ts`,
};
const plugins = [
  typescriptPaths({preserveExtensions: true}),
  nodeResolve({
    preferBuiltins: true,
  }),
  json(),
  commonjs(),
  esbuild({
    target: 'node18',
  }),
];

const external = [
  ...builtinModules,
  ...Object.keys(pkg.dependencies),
];

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
