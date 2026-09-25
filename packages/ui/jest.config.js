module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/*.test.jsx', '**/*.test.js'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  collectCoverageFrom: ['src/**/*.js', 'src/**/*.jsx', '!src/**/*.test.*'],
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@orion/contracts/(.*)$': '<rootDir>/../../packages/contracts/src/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};