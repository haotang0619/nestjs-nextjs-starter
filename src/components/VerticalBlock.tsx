import { forwardRef } from 'react';

import { Box, BoxProps } from '@mui/material';

import { mergeSx } from '@/theme/util';

export type VerticalBlockProps = BoxProps;

export const VerticalBlock = forwardRef<HTMLDivElement, BoxProps>(function VBlock(props, ref) {
  const { children = <></>, sx = {}, ...otherProps } = props;

  return (
    <Box ref={ref} sx={mergeSx({ display: 'flex', flexDirection: 'column' }, sx)} {...otherProps}>
      {children}
    </Box>
  );
});
