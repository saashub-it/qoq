import prompts from 'prompts';
import { describe, expect, vi, it } from 'vitest';

import { DEFAULT_SRC } from '@/helpers/constants';
import { EConfigType } from '@/helpers/types';

import { createBasicConfig } from './configure';

describe('createBasicConfig', () => {
  it('should prompt user for source path and config type', async () => {
    const mockPrompt = vi.spyOn(prompts, 'prompt');

    mockPrompt.mockResolvedValueOnce({ srcPath: 'src' });
    mockPrompt.mockResolvedValueOnce({ configType: 'cjs' });

    await createBasicConfig();

    expect(mockPrompt).toHaveBeenCalledTimes(2);
    expect(mockPrompt).toHaveBeenCalledWith({
      type: 'text',
      name: 'srcPath',
      message: `What's your project source path (from project root dir)?`,
      initial: DEFAULT_SRC,
    });
    expect(mockPrompt).toHaveBeenCalledWith({
      type: 'select',
      name: 'configType',
      message: 'In what format should we create config file?',
      choices: [
        { title: EConfigType.CJS, value: EConfigType.CJS },
        { title: EConfigType.ESM, value: EConfigType.ESM },
      ],
    });
  });

  it('should return the user input', async () => {
    const mockPrompt = vi.spyOn(prompts, 'prompt');
    
    mockPrompt.mockResolvedValueOnce({ srcPath: 'src' });
    mockPrompt.mockResolvedValueOnce({ configType: 'cjs' });

    const result = await createBasicConfig();

    expect(result).toEqual({ srcPath: 'src', configType: 'cjs' });
  });
});
