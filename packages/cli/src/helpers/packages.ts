import { isPackageExists, getPackageInfoSync } from 'local-pkg';
import { installPackage } from '@antfu/install-pkg';
import c from 'tinyrainbow';

export const isPackageInstalled = (name: string): boolean => isPackageExists(name);

export const getPackageInfo = (name: string) => getPackageInfoSync(name);

export const installPackages = async (dependencies: string[]) => {
  for (const dependency of dependencies) {
    process.stderr.write(`Installing ${c.green(dependency)}...\n`);

    await installPackage(dependency, { dev: true });

    process.stderr.write('\n');
  }
};
