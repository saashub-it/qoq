import { installPackage } from '@antfu/install-pkg';
import { isPackageExists, getPackageInfoSync } from 'local-pkg';
import c from 'tinyrainbow';

export const isPackageInstalled = (name: string): boolean => isPackageExists(name);

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPackageInfo = (name: string) => getPackageInfoSync(name);

export const installPackages = async (dependencies: string[]): Promise<void> => {
  for (const dependency of dependencies) {
    process.stderr.write(`Installing ${c.green(dependency)}...\n`);

    await installPackage(dependency, { dev: true });

    process.stderr.write('\n');
  }
};
