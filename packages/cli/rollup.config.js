import { dts } from 'rollup-plugin-dts';

const sourceDir = './src';
const outputDir = './bin';
const plugins = [dts()];

export default {
  input: `${sourceDir}/types.ts`,
  plugins,
  output: [{ file: `${outputDir}/types.d.ts` }],
};
