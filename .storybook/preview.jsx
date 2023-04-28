import { RouterContext } from 'next/dist/shared/lib/router-context';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
    nextRouter: { Provider: RouterContext.Provider },
    storybookCodePanel: { allowedExtensions: ['tsx'] },
  },
};

export default preview;
