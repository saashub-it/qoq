import { ESLint } from 'eslint';
import { describe, it, expect } from 'vitest';

import { baseConfig } from './index';
import stats from '../stats/api/payload.json' with { type: 'json' };

describe('baseConfig', () => {
  it('can constuct Eslint object', () => {
    expect(
      () =>
        new ESLint({
          baseConfig,
        })
    ).not.toThrowError();
  });

  it('has no deprecated rules', () => {
    const deprecatedRules = Object.keys(stats.rules).filter(
      (rule) => stats.rules[rule].deprecated === true
    );

    const configsDeprecatedRules = stats.configs.reduce((acc: string[], config) => {
      if (!config.rules) {
        return acc;
      }

      return acc.concat(Object.keys(config.rules).filter((rule) => config.rules[rule] !== 0 && config.rules[rule] !== 'off' && deprecatedRules.includes(rule)));
    }, []);

    expect(configsDeprecatedRules).toStrictEqual([]);
  });
});
