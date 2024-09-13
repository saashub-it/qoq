import { getFilesExtensions } from '../config/helpers';
import { QoqConfig } from '../config/types';

import { TJscpdFormat } from './types';

export const getDefaultJscpdFormat = (config: QoqConfig): TJscpdFormat[] =>
  getFilesExtensions(config).map((key) => {
    switch (key) {
      case 'js':
        return 'javascript';

      case 'ts':
        return 'typescript';

      default:
        return key;
    }
  }) as TJscpdFormat[];

export const getDefaultJscpdIgnore = (config: QoqConfig): string[] =>
  getDefaultJscpdFormat(config).map(
    (key) => `**/*.spec.${key.replace('javascript', 'js').replace('typescript', 'ts')}`
  );
