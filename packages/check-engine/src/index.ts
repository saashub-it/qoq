#!/usr/bin/env node

import { existsSync, readdirSync } from 'node:fs';

import { getPackageJson, getRelativePath, resolveCwdPath } from '@saashub/qoq-utils';
import cac from 'cac';

import { checkEngine } from './helpers/checkEngine';
import { fetchNodeInfo } from './helpers/fetchNodeInfo';

const cli = cac('check-engine');

cli.command('', 'Check Your engines.node config for project').action(async () => {
  const packageJson = getPackageJson();
  const workspaces = packageJson?.workspaces ?? [];
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

  const { currentLts, maintainedLts } = await fetchNodeInfo('./node.json');

  process.stderr.write(`Current LTS: ${currentLts}\n`);
  process.stderr.write(`Maintained LTS: ${maintainedLts}\n\n`);

  pathsToCheck.forEach((entry) => checkEngine(entry, pathsToCheck.length > 1));
});

cli.help();

cli.parse();
