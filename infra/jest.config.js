module.exports = {
  roots: ['<rootDir>'],
  collectCoverageFrom: ['**/*.ts', '!**/ts.out/**', '!**/node_modules/**'],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
