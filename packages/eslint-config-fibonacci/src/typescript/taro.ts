import type { CallbackFn } from '../types';

module.exports = {
  extends: [
    '../taro',
    '../rules/typescript',
  ].map(require.resolve as CallbackFn<string>),
};
