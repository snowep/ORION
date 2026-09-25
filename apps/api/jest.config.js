module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.js'],
  moduleFileExtensions: ['js', 'json'],
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '^@orion/core/(.*)$': '<rootDir>/../../packages/core/src/$1',
    '^@orion/contracts/(.*)$': '<rootDir>/../../packages/contracts/src/$1'
  }
};
