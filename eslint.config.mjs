// eslint.config.mjs

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export default [
  {
    // Extend Airbnb's base config and the Prettier plugin
    extends: ['airbnb', 'airbnb/hooks', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    parserOptions: {
      ecmaVersion: 'latest', // Use latest ECMAScript version
      sourceType: 'module',
    },
    rules: {
      // Enforce Prettier formatting as part of ESLint
      'prettier/prettier': ['error'],

      // Disable rules that conflict with Prettier
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
      'import/prefer-default-export': 'off', // Allow named exports without default
      'no-console': 'warn', // Allow console.warn/error but warn on console.log
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'react/prop-types': 'off', // Disable prop-types enforcement if you're using TypeScript
      'jsx-a11y/anchor-is-valid': 'off', // Ignore Next.js <Link> warnings
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect the React version
      },
    },
  },
];
