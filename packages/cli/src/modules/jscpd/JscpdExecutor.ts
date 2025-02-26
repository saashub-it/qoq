import c from 'picocolors';

import { EExitCode } from '@/helpers/types';

import { AbstractExecutor } from '../abstract/AbstractExecutor';

import { JscpdConfigHandler } from './JscpdConfigHandler';
import { IModuleJscpdConfig } from './types';
import { IExecutorOptions } from '../types';

export class JscpdExecutor extends AbstractExecutor {
  getName(): string {
    return this.getCommandName().toUpperCase();
  }
  protected getCommandName(): string {
    return 'jscpd';
  }

  protected getCommandArgs(): string[] {
    const { srcPath, modules } = this.modulesConfig;
    const { format, threshold } = modules.jscpd as IModuleJscpdConfig;

    return [
      srcPath,
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

      process.exit(EExitCode.EXCEPTION);
    }
  }
}
