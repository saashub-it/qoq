import { describe, it, expect } from 'vitest';

import { TerminateExecutorGracefully } from './TerminateExecutorGracefully.ts';

describe('TerminateExecutorGracefully', () => {
  it('should be an instance of Error', () => {
    const error = new TerminateExecutorGracefully();
    expect(error).toBeInstanceOf(Error);
  });
});
