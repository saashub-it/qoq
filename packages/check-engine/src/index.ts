#!/usr/bin/env node

import cac from 'cac';
import { readJsonSync } from './helpers/readJson';
import { satisfies } from 'semver';
import type { PackageJson } from 'type-fest';

const cli = cac('check-engine');

cli
  .command('')
  .option('--init', 'Initialize QoQ cli config')
  .action(async (options) => {
    console.log(options)
    const packageJson = readJsonSync<PackageJson>('./package.json');

    type PackageLockJson = {
      packages: Record<string, PackageJson>;
    };

    const packageLockJson = readJsonSync<PackageLockJson>('./package-lock.json');

    const dependenciesList = [...Object.keys(new Object(packageJson.dependencies))];

    const enginesRaw: string[] = Object.keys(packageLockJson.packages)
      .filter((key: string) =>
        dependenciesList.some((dependency: string) => key.endsWith(dependency))
      )
      .reduce((acc: string[], key: string) => {
        const { engines } = packageLockJson.packages[key];

        if (engines && engines.node) {
          acc.push(engines.node);
        }

        return acc;
      }, []);

    try {
      const response = await fetch('https://nodejs.org/download/release/index.json');
      const data = await response.json();

      console.log(data);
    } catch (err) {
      console.log(err);
    }

    console.log(enginesRaw);

    const maxNodeVersion = 24;

    let maxMajorVersion = 1;
    do {
      maxMajorVersion += 1;
    } while (
      !enginesRaw.every((versionRange: string) =>
        satisfies(`^${maxMajorVersion}.0.0`, versionRange)
      ) &&
      maxMajorVersion < maxNodeVersion
    );

    let minMajorVersion = maxNodeVersion;
    do {
      minMajorVersion -= 1;
    } while (
      !enginesRaw.every((versionRange: string) =>
        satisfies(`^${minMajorVersion}.0.0`, versionRange)
      ) &&
      minMajorVersion > 1
    );

    const minSupported = `>=${minMajorVersion}`;
    const maxSupported = `>=${maxMajorVersion}`;

    const checkRecommendation = (recommendedLts: number) => {
      do {
        recommendedLts -= 2;
      } while (
        (!satisfies(`^${recommendedLts}.0.0`, minSupported) &&
          !satisfies(`^${recommendedLts}.0.0`, `<=${maxMajorVersion}`)) ||
        recommendedLts > 2
      );

      return `>=${recommendedLts}`;
    };

    const minRecommended = 20;
    const maxRecommended = 24;

    const result = {
      current: packageJson.engines?.node,
      minSupported,
      // minReccomended: checkRecommendation(minRecommended),
      maxSupported,
      // maxReccomended: checkRecommendation(maxRecommended),
    };

    console.log(result);
  });

cli.help();

cli.parse();
