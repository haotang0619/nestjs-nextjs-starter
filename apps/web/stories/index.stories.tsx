import { Test } from './index.example';
import storybookCodePanel from './storybookCodePanel';

export default {
  title: 'Components/Test',
  component: Test,
  parameters: {
    storybookCodePanel: storybookCodePanel('index'),
  },
};

export const Main = { args: { children: 'Hello world!' } };
