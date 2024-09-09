import { installPackage } from '@antfu/install-pkg';
import { isPackageExists, getPackageInfoSync } from 'local-pkg';
import c from 'picocolors';

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

export const installPackages = async (dependencies: string[]): Promise<void> => {
  for (const dependency of dependencies) {
    process.stderr.write(`Installing ${c.green(dependency)}...\n`);

    await installPackage(dependency, { dev: true });

    process.stderr.write('\n');
  }
};
