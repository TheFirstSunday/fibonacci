import type { CallbackFn } from './types';

module.exports = {
  extends: [
    './index',
    './rules/taro',
  ].map(require.resolve as CallbackFn<string>),
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
};
