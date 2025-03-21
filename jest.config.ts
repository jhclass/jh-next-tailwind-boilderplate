// jest.config.ts
import nextJest from 'next/jest'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig = {
  modulePathIgnorePatterns: ['<rootDir>/free-nextjs-admin-dashboard-main'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  clearMocks: true,
}

export default createJestConfig(customJestConfig)
