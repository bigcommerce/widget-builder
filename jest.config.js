module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.js",
  ],
  collectCoverageFrom: [
      "src/**/*.{js,jsx,ts,tsx}"
    ],
    coverageThreshold: {
      "global": {
        "lines": 90,
        "statements": 90
      }
    }
};
