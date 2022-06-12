module.exports = {
  roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/**/index.ts', '!<rootDir>/src/**/*error.ts'],
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': '@swc/jest'
  },
  moduleNameMapper: {
    '@/__tests__/(.*)': '<rootDir>/__tests__/$1',
    '@/(.*)': '<rootDir>/src/$1'
  }
}
