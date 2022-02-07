import type { CallbackFn } from '../types';

module.exports = {
  extends: [
    '../es5',
    './rules/set-style-to-warn',
    './rules/blacklist',
  ].map(require.resolve as CallbackFn<string>),
  rules: {
    // 逗号风格 - ES5 中不加最后一个逗号
    // @unessential
    'comma-dangle': ['warn', 'never'],
  },
};
