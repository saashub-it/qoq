export type TObjectType = object & { length?: never };

const walk = <T extends TObjectType>(first: T, second: Partial<T>) => {
  const firstObjectKeys = Object.keys(first);

  const mergedObject = firstObjectKeys.reduce((acc, key: string) => {
    if (Object.prototype.hasOwnProperty.call(second, key) && second[key] === undefined) {
      return acc;
    }

    const firstValue = first[key];

    if (Object.prototype.hasOwnProperty.call(second, key)) {
      const secondValue = second[key];

      if (
        typeof firstValue === 'object' &&
        !Array.isArray(firstValue) &&
        typeof secondValue === 'object' &&
        !Array.isArray(secondValue)
      ) {
        acc[key] = walk(firstValue as TObjectType, secondValue as TObjectType);
      } else {
        try {
          acc[key] = structuredClone(secondValue);
        } catch {
          acc[key] = secondValue;
        }
      }
    } else {
      try {
        acc[key] = structuredClone(firstValue);
      } catch {
        acc[key] = firstValue;
      }
    }

    return acc;
  }, {});

  Object.keys(second)
    .filter((key) => !firstObjectKeys.includes(key))
    .forEach((key) => {
      try {
        mergedObject[key] = structuredClone(second[key]);
      } catch {
        mergedObject[key] = second[key];
      }
    });

  return mergedObject as T;
};

/**
 * Method merges objects and tries to clone them with `structuredClone`
 * Object on the right have precedence in every key, and If key is set to 'undefined'
 * it will be removed from object on the left.
 *
 * @param first input object
 * @param args input objects
 * @returns merged object
 */
export function objectMergeRight<T extends TObjectType>(first: T, ...args: Partial<T>[]): T {
  if (args.length < 1) {
    throw new Error('objectMergeRight needs at least two objects as arguments!');
  }

  const [second, third, ...rest] = args;
  const mergedObject = walk<T>(first, second);

  if (third) {
    return objectMergeRight<T>(mergedObject, third, ...rest);
  }

  return mergedObject;
}
