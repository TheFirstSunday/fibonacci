import type { CallbackFn } from '../../types';

module.exports = {
  extends: [
    '../taro',
    '../../rules/typescript',
    '../rules/ts-blacklist',
  ].map(require.resolve as CallbackFn<string>),
};
