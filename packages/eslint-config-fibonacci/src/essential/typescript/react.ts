import type { CallbackFn } from '../../types';

module.exports = {
  extends: [
    '../react',
    '../../rules/typescript',
    '../rules/ts-blacklist',
  ].map(require.resolve as CallbackFn<any>),
};
