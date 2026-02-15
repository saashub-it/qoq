import { getKnipConfig } from './knipConfig';

export const jsConfig = getKnipConfig();
export const jsReactConfig = getKnipConfig('.src', ['.src/index.jsx'], ['.src/**/*.{js,jsx}']);
export const tsConfig = getKnipConfig(
  '.src',
  ['.src/index.ts'],
  ['.src/**/*.{js,ts}'],
  ['package.json', 'tsconfig.json', '**/*.d.ts']
);
export const tsReactConfig = getKnipConfig(
  '.src',
  ['.src/index.tsx'],
  ['.src/**/*.{js,jsx,ts,tsx}'],
  ['package.json', 'tsconfig.json', '**/*.d.ts']
);
