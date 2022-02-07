import type { CallbackFn } from '../types';

module.exports = {
  extends: [
    './index',
    '../rules/vue',
  ].map(require.resolve as CallbackFn<string>),
  parserOptions: {
    // https://github.com/mysticatea/vue-eslint-parser#parseroptionsparser
    parser: '@typescript-eslint/parser',
  },
};
