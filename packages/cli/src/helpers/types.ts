export enum EModules {
  PRETTIER = '@saashub/qoq-prettier',
  PRETTIER_WITH_JSON_SORT = '@saashub/qoq-prettier-with-json-sort',
  JSCPD = '@saashub/qoq-jscpd',
  ESLINT_V9_JS = '@saashub/qoq-eslint-v9-js',
  ESLINT_V9_JS_REACT = '@saashub/qoq-eslint-v9-js-react',
  ESLINT_V9_JS_JEST = '@saashub/qoq-eslint-v9-js-jest',
  ESLINT_V9_JS_VITEST = '@saashub/qoq-eslint-v9-js-vitest',
  ESLINT_V9_TS = '@saashub/qoq-eslint-v9-ts',
  ESLINT_V9_TS_REACT = '@saashub/qoq-eslint-v9-ts-react',
  ESLINT_V9_TS_JEST = '@saashub/qoq-eslint-v9-ts-jest',
  ESLINT_V9_TS_VITEST = '@saashub/qoq-eslint-v9-ts-vitest',
}

export type TModulesWithConfig = Promise<Record<EModules, boolean | object>>;
