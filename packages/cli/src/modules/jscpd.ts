/* eslint-disable consistent-return */
import c from 'picocolors';

import { executeCommand } from '../helpers/command';
import { DEFAULT_JSCPD_THRESHOLD, DEFAULT_SRC } from '../helpers/constants';
import { EExitCode, QoqConfig, TJscpdFormat } from '../helpers/types';

import { configUsesReact, configUsesTs } from './config';

export const getDefaultJscpdFormat = (config: QoqConfig): TJscpdFormat[] => {
  const format: TJscpdFormat[] = [];

  switch (true) {
    case configUsesTs(config) && configUsesReact(config):
      format.push('javascript', 'jsx', 'typescript', 'tsx');
      break;

    case configUsesTs(config):
      format.push('typescript');
      break;

    case configUsesReact(config):
      format.push('javascript', 'jsx');
      break;

    default:
      format.push('javascript');
  }

  return format;
};

export const getDefaultJscpdIgnore = (config: QoqConfig): string[] =>
  getDefaultJscpdFormat(config).map(
    (key) => `**/*.spec.${key.replace('javascript', 'js').replace('typescript', 'ts')}`
  );

export const executeJscpd = async (config: QoqConfig): Promise<EExitCode> => {
  process.stdout.write(c.green('\nRunning JSCPD:\n'));

  const format = config?.jscpd?.format ?? getDefaultJscpdFormat(config);
  const ignore = config?.jscpd?.ignore ?? getDefaultJscpdIgnore(config);
  const threshold = String(config?.jscpd?.threshold ?? DEFAULT_JSCPD_THRESHOLD);

  try {
    const args = [config?.srcPath ?? DEFAULT_SRC, '-a', '-f', format.join(), '-t', threshold];

    if (ignore.length > 0) {
      args.push('-i', ignore.join());
    }

    const exitCode = await executeCommand('jscpd', args);

    if (exitCode === EExitCode.OK) {
      process.stdout.write(c.green('All matched files passed JSCPD checks\n'));
    }

    return exitCode;
  } catch {
    process.stderr.write('Unknown error!\n');

    process.exit(EExitCode.EXCEPTION);
  }
};
