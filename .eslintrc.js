module.exports = {
  env: {
    browser: true,
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
    "max-len": [1, 120, 4],
    "no-plusplus": "off",
    "global-require": "off"
  },
  overrides: [
    {
      files: ['*.test.tsx'],
      rules: {
        "no-undef": "off"
      }
    }
  ]
};
