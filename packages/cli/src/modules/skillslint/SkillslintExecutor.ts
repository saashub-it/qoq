import { EExitCode } from '@saashub/qoq-utils';
import c from 'picocolors';

import { AbstractExecutor } from '../abstract/AbstractExecutor';
import { IExecutorOptions } from '../types';

import { capitalizeFirstLetter } from '@/helpers/common';
import { TerminateExecutorGracefully } from '@/helpers/exceptions/TerminateExecutorGracefully';

export class SkillslintExecutor extends AbstractExecutor {
  getName(): string {
    return capitalizeFirstLetter(this.getCommandName());
  }

  protected getCommandName(): string {
    return 'skillslint';
  }

  protected getCommandArgs(): string[] {
    return [];
  }

  protected async prepare(args: string[], options: IExecutorOptions): Promise<EExitCode> {
    const {
      modules: { skillslint },
    } = this.modulesConfig;

    if (!skillslint) {
      throw new TerminateExecutorGracefully();
    }

    const { path } = skillslint;

    args.push('--path', path);

    const { fix } = options;

    try {
      if (fix) {
        args.push('--fix');
      }

      return super.prepare(args, { ...options, disableCache: true });
    } catch (e) {
      if (e instanceof TerminateExecutorGracefully) {
        throw e;
      }

      process.stderr.write(c.red(`Can't load ${this.getName()} package config!\n`));

      return process.exit(EExitCode.EXCEPTION);
    }
  }
}
