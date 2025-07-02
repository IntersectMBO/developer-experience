
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^vscode$': '<rootDir>/src/test/__mocks__/vscode.js', // <-- THIS is crucial
  },
  roots: ['<rootDir>/src'],
  testMatch: ['**/test/**/*.test.ts'], // Will match test files like src/test/abc.test.ts
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      isolatedModules: true, // Enable isolated modules for better compatibility
      useESM: true, // Ensure Jest is aware that we are using ESM
    }], // Handle .ts and .tsx files
  },
  extensionsToTreatAsEsm: ['.ts'], // Tells Jest to treat .ts files as ESM
};