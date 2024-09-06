/* ChatGPT generated */
import { describe, it, expect, vi } from 'vitest';
import { formatCode } from './formatCode';

describe('formatCode', () => {
  const imports = {
    fs: 'fs',
    path: 'path',
  };
  const content = ['const example = 42'];
  const exports = 'example';

  it('should format CJS code when BUILD_ENV is set to "CJS"', () => {
    // Set environment variable to simulate CJS build
    vi.stubEnv('BUILD_ENV', 'CJS');
    
    const result = formatCode(imports, content, exports);

    // Expected output for CommonJS format
    expect(result).toBe(
      "const fs = require('fs');const path = require('path');const example = 42; module.exports = example"
    );
  });

  it('should format ESM code when BUILD_ENV is not set to "CJS"', () => {
    // Reset environment variable to use default (ESM format)
    vi.unstubAllEnvs();

    const result = formatCode(imports, content, exports);

    // Expected output for ES Module format
    expect(result).toBe(
      "import fs from 'fs';import path from 'path';const example = 42; export default = example"
    );
  });

  it('should handle empty imports and content for CJS format', () => {
    // Test CJS format with no imports and content
    vi.stubEnv('BUILD_ENV', 'CJS');

    const result = formatCode({}, [], exports);

    // Expected output when no imports or content provided
    expect(result).toBe('module.exports = example');
  });

  it('should handle empty imports and content for ESM format', () => {
    // Test ESM format with no imports and content
    vi.unstubAllEnvs();

    const result = formatCode({}, [], exports);

    // Expected output when no imports or content provided in ESM
    expect(result).toBe('export default = example');
  });

  it('should handle content without imports for CJS format', () => {
    // Test CJS format with content but no imports
    vi.stubEnv('BUILD_ENV', 'CJS');

    const result = formatCode({}, content, exports);

    // Expected output when only content is provided in CJS format
    expect(result).toBe('const example = 42; module.exports = example');
  });

  it('should handle content without imports for ESM format', () => {
    // Test ESM format with content but no imports
    vi.unstubAllEnvs();

    const result = formatCode({}, content, exports);

    // Expected output when only content is provided in ESM format
    expect(result).toBe('const example = 42; export default = example');
  });
});
