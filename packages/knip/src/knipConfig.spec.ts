import { describe, it, expect } from 'vitest';

import { getKnipConfig } from './knipConfig';

describe('getKnipConfig', () => {
  it('should return default values', () => {
    const result = getKnipConfig();
    expect(result).toEqual({
      entry: ['.src/index.js'],
      project: ['.src/**/*.js'],
      ignore: ['package.json'],
      ignoreDependencies: [],
      ignoreBinaries: [],
    });
  });

  it('should return custom srcPath', () => {
    const srcPath = 'custom-src';
    const result = getKnipConfig(srcPath);
    expect(result).toEqual({
      entry: [`${srcPath}/index.js`],
      project: [`${srcPath}/**/*.js`],
      ignore: ['package.json'],
      ignoreDependencies: [],
      ignoreBinaries: [],
    });
  });

  it('should return custom entry', () => {
    const entry = ['custom-entry.js'];
    const result = getKnipConfig(undefined, entry);
    expect(result).toEqual({
      entry,
      project: ['.src/**/*.js'],
      ignore: ['package.json'],
      ignoreDependencies: [],
      ignoreBinaries: [],
    });
  });

  it('should return custom project', () => {
    const project = ['custom-project.js'];
    const result = getKnipConfig(undefined, undefined, project);
    expect(result).toEqual({
      entry: ['.src/index.js'],
      project,
      ignore: ['package.json'],
      ignoreDependencies: [],
      ignoreBinaries: [],
    });
  });

  it('should return custom ignore', () => {
    const ignore = ['custom-ignore.js'];
    const result = getKnipConfig(undefined, undefined, undefined, ignore);
    expect(result).toEqual({
      entry: ['.src/index.js'],
      project: ['.src/**/*.js'],
      ignore,
      ignoreDependencies: [],
      ignoreBinaries: [],
    });
  });

  it('should return custom ignoreDependencies', () => {
    const ignoreDependencies = ['custom-ignore-dependencies.js'];
    const result = getKnipConfig(undefined, undefined, undefined, undefined, ignoreDependencies);
    expect(result).toEqual({
      entry: ['.src/index.js'],
      project: ['.src/**/*.js'],
      ignore: ['package.json'],
      ignoreDependencies,
      ignoreBinaries: [],
    });
  });

  it('should return multiple custom values', () => {
    const srcPath = 'custom-src';
    const entry = ['custom-entry.js'];
    const project = ['custom-project.js'];
    const ignore = ['custom-ignore.js'];
    const ignoreDependencies = ['custom-ignore-dependencies.js'];
    const result = getKnipConfig(srcPath, entry, project, ignore, ignoreDependencies);
    expect(result).toEqual({
      entry,
      project,
      ignore,
      ignoreDependencies,
      ignoreBinaries: [],
    });
  });
});
