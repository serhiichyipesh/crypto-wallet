import pluginJs from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginReact from 'eslint-plugin-react';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      '@tanstack/query': pluginQuery,
      prettier: eslintPluginPrettier,
    },
    rules: {
      '@tanstack/query/exhaustive-deps': 'error',
      '@tanstack/query/no-unstable-deps': 'warn',
      '@tanstack/query/stable-query-client': 'error',
      '@tanstack/query/no-rest-destructuring': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      'react/display-name': 'off',
      'no-restricted-imports': [
        'error',
        {
          name: 'react-native',
          importNames: ['Text'],
          message: 'Please import from `@ui-kitten/components` instead.',
        },
      ],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
      'prettier/prettier': 'error',
      'no-trailing-spaces': 'error',
    },
  },
  {
    ignores: [
      'babel.config.js',
      'metro.config.js',
      'tailwind.config.js',
      '.storybook/storybook.requires.ts',
      'shared/lib/scripts/*',
      'jest.setup.js',
      'jest.config.js',
    ],
  },
  {
    files: ['app-env.d.ts'],
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
];
