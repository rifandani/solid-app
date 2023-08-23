module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: [
    '@typescript-eslint',
    'solid',
    'jsx-a11y',
    '@tanstack/query',
    'testing-library',
    'jest-dom',
  ],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
    'eslint:recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:solid/typescript',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:jest-dom/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:testing-library/react',
  ],
  rules: {
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-void': 'off',
    'no-nested-ternary': 'off',
    'testing-library/no-node-access': ['error', { allowContainerFirstChild: true }],
    '@tanstack/query/exhaustive-deps': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'warn',
  },
  settings: {
    tailwindcss: {
      callees: ['classnames', 'clsx', 'ctl', 'tw', 'twMerge', 'twJoin'],
      config: 'tailwind.config.ts',
      // classRegex: '^class(Name)?$', // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
    },
  },
};
