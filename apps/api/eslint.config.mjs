import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

const eslintConfig = [
  ...tseslint.configs.recommended,
  perfectionist.configs['recommended-natural'],
  prettierRecommended,
  {
    rules: {
      'no-console': 'warn',
      'perfectionist/sort-imports': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
          ignoreCase: true,
          newlinesBetween: 1,
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'prettier/prettier': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // Route handler order in a controller can be meaningful (e.g. more
    // specific routes must be declared before catch-all ones) and must
    // not be alphabetically reshuffled.
    files: ['**/*.controller.ts'],
    rules: {
      'perfectionist/sort-classes': 'off',
    },
  },
];

export default eslintConfig;
