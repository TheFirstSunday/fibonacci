import type { CallbackFn } from '../types';

module.exports = {
  extends: [
    './react',
    '../tato',
  ].map(require.resolve as CallbackFn<string>),
};
