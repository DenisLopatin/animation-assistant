module.exports = {
  roots: ['<rootDir>'],
  "testEnvironment": 'node',
  "verbose": true,
  "testPathIgnorePatterns": ['/node_modules/'],
  transform: {
      '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['<rootDir>/tests/LocationData.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
}
