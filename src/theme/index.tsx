import { createTheme } from '@mui/material/styles';

import { colorVariables as colorVar } from './colorVariables';
import { TextSize, TextWeight, textHierarchy, textStyle } from './util';

// Create a theme instance.
export const theme = createTheme({
  components: {
    MuiDivider: { styleOverrides: { root: { borderColor: 'var(--neutral-3)' } } },
    MuiTypography: {
      defaultProps: {
        variantMapping: textHierarchy.reduce((acc, key) => ({ ...acc, [key]: 'p' }), {}),
      },
      styleOverrides: {
        gutterBottom: { marginBottom: '16px' },
        root: { color: 'var(--neutral-10)' },
        ...textHierarchy.reduce((acc, key) => {
          const size = Number(key.slice(1, 3)) as TextSize;
          const weight = key[3] as TextWeight;
          return { ...acc, [key]: textStyle(size, weight) };
        }, {}),
      },
    },
  },
  palette: {
    primary: {
      contrastText: colorVar['--neutral-1'],
      dark: colorVar['--primary-7'],
      light: colorVar['--primary-5'],
      main: colorVar['--primary-6'],
      selectedBackground: colorVar['--primary-1'],
    },
    secondary: {
      contrastText: colorVar['--neutral-1'],
      dark: colorVar['--secondary-7'],
      light: colorVar['--secondary-5'],
      main: colorVar['--secondary-6'],
      selectedBackground: colorVar['--secondary-1'],
    },
    text: {
      background: colorVar['--neutral-1'],
      border: colorVar['--neutral-3'],
      disabled: colorVar['--neutral-5'],
      divider: colorVar['--neutral-3'],
      primary: colorVar['--neutral-10'],
      secondary: colorVar['--neutral-6'],
    },
  },
  typography: { fontFamily: 'Poppins' }, // This changes all MUI components
});
