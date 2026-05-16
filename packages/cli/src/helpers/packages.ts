import { installPackage } from '@antfu/install-pkg';
import c from 'picocolors';

export const installPackages = async (dependencies: string[]): Promise<void> => {
  for (const dependency of dependencies) {
    process.stderr.write(`Installing ${c.green(dependency)}...\n`);

    await installPackage(dependency, { dev: true });

    process.stderr.write('\n');
  }
};
