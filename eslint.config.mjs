import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

const eslintConfig = [
  ...nextCoreWebVitals,
  perfectionist.configs['recommended-natural'],
  prettierRecommended,
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'no-console': 'warn',
      'perfectionist/sort-imports': [
        'error',
        {
          customGroups: [
            { elementNamePattern: ['^next$', '^next/.+', '^react$'], groupName: 'react' },
          ],
          groups: ['builtin', 'react', 'external', 'internal', 'parent', 'sibling'],
          ignoreCase: true,
          newlinesBetween: 1,
          order: 'asc',
          type: 'alphabetical',
        },
      ],
      'prettier/prettier': 'error',
      'react-hooks/exhaustive-deps': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];

export default eslintConfig;
