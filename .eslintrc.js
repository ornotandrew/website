module.exports = {
  extends: ['plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'avoid',
        semi: false,
        singleQuote: true,
      },
    ],
  },
}
