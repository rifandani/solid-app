module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['@typescript-eslint', 'solid', '@tanstack/query', 'testing-library', 'jest-dom'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:solid/typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:jest-dom/recommended',
  ],
  rules: {
    'import/no-cycle': 'off',
    'no-void': 'off',
    'no-nested-ternary': 'off',
    'testing-library/no-node-access': ['error', { allowContainerFirstChild: true }],
    '@tanstack/query/exhaustive-deps': 'off',
  },
};
