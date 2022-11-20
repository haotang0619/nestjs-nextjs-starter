import { TextHierarchy } from './util';

declare module '@mui/material/Typography' {
  interface TypographyClasses extends TextHierarchy {}

  interface TypographyPropsVariantOverrides extends TextHierarchy {}
}

declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    selectedBackground?: string;
  }

  interface TypeText {
    background?: string;
    border?: string;
    divider?: string;
  }
}
