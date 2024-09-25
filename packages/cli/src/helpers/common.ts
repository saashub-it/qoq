export const capitalizeFirstLetter = (name: string): string => {
  return name[0].toUpperCase() + name.slice(1);
};

export const omitStartingDotFromPath = (pathString: string): string =>
  pathString.startsWith('./') ? pathString.replace('./', '') : pathString;
