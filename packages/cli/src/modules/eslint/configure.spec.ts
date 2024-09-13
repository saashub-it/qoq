/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import prompts from 'prompts';
import { describe, expect, it, vi } from 'vitest';

import { TModulesWithConfig } from '../config/types';

import { createEslintConfig } from './configure';
import { EModulesEslint } from './types';

describe('createEslintConfig', () => {
  it('is defined', () => {
    expect(createEslintConfig).toBeDefined();
  });

  /* eslint-disable-next-line @typescript-eslint/require-await */
  it('returns a promise', async () => {
    const result = createEslintConfig({} as TModulesWithConfig, './src');

    expect(result).toBeInstanceOf(Promise);
  });

  it('prompts for ESLint configuration', async () => {
    const mockPrompt = vi.spyOn(prompts, 'prompt');
    mockPrompt.mockResolvedValueOnce({ eslintPackages: [EModulesEslint.ESLINT_V9_TS] });
    mockPrompt.mockResolvedValueOnce({ files: [], ignores: [] });

    await createEslintConfig({} as TModulesWithConfig, './src');

    expect(mockPrompt).toHaveBeenCalledTimes(2);
  });

  it('handles different ESLint package options', async () => {
    const modulesConfig: TModulesWithConfig = {};
    const eslintPackages = [EModulesEslint.ESLINT_V9_TS, EModulesEslint.ESLINT_V9_TS_JEST];
    const mockPrompt = vi.spyOn(prompts, 'prompt');

    mockPrompt.mockResolvedValueOnce({
      eslintPackages: [EModulesEslint.ESLINT_V9_TS, EModulesEslint.ESLINT_V9_TS_JEST],
    });
    mockPrompt.mockResolvedValueOnce({ files: [], ignores: [] });
    mockPrompt.mockResolvedValueOnce({ files: ['test'], ignores: ['test'] });

    await createEslintConfig(modulesConfig, './src');

    expect(modulesConfig[eslintPackages[0]]).toBeDefined();
    expect(modulesConfig[eslintPackages[1]]).toBeDefined();
  });

  it('handles file and ignore paths correctly', async () => {
    const modulesConfig: TModulesWithConfig = {};
    const eslintPackages = [EModulesEslint.ESLINT_V9_TS];
    const mockPrompt = vi.spyOn(prompts, 'prompt');
    const files = ['file1.ts', 'file2.ts'];
    const ignores = ['ignore1.ts', 'ignore2.ts'];
    
    mockPrompt.mockResolvedValueOnce({ eslintPackages: [EModulesEslint.ESLINT_V9_TS] });
    mockPrompt.mockResolvedValueOnce({ files, ignores });

    await createEslintConfig(modulesConfig, './src');

    expect(modulesConfig[eslintPackages[0]].files).toEqual(files);
    expect(modulesConfig[eslintPackages[0]].ignores).toEqual(ignores);
  });
});
