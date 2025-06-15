import { check } from 'prettier';
import { describe, test, expect } from 'vitest';

import config from './config';

describe('config', () => {
  test('can execute Pretieer with config', () => {
    expect(async () => await check('foo ( );', { ...config, parser: 'babel' })).not.toThrowError();
  });
});
