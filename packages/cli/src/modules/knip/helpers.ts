import { configUsesReact, configUsesTs, getFilesExtensions } from '../basic/helpers';
import { IModulesConfig } from '../types';

export const getDefaultKnipEntry = (modulesConfig: IModulesConfig): string[] => {
  const { srcPath, modules } = modulesConfig;

  switch (true) {
    case configUsesTs(modules) && configUsesReact(modules):
      return [`${srcPath}/index.tsx`];

    case configUsesTs(modules):
      return [`${srcPath}/index.ts`];

    case configUsesReact(modules):
      return [`${srcPath}/index.jsx`];

    default:
      return [`${srcPath}/index.js`];
  }
};

export const getDefaultKnipProject = (modulesConfig: IModulesConfig): string[] => {
  const { srcPath, modules } = modulesConfig;

  return [`${srcPath}/**/*.{${getFilesExtensions(modules).join()}}`];
};

export const getDefaultKnipIgnore = (modulesConfig: IModulesConfig): string[] => {
  const { modules } = modulesConfig;
  const ignore = ['package.json'];

  if (configUsesTs(modules)) {
    ignore.push('tsconfig.json');
  }

  return ignore;
};
