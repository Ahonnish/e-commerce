module.exports = {
  root: true,
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
  rules: {
    // Keep Google style as baseline while allowing common Node patterns.
    'new-cap': ['error', {capIsNewExceptions: ['Router']}],
    'no-unused-vars': 'error',
    'require-jsdoc': 'off',
  },
};
