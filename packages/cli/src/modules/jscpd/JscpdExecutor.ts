import c from 'picocolors';

import { EExitCode } from '@/helpers/types';

import { AbstractExecutor } from '../abstract/AbstractExecutor';
import { IModuleJscpdConfig } from '../types';

import { JscpdConfigHandler } from './JscpdConfigHandler';

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

  protected prepare(
    args: string[],
    fix: boolean = false,
    files: string[] = []
  ): Promise<EExitCode> {
    try {
      const { ignore } = this.modulesConfig.modules.jscpd as IModuleJscpdConfig;

      if (ignore && ignore.length > 0) {
        args.push('-i', ignore.join());
      }

      return super.prepare(args, fix, files);
    } catch {
      process.stderr.write(c.red(`Can't load ${this.getName()} package config!\n`));

      process.exit(EExitCode.EXCEPTION);
    }
  }
}
