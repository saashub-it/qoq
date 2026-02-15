import esbuild from 'rollup-plugin-esbuild';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export const binPlugins = [
  json(),
  commonjs(),
  esbuild({
    target: 'node18',
  }),
  terser()
];
