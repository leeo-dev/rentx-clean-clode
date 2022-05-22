module.exports = {
  roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: ['<rootDir>/__tests__/**/*.ts', '!<rootDir>/src/**/index.ts'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': '@swc/jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
