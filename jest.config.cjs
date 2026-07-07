module.exports = {
  testMatch: ['**/*.test.js', '**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
  },
  moduleFileExtensions: ['js', 'ts', 'json'],
};
