// eslint-disable-next-line
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    // 'plugin:prettier/recommended',
    'plugin:storybook/recommended',
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
    '@typescript-eslint/ban-ts-comment': 'warn',
    // 'prettier/prettier': [
    //   'warn',
    //   {
    //     singleQuote: true,
    //     parser: 'flow',
    //     formatOnSave: true,
    //   },
    // ],
    // 'import/no-dynamic-require': 'off', // if using dynamic imports via `require`
    // 'import/no-unresolved': 'off',
  },
  env: {
    browser: true,
    es2024: true,
  },
};
