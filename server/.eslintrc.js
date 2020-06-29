module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest: true
  },
  plugins: ['prettier'],
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
    'plugin:security/recommended',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'node/exports-style': ['error', 'module.exports'],
    'node/file-extension-in-import': ['error', 'always'],
    'node/prefer-global/buffer': ['error', 'always'],
    'node/prefer-global/console': ['error', 'always'],
    'node/prefer-global/process': ['error', 'always'],
    'node/prefer-global/url-search-params': ['error', 'always'],
    'node/prefer-global/url': ['error', 'always'],
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',
    'comma-dangle': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-console': 0,
    'no-unused-vars': [
      1,
      { vars: 'all', args: 'none', ignoreRestSiblings: false }
    ]
  }
};
