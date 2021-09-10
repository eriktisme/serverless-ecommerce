module.exports = {
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  extends: ['plugin:prettier/recommended', 'eslint:recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: [
    '**/node_modules/**',
    '**/ts.out/**',
    '**/cdk.out/**',
    '**/coverage/**',
  ],
  rules: {
    'prettier/prettier': 'error',
  },
}
