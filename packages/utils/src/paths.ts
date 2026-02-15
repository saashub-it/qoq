import { resolve } from 'path';

export const getRelativePath = (path: string): string => path.replace(process.cwd(), '.');

export const resolveCwdPath = (path: string): string => resolve(`${process.cwd()}${path}`);

export const resolveCwdRelativePath = (path: string): string =>
  getRelativePath(resolveCwdPath(path));
