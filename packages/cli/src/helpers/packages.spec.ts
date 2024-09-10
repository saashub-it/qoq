import { installPackage } from '@antfu/install-pkg';
import { isPackageExists, getPackageInfoSync } from 'local-pkg';
import c from 'picocolors';
import { describe, it, expect, vi } from 'vitest';

import { installPackages, isPackageInstalled, getPackageInfo } from './packages';

vi.mock('@antfu/install-pkg', () => ({
  installPackage: vi.fn(),
}));

vi.mock('local-pkg', () => ({
  isPackageExists: vi.fn(),
  getPackageInfoSync: vi.fn(),
}));

describe('isPackageInstalled', () => {
  it('should return true if package is installed', () => {
    // Mocking isPackageExists to return true
    vi.mocked(isPackageExists).mockReturnValue(true);

    // Test if the function returns true
    const result = isPackageInstalled('eslint');
    expect(result).toBe(true);

    // Ensure that the isPackageExists function was called
    expect(isPackageExists).toHaveBeenCalledWith('eslint');
  });

  it('should return false if package is not installed', () => {
    // Mocking isPackageExists to return false
    vi.mocked(isPackageExists).mockReturnValue(false);

    // Test if the function returns false
    const result = isPackageInstalled('non-existent-package');
    expect(result).toBe(false);

    // Ensure that the isPackageExists function was called
    expect(isPackageExists).toHaveBeenCalledWith('non-existent-package');
  });
});

describe('getPackageInfo', () => {
  it('should return package info for an existing package', () => {
    // Mock getPackageInfoSync to return fake package data
    const mockPackageInfo = {
      name: 'eslint',
      version: '7.0.0',
      rootPath: '/path/to/package',
      packageJsonPath: '/path/to/package/package.json',
      packageJson: {},
    };
    vi.mocked(getPackageInfoSync).mockReturnValue(mockPackageInfo);

    // Test if the function returns the correct package info
    const result = getPackageInfo('eslint');
    expect(result).toEqual(mockPackageInfo);

    // Ensure that getPackageInfoSync was called with the correct package name
    expect(getPackageInfoSync).toHaveBeenCalledWith('eslint');
  });

  it('should throw an error for a non-existent package', () => {
    // Mock getPackageInfoSync to return undefined
    vi.mocked(getPackageInfoSync).mockReturnValue(undefined);

    // Test if the function throws an error
    expect(() => getPackageInfo('non-existent-package')).toThrowError(
      'Package non-existent-package not installed!'
    );

    // Ensure that getPackageInfoSync was called with the correct package name
    expect(getPackageInfoSync).toHaveBeenCalledWith('non-existent-package');
  });
});

describe('installPackages', () => {
  it('should call installPackage for each dependency', async () => {
    // Mock the installPackage function to simulate package installation
    vi.mocked(installPackage).mockResolvedValue(undefined);

    // Capture process.stderr.write to check output
    const writeMock = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);

    const dependencies = ['eslint', 'prettier'];
    await installPackages(dependencies);

    // Ensure that installPackage was called for each dependency
    expect(installPackage).toHaveBeenCalledTimes(dependencies.length);
    expect(installPackage).toHaveBeenCalledWith('eslint', { dev: true });
    expect(installPackage).toHaveBeenCalledWith('prettier', { dev: true });

    // Check if the console output was written correctly
    expect(writeMock).toHaveBeenCalledWith(`Installing ${c.green('eslint')}...\n`);
    expect(writeMock).toHaveBeenCalledWith(`Installing ${c.green('prettier')}...\n`);

    // Restore original implementation
    writeMock.mockRestore();
  });
});
