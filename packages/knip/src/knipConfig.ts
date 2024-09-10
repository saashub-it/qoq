export const getKnipConfig: (
  srcPath?: string,
  entry?: string[],
  project?: string[],
  ignore?: string[],
  ignoreDependencies?: string[]
) => { entry: string[]; project: string[]; ignore: string[]; ignoreDependencies: string[] } = (
  srcPath = '.src',
  entry = [`${srcPath}/index.js`],
  project = [`${srcPath}/**/*.js`],
  ignore = ['package.json'],
  ignoreDependencies = []
) => ({
  entry,
  project,
  ignore,
  ignoreDependencies,
});
