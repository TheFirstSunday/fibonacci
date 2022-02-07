import type { CallbackFn } from '../types';

module.exports = {
  extends: [
    '../index',
    '../rules/typescript',
  ].map(require.resolve as CallbackFn<string>),
};
