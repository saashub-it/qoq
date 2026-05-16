import { isPackageExists, getPackageInfoSync, loadPackageJSONSync } from 'local-pkg';

import type { PackageJson } from 'pkg-types';

export const isPackageInstalled = (name: string): boolean => isPackageExists(name);

export const getPackageInfo = (
  name: string
): {
  name: string;
  version: string | undefined;
  rootPath: string;
  packageJsonPath: string;
  packageJson: PackageJson;
} => {
  const response = getPackageInfoSync(name);

  if (!response) {
    throw new Error(`Package ${name} not installed!`);
  }

  return response;
};

export const getPackageJson = (cwd?: string): PackageJson | null => loadPackageJSONSync(cwd);
