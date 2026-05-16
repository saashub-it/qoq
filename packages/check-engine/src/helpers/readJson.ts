import { readFileSync } from 'node:fs';

class ReadFileError extends Error {
  constructor(filepath: string) {
    super(`Could not read file: ${filepath}`);
  }
}

class JsonParseError extends Error {
  constructor(filepath: string) {
    super(`Could not parse file: ${filepath}`);
  }
}

export const readJsonSync = <T extends object>(filepath: string): T => {
  try {
    const fileContent = readFileSync(filepath, 'utf-8');

    try {
      const content = JSON.parse(fileContent);

      return content as T;
    } catch {
      throw new JsonParseError(filepath);
    }
  } catch (err) {
    if (err instanceof JsonParseError) {
      throw err;
    }

    throw new ReadFileError(filepath);
  }
};
