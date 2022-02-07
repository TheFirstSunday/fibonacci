import type { CallbackFn } from '../../types';

module.exports = {
  extends: [
    '../index',
    '../../rules/typescript',
    '../rules/ts-blacklist',
  ].map(require.resolve as CallbackFn<string>),
};
