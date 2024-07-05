/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  injectGlobals: true,
  testEnvironment: 'jest-environment-jsdom'
};
