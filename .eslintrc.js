/*global module*/
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended', // Ensures Prettier is integrated with ESLint
    'plugin:storybook/recommended',
    'plugin:react/jsx-runtime',
    'prettier', // Disable formatting rules conflicting with Prettier
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
      },
    ],
    'import/no-dynamic-require': 'off',
    'import/no-unresolved': 'off',
  },
  env: {
    browser: true,
    es2024: true,
  },
};
