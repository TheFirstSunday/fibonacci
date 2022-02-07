module.exports = {
  extends: [
    require.resolve('./react.ts'),
    'plugin:jsx-plus/recommended',
  ],
  settings: {
    react: {
      // For Taro
      version: '999.999.999',
      pragma: 'createElement',
      pragmaFrag: 'Fragment',
    },
  },
  rules: {
    'react/prop-types': 'off',
  },
};
