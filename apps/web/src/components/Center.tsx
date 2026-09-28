import { forwardRef } from 'react';

import { Box, BoxProps } from '@mui/material';

import { mergeSx } from '@/theme/util';

const Center = forwardRef<HTMLDivElement, BoxProps>(function Block({ sx, ...props }, ref) {
  return (
    <Box
      ref={ref}
      sx={mergeSx({ alignItems: 'center', display: 'flex', justifyContent: 'center' }, sx)}
      {...props}
    />
  );
});

export default Center;
