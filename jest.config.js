module.exports = {
  testMatch: ['**/__tests__/**/*.spec.[jt]s?(x)'],
  collectCoverageFrom: [
    'packages/**/src/**/*.{ts,tsx}',
    '!packages/**/src/*.d.ts',
  ],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
  moduleNameMapper: {
    '@fibonacci/([^\\/]*)$': '<rootDir>/packages/$1/src',
    '@fibonacci/([^\\/]*)/lib/([^\\/]*)$': '<rootDir>/packages/$1/src/$2',
  },
};
