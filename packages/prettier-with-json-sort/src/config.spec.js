import { describe, test, expect } from 'vitest';

import config from './config';
import * as prettier from 'prettier';

describe('config', () => {
  test('can execute Pretieer with config', () => {
    expect(
      async () => await prettier.check('foo ( );', { ...config, parser: 'babel' })
    ).not.toThrowError();
  });
});
