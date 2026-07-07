module.exports = {
  root: true,
  ignorePatterns: ['dist/**'],
  env: {
    node: true,
    es2022: true,
    jest: true,
  },
  extends: ['google', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'script',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
      },
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'error',
      },
    },
    {
      files: ['**/*.d.ts'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  rules: {
    // Keep Google style as baseline while allowing common Node patterns.
    'new-cap': ['error', { capIsNewExceptions: ['Router'] }],
    'no-unused-vars': 'error',
    'require-jsdoc': 'off',
  },
};
