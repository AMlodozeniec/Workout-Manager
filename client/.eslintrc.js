module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'airbnb-typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
    settings: {
      'import/resolver': {
        'node': {
          'extensions': ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.ts', '.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        'js': 'never',
        'mjs': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
    'react/prop-types': 0,
    'arrow-parens': 0,
    'no-param-reassign': 0,
    'prop-types': 0,
  },
};
