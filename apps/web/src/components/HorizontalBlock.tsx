import { forwardRef } from 'react';

import { Box, BoxProps } from '@mui/material';

import { mergeSx } from '@/theme/util';

export type HorizontalBlockProps = BoxProps;

export const HorizontalBlock = forwardRef<HTMLDivElement, BoxProps>(function HBlock(props, ref) {
  const { children = <></>, sx = {}, ...otherProps } = props;

  return (
    <Box
      ref={ref}
      sx={mergeSx({ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }, sx)}
      {...otherProps}
    >
      {children}
    </Box>
  );
});
