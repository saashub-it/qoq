import { EConfigType } from './types';

const formatCjs = (imports: Record<string, string>, content: string[], exports: string): string => {
  const importArray = Object.keys(imports).map(
    (name) => `const ${name} = require('${imports[name]}')`
  );

  const code = [...importArray, ...content];

  return code.length > 0
    ? `${[...importArray, ...content].join(';')}; module.exports = ${exports};`
    : `module.exports = ${exports};`;
};

const formatEsm = (imports: Record<string, string>, content: string[], exports: string): string => {
  const importArray = Object.keys(imports).map((name) => `import ${name} from '${imports[name]}'`);

  const code = [...importArray, ...content];

  return code.length > 0
    ? `${[...importArray, ...content].join(';')}; export default ${exports};`
    : `export default ${exports};`;
};

export const formatCode = (
  format: EConfigType,
  imports: Record<string, string>,
  content: string[],
  exports: string
): string =>
  format === EConfigType.CJS
    ? formatCjs(imports, content, exports)
    : formatEsm(imports, content, exports);
