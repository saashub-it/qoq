import { EModulesPrettier } from '@/modules/prettier/types';

import { resolveCwdPath } from './paths';

export const CONFIG_FILE_PATH = resolveCwdPath('/qoq.config.js');
export const GITIGNORE_FILE_PATH = resolveCwdPath('/.gitignore');
export const DEFAULT_SRC = './src';
export const DEFAULT_PRETTIER_PACKAGE = EModulesPrettier.PRETTIER;
