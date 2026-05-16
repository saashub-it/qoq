import config from '@saashub/qoq-prettier/config';

export default {
  ...config,
  plugins: ['prettier-plugin-sort-json'],
  jsonRecursiveSort: true,
};
