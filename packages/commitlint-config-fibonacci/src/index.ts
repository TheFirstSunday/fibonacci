import rules from './rules';

module.exports = {
  plugins: ['commitlint-plugin-rules'],
  extends: ['@commitlint/config-conventional'],
  rules,
};
