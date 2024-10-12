import { describe, it, expect } from 'vitest';

import { capitalizeFirstLetter, omitStartingDotFromPath } from './common';

describe('capitalizeFirstLetter', () => {
  it.each([
    ['hello', 'Hello'],
    ['world', 'World'],
    ['foo-bar', 'Foo-bar'],
    ['FOO-BAR', 'FOO-BAR'],
  ])('should capitalize first letter of %s to %s', (input, expected) => {
    expect(capitalizeFirstLetter(input)).toBe(expected);
  });
});

describe('omitStartingDotFromPath', () => {
  it.each([
    ['./foo/bar', 'foo/bar'],
    ['foo/bar', 'foo/bar'],
  ])('should omit starting dot from path %s to %s', (input, expected) => {
    expect(omitStartingDotFromPath(input)).toBe(expected);
  });
});
