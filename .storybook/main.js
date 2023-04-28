export default {
  stories: ['../apps/web/stories/**/*.stories.tsx'],
  addons: [
    'storybook-code-panel/register',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};
