module.exports = {
  roots: ["<rootDir>/src"],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
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
