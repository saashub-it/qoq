import { resolve } from 'path';

import { getPackageInfo, getRelativePath } from '@saashub/qoq-utils';

// eslint-disable-next-line no-restricted-imports
import pkg from '../../package.json';

const getCliPackagePath = (): string => {
  try {
    const { rootPath } = getPackageInfo(pkg.name) ?? {};

    return rootPath;
  } catch {
    // this is for npx

    return process.cwd();
  }
};

export const resolveCliPackagePath = (path: string): string =>
  resolve(`${getCliPackagePath()}${path}`);

export const resolveCliRelativePath = (path: string): string =>
  getRelativePath(resolveCliPackagePath(path));
