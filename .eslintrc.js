module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['fibonacci/ts', 'plugin:jest/recommended'],
  rules: {
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-use-before-define': 0,
    'no-unused-vars': 0,
    'no-undef': 0,
    'class-methods-use-this': 0,
    'react-hooks/exhaustive-deps': 1,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/naming-convention': 0,
    '@typescript-eslint/no-explicit-any': 0,
  },
  globals: {
    NodeJS: false,
  },
};
