import { readdirSync } from 'fs';

import { getRelativePath, resolveCwdPath } from '@saashub/qoq-utils';
import c from 'picocolors';

import { AbstractExecutor } from '../abstract/AbstractExecutor';
import { IExecutorOptions } from '../types';

import { JscpdConfigHandler } from './JscpdConfigHandler';
import { IModuleJscpdConfig } from './types';

import { EExitCode } from '@/helpers/types';

export class JscpdExecutor extends AbstractExecutor {
  getName(): string {
    return this.getCommandName().toUpperCase();
  }
  protected getCommandName(): string {
    return 'jscpd';
  }

  protected getCommandArgs(): string[] {
    const { srcPath, modules, workspaces } = this.modulesConfig;
    const { format, threshold } = modules.jscpd as IModuleJscpdConfig;

    if (!workspaces) {
      return [
        srcPath,
        '-a',
        '-f',
        format.join(),
        '-t',
        String(threshold ?? JscpdConfigHandler.DEFAULT_THRESHOLD),
      ];
    }

    return [
      ...workspaces.reduce((acc: string[], current) => {
        if (!current.includes('*')) {
          acc.push(current);
        } else {
          const path = `/${current.replaceAll('*', '')}`;

          return acc.concat(
            readdirSync(resolveCwdPath(path), { withFileTypes: true })
              .filter((entry) => entry.isDirectory())
              .map(({ parentPath, name }) => {
                return getRelativePath(`${parentPath}/${name}`);
              })
          );
        }

        return acc;
      }, []),
      '-g',
      '-a',
      '-f',
      format.join(),
      '-t',
      String(threshold ?? JscpdConfigHandler.DEFAULT_THRESHOLD),
    ];
  }

  protected prepare(args: string[], options: IExecutorOptions): Promise<EExitCode> {
    try {
      const { ignore } = this.modulesConfig.modules.jscpd as IModuleJscpdConfig;

      if (ignore && ignore.length > 0) {
        args.push('-i', ignore.join());
      }

      return super.prepare(args, { ...options, disableCache: true });
    } catch {
      process.stderr.write(c.red(`Can't load ${this.getName()} package config!\n`));

      return process.exit(EExitCode.EXCEPTION);
    }
  }
}
