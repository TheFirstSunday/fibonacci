import type { CallbackFn } from './types';

module.exports = {
  extends: [
    './rules/base/best-practices',
    './rules/base/possible-errors',
    './rules/base/style',
    './rules/base/variables',
    './rules/es5',
  ].map(require.resolve as CallbackFn<string>),
  root: true,
};
