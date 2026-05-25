import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier';
import reactPlugin from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig } from 'eslint/config';
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function gitignorePaths() {
  const content = readFileSync(path.resolve(__dirname, '.gitignore'), 'utf8');
  return content
    .split('\n')
    .filter((line) => line.trim() && !line.startsWith('#'))
    .map((pattern) => pattern.trim());
}

export default defineConfig([
  { ignores: gitignorePaths() },
  ...nextVitals,
  ...nextTs,
  {
    name: 'test',
    plugins: {
      prettier: prettier,
      'unused-imports': unusedImports,
      react: reactPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      'prettier/prettier': [
        'error',
        {},
        { fileInfoOptions: { withNodeModules: false } },
      ],

      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
      'jsx-quotes': ['error', 'prefer-single'],
      indent: 'off',

      'react/prop-types': 'off',

      'react/jsx-uses-react': 'warn',
      'react/jsx-uses-vars': 'warn',
      'react/no-danger-with-children': 'warn',
      'react/no-deprecated': 'warn',
      'react/no-direct-mutation-state': 'warn',
      'react/no-is-mounted': 'warn',
      'react/no-typos': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/require-render-return': 'error',
      'react/style-prop-object': 'warn',
      'react/display-name': 'off',

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    settings: {
      react: { version: '19' },
    },
  },
]);

// export default defineConfig(
//   { ignores: gitignorePaths() },
//
//   reactPlugin.configs.flat.recommended,
//   prettier.configs.recommended,
//   ...nextVitals,
//   ...nextTs,
//   {
//     files: ['**/*.{js,mjs,cjs,ts,tsx}'],
//
//     rules: {
//       ...prettierConfig.rules,
//
//       'prettier/prettier': [
//         'error',
//         {},
//         { fileInfoOptions: { withNodeModules: false } },
//       ],
//
//       'linebreak-style': ['error', 'unix'],
//       quotes: ['error', 'single', { avoidEscape: true }],
//       semi: ['error', 'always'],
//       'jsx-quotes': ['error', 'prefer-single'],
//       indent: 'off',
//
//       'react/prop-types': 'off',
//
//       'react/jsx-uses-react': 'warn',
//       'react/jsx-uses-vars': 'warn',
//       'react/no-danger-with-children': 'warn',
//       'react/no-deprecated': 'warn',
//       'react/no-direct-mutation-state': 'warn',
//       'react/no-is-mounted': 'warn',
//       'react/no-typos': 'error',
//       'react/react-in-jsx-scope': 'off',
//       'react/require-render-return': 'error',
//       'react/style-prop-object': 'warn',
//       'react/display-name': 'off',
//
//       'no-unused-vars': 'off',
//       '@typescript-eslint/no-unused-vars': 'off',
//
//       'unused-imports/no-unused-imports': 'error',
//       'unused-imports/no-unused-vars': [
//         'warn',
//         {
//           vars: 'all',
//           varsIgnorePattern: '^_',
//           args: 'after-used',
//           argsIgnorePattern: '^_',
//         },
//       ],
//
//       '@typescript-eslint/ban-ts-comment': 'off',
//       '@typescript-eslint/no-explicit-any': 'off',
//       '@typescript-eslint/no-unused-expressions': 'off',
//     },
//   },
// );
