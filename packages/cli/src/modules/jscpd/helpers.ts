import { getFilesExtensions } from '../basic/helpers';
import { IModulesConfig } from '../types';

import { TJscpdFormat } from './types';

export const getDefaultJscpdFormat = ({ modules }: IModulesConfig): TJscpdFormat[] =>
  getFilesExtensions(modules).map((key) => {
    switch (key) {
      case 'js':
        return 'javascript';

      case 'ts':
        return 'typescript';

      default:
        return key;
    }
  }) as TJscpdFormat[];

export const getDefaultJscpdIgnore = (modulesConfig: IModulesConfig): string[] =>
  getDefaultJscpdFormat(modulesConfig).map(
    (key) => `**/*.spec.${key.replace('javascript', 'js').replace('typescript', 'ts')}`
  );
