import { Box, BoxProps } from '@mui/material';
import { keyframes } from '@mui/material/styles';

import { mergeSx } from '@/theme/util';

const loaderAnimation = keyframes`
    0%, 20%, 80%, 100% {
        transform: scale(0.75);
    }
    50% {
        transform: scale(1.75);
    }
`;

const positions = [
  2.5,
  11 - 8.5 / Math.sqrt(2),
  11,
  11 + 8.5 / Math.sqrt(2),
  19.5,
  11 + 8.5 / Math.sqrt(2),
  11,
  11 - 8.5 / Math.sqrt(2),
];

export type LoaderCircleProps = BoxProps;

export const LoaderCircle = (props: LoaderCircleProps) => (
  <Box
    {...props}
    sx={mergeSx(
      { display: 'inline-block', height: '24px', position: 'relative', width: '24px' },
      props.sx || {},
    )}
  >
    {Array.from({ length: 8 }).map((_, i) => {
      const j = (i + 2) % 8;

      return (
        <Box
          key={i}
          sx={{
            animation: `${loaderAnimation} 0.8s linear infinite`,
            animationDelay: `${-0.4 + 0.1 * i}s`,
            background: 'currentColor',
            borderRadius: '50%',
            height: '2.7px',
            left: `${positions[j]}px`,
            position: 'absolute',
            top: `${positions[i]}px`,
            width: '2.7px',
          }}
        />
      );
    })}
  </Box>
);
