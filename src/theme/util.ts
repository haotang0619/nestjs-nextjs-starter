import { Poppins } from 'next/font/google';

import { SxProps, Theme } from '@mui/material/styles';
export const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const mergeSx = (...allSx: SxProps<Theme>[]): SxProps<Theme> => {
  return allSx.reduce((merged, sx) => {
    const newSx = Array.isArray(sx) ? sx : !!sx ? [sx] : [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return [...(merged as any), ...newSx];
  }, []);
};

export const textHierarchy = [
  'T28B',
  'T28S',
  'T28M',
  'T28R',

  'T24B',
  'T24S',
  'T24M',
  'T24R',

  'T20B',
  'T20S',
  'T20M',
  'T20R',

  'T18B',
  'T18S',
  'T18M',
  'T18R',

  'T16B',
  'T16S',
  'T16M',
  'T16R',

  'T14B',
  'T14S',
  'T14M',
  'T14R',

  'T12B',
  'T12S',
  'T12M',
  'T12R',

  'T10B',
  'T10S',
  'T10M',
  'T10R',
] as const;

export type TextHierarchy = Record<(typeof textHierarchy)[number], true>;

export type TextSize = 10 | 12 | 14 | 16 | 18 | 20 | 24 | 28;
const sizeMapping: Record<TextSize, { fontFamily?: string; fontSize: string; lineHeight: string }> =
  {
    10: { fontSize: '10px', lineHeight: '16px' },
    12: { fontSize: '12px', lineHeight: '20px' },
    14: { fontSize: '14px', lineHeight: '22px' },
    16: { fontSize: '16px', lineHeight: '24px' },
    18: { fontSize: '18px', lineHeight: '26px' },
    20: { fontSize: '20px', lineHeight: '28px' },
    24: { fontSize: '24px', lineHeight: '32px' },
    28: { fontSize: '28px', lineHeight: '36px' },
  };
export type TextWeight = 'B' | 'M' | 'R' | 'S';

export const textStyle = (size: TextSize, weight = 'R' as TextWeight) => ({
  fontFamily: poppins.style.fontFamily,
  fontStyle: 'normal',
  fontWeight: `var(--weight-${weight})`,
  ...sizeMapping[size],
});

export const webkitBoxOverflow = (n = 1 as number | string) => ({
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: n,
  display: '-webkit-box',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const hideScrollbar = () => ({
  '&::-webkit-scrollbar': { display: 'none' },
  /* Hide scrollbar for IE, Edge and Firefox */
  msOverflowStyle: 'none' /* IE and Edge */,
  scrollbarWidth: 'none' /* Firefox */,
});
