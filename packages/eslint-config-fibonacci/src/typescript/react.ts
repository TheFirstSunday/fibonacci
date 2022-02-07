import type { CallbackFn } from '../types';

module.exports = {
  extends: [
    '../react',
    '../rules/typescript',
  ].map(require.resolve as CallbackFn<string>),
};
