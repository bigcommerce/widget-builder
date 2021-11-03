module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:react/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    "import/order": ["error", {
      "newlines-between": "always",
    }],
    "@typescript-eslint/explicit-member-accessibility": "off",
    "no-underscore-dangle": "off",
    "@typescript-eslint/no-var-requires": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/camelcase": "off",
    "indent": ["error", 4],
    "max-len": [1, 120, 4],
    "no-plusplus": "off",
    "global-require": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "import/extensions": "off"
  },
  overrides: [
    {
      files: ['*.test.tsx', '*.test.ts'],
      rules: {
        "no-undef": "off",
        "@typescript-eslint/no-explicit-any": "off"
      }
    }
  ],
  settings: {
    react: {
      version: "detect"
    }
  }
};
