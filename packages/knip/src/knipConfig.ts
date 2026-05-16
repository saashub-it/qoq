export const getKnipConfig: (
  srcPath?: string,
  entry?: string[],
  project?: string[],
  ignore?: string[],
  ignoreDependencies?: string[],
  ignoreBinaries?: string[]
) => {
  entry: string[];
  project: string[];
  ignore: string[];
  ignoreDependencies: string[];
  ignoreBinaries: string[];
} = (
  srcPath = '.src',
  entry = [`${srcPath}/index.js`],
  project = [`${srcPath}/**/*.js`],
  ignore = ['package.json'],
  ignoreDependencies = [],
  ignoreBinaries = []
) => ({
  entry,
  project,
  ignore,
  ignoreDependencies,
  ignoreBinaries,
});
