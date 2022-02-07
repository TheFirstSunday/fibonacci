import type { CallbackFn } from './types';

module.exports = {
  extends: [
    './rules/jsx-a11y',
  ].map(require.resolve as CallbackFn<string>),
};
