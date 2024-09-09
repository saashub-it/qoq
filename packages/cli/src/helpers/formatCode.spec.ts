import { describe, it, expect } from 'vitest';

import { EConfigType } from './constants';
import { formatCode } from './formatCode';

describe('formatCode', () => {
  it('generates cjs code', () => {
    const imports = { foo: 'bar', baz: 'qux' };
    const content = ['const result = foo() + baz()'];
    const exports = 'result';

    expect(formatCode(EConfigType.CJS, imports, content, exports)).toEqual(
      `const foo = require('bar');const baz = require('qux');const result = foo() + baz(); module.exports = result;`
    );
  });

  it('generates esm code', () => {
    const imports = { foo: 'bar', baz: 'qux' };
    const content = ['const result = foo() + baz()'];
    const exports = 'result';

    expect(formatCode(EConfigType.ESM, imports, content, exports)).toEqual(
      `import foo from 'bar';import baz from 'qux';const result = foo() + baz(); export default result;`
    );
  });
});
