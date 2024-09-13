import { configUsesReact, configUsesTs, getFilesExtensions } from '../config/helpers';
import { QoqConfig } from '../config/types';

export const getDefaultKnipEntry = (srcPath: string, config: QoqConfig): string[] => {
  switch (true) {
    case configUsesTs(config) && configUsesReact(config):
      return [`${srcPath}/index.tsx`];

    case configUsesTs(config):
      return [`${srcPath}/index.ts`];

    case configUsesReact(config):
      return [`${srcPath}/index.jsx`];

    default:
      return [`${srcPath}/index.js`];
  }
};

export const getDefaultKnipProject = (srcPath: string, config: QoqConfig): string[] => [
  `${srcPath}/**/*.{${getFilesExtensions(config).join()}}`,
];

export const getDefaultKnipIgnore = (config: QoqConfig): string[] => {
  const ignore = ['package.json'];

  if (configUsesTs(config)) {
    ignore.push('tsconfig.json');
  }

  return ignore;
};
