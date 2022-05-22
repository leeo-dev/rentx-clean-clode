module.exports = {
  roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: ['<rootDir>/__tests__/**/*.ts', '!<rootDir>/src/**/index.ts'],
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': '@swc/jest'
  },
  moduleNameMapper: {
    '@/__tests__/(.*)': '<rootDir>/__tests__/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
