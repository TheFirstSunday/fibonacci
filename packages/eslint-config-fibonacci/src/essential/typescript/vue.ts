import type { CallbackFn } from '../../types';

module.exports = {
  extends: [
    './index',
    '../../rules/vue', // vue 要置于最后，因为里面用了 vue-parser
  ].map(require.resolve as CallbackFn<string>),
  parserOptions: {
    // https://github.com/mysticatea/vue-eslint-parser#parseroptionsparser
    parser: '@typescript-eslint/parser',
  },
};
