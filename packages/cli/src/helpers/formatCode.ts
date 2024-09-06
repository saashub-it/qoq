export const formatCjs = (
  imports: Record<string, string>,
  content: string[],
  exports: string
): string => {
  const importArray = Object.keys(imports).map(
    (name) => `const ${name} = require('${imports[name]}')`
  );

  return `${[...importArray, ...content].join(';')}; module.exports = ${exports}`;
};

export const formatEsm = (
  imports: Record<string, string>,
  content: string[],
  exports: string
): string => {
  const importArray = Object.keys(imports).map((name) => `import ${name} from '${imports[name]}'`);

  return `${[...importArray, ...content].join(';')}; export default ${exports}`;
};
