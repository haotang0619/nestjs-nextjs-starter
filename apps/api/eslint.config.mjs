import node from '@hao_tang/eslint-config/node';

const eslintConfig = [
  ...node,
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
