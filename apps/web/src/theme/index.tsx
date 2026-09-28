import { createTheme } from '@mui/material/styles';

import { GENERAL_Z_INDEX } from '@/constants/layout';

import { colorVariables as colorVar } from './colorVariables';
import { poppins, textHierarchy, TextSize, textStyle, TextWeight } from './util';

// Create a theme instance.
export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: 'none',
          fontFamily: poppins.style.fontFamily,
          fontWeight: 'var(--weight-M)',
          textTransform: 'none',
        },
      },
    },
    MuiDivider: { styleOverrides: { root: { borderColor: 'var(--neutral-3)' } } },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '& .MuiTouchRipple-child': { borderRadius: '8px !important' },
          borderRadius: '8px',
        },
      },
    },
    MuiInputBase: { styleOverrides: { root: { fontFamily: poppins.style.fontFamily } } },
    MuiPopover: { styleOverrides: { root: { zIndex: `${GENERAL_Z_INDEX.POPOVER} !important` } } },
    MuiPopper: { styleOverrides: { root: { zIndex: `${GENERAL_Z_INDEX.POPOVER} !important` } } },
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
  typography: { fontFamily: poppins.style.fontFamily }, // This changes all MUI components
});
