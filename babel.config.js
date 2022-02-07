module.exports = {
  presets: [
    '@babel/typescript',
    [
      '@babel/env',
      {
        modules: false,
        targets: {
          browsers: ['ie >= 10'],
        },
        loose: true,
      },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
  ],
};
