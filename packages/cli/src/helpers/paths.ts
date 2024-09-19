import { resolve } from 'path';

// eslint-disable-next-line no-restricted-imports
import pkg from '../../package.json';

import { getPackageInfo } from './packages';

const getCliPackagePath = (): string => {
  const { rootPath } = getPackageInfo(pkg.name) ?? {};

  return rootPath;
};

export const resolveCliPackagePath = (path: string): string =>
  resolve(`${getCliPackagePath()}${path}`);

export const resolveCliRelativePath = (path: string): string =>
  getRelativePath(resolveCliPackagePath(path));

export const getRelativePath = (path: string): string => path.replace(process.cwd(), '.');

export const resolveCwdPath = (path: string): string => resolve(`${process.cwd()}${path}`);

export const resolveCwdRelativePath = (path: string): string =>
  getRelativePath(resolveCwdPath(path));
