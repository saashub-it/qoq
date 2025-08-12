#!/usr/bin/env node

import { existsSync, readdirSync } from 'node:fs';

import { getRelativePath, resolveCwdPath } from '@saashub/qoq-utils';
import cac from 'cac';
import c from 'picocolors';
import { valid, SemVer, validRange, Range } from 'semver';

import { readJsonSync } from './helpers/readJson';

import type { PackageJson } from 'type-fest';

const cli = cac('check-engine');

cli.command('', 'Check Your engines.node config for project').action(async () => {
  const { workspaces = [] } = readJsonSync<{ workspaces?: string[] }>('./package.json');

  type TPackageLockJson = {
    packages: Record<string, PackageJson & { resolved?: string; link?: boolean }>;
  };

  const packageLockJson = readJsonSync<TPackageLockJson>('./package-lock.json');

  // try {
  //   const response = await fetch('https://nodejs.org/download/release/index.json');
  //   const data = await response.json();

  //   console.log(data);
  // } catch (err) {
  //   console.log(err);
  // }

  const checkEngine = (path: string, workspaces: boolean = false): void => {
    if (workspaces) {
      process.stderr.write(c.blue(`Checking '${path}':\n\n`));
    }

    const { dependencies, devDependencies, engines } = readJsonSync<PackageJson>(path);
    const nodeConfigured = engines?.node;

    if (nodeConfigured) {
      process.stderr.write(c.green('Found engines.node config:\n'));
      process.stderr.write(`${nodeConfigured}\n\n`);

      try {
        valid(nodeConfigured);
      } catch {
        try {
          validRange(nodeConfigured);
        } catch {
          process.stderr.write(c.red(`Bad engines.node version!\n`));

          return process.exit(1);
        }
      }
    }

    const dependenciesKeys = Object.keys(new Object(dependencies));

    if (dependenciesKeys.length === 0) {
      process.stderr.write(
        c.yellow('No dependencies found, checking engines also from devDependencies.\n\n')
      );
    }

    const dependenciesList =
      dependenciesKeys.length > 0
        ? dependenciesKeys
        : [...Object.keys(new Object(devDependencies))];

    const enginesRaw: string[] = Object.keys(packageLockJson.packages)
      .filter((key: string) =>
        dependenciesList.some((dependency: string) => key.endsWith(dependency))
      )
      .reduce((acc: string[], key: string) => {
        const { resolved, link } = packageLockJson.packages[key];
        const enginesNode =
          workspaces && link
            ? packageLockJson.packages[String(resolved)].engines?.node
            : packageLockJson.packages[key].engines?.node;

        if (enginesNode) {
          acc.push(enginesNode);
        }

        return acc;
      }, []);

    if (enginesRaw.length > 0) {
      process.stderr.write(c.green('Needed engines.node config:\n'));
      process.stderr.write(`${JSON.stringify(enginesRaw, undefined, 2)}\n\n`);
    } else {
      process.stderr.write(
        c.yellow(
          'No dependencies or devDependencies found, set engines based only on Your project.\n'
        )
      );
    }

    if (nodeConfigured) {
      try {
        const nodeVersion = new SemVer(nodeConfigured);

        if (
          enginesRaw.some((versionString: string) => new Range(versionString).test(nodeVersion))
        ) {
          process.stderr.write(c.red('Your engines.node does not match dependencies criteria!.\n'));

          process.exit(1);
        }
      } catch {
        const nodeRange = new Range(nodeConfigured);

        if (
          enginesRaw.some(
            (versionString: string) => !nodeRange.intersects(new Range(versionString))
          )
        ) {
          process.stderr.write(c.red('Your engines.node does not match dependencies criteria!.\n'));

          process.exit(1);
        } else {
          process.stderr.write(c.blue('Configured correctly!\n\n'));
        }
      }
    } else if (!nodeConfigured) {
      process.stderr.write(
        c.yellow('No engines.node configured, You should add it to ensure node complience.\n')
      );
    }

    process.stderr.write('--------------------------------\n\n');
  };

  const pathsToCheck: string[] = [
    './package.json',
    ...(workspaces ?? []).reduce((acc: string[], current) => {
      if (!current.includes('*')) {
        acc.push(current);
      } else {
        const path = `/${current.replaceAll('*', '')}`;

        return acc.concat(
          readdirSync(resolveCwdPath(path), { withFileTypes: true })
            .filter((entry) => entry.isDirectory())
            .filter(({ parentPath, name }) =>
              existsSync(getRelativePath(`${parentPath}/${name}/package.json`))
            )
            .map(({ parentPath, name }) => {
              return getRelativePath(`${parentPath}/${name}/package.json`);
            })
        );
      }

      return acc;
    }, []),
  ];

  process.stderr.write('********* CHECK ENGINE *********\n\n');

  pathsToCheck.forEach((entry) => checkEngine(entry, pathsToCheck.length > 1));
});

cli.help();

cli.parse();
