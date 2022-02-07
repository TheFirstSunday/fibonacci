import type { CallbackFn } from './types';

module.exports = {
  extends: [
    './index',
    './rules/node',
  ].map(require.resolve as CallbackFn<string>),
};
