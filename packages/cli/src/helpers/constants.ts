import { resolveCwdPath } from './paths';

export const PACKAGE_JSON_PATH = resolveCwdPath('/package.json');
export const CONFIG_FILE_PATH = resolveCwdPath('/qoq.config.js');
export const GITIGNORE_FILE_PATH = resolveCwdPath('/.gitignore');
export const DEFAULT_SRC = './src';
