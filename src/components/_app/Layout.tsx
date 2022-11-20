import { ReactNode } from 'react';

import { Box } from '@mui/material';

import Footer from '../Footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexFlow: 'column', height: 'var(--100vh)' }}>
      <Box
        className="show-scrollbar"
        component="main"
        sx={{
          '& > *': { flexShrink: 0, width: '100%' },
          display: 'flex',
          flexFlow: 'column',
          flexGrow: 1,
          flexShrink: 0,
          height: '100%',
          maxWidth: '100vw',
          overflow: 'auto',
          position: 'relative',
          transition: 'padding 0.25s',
        }}
      >
        {children}
        {/* To fill in the blanks before the footer. */}
        <Box sx={{ flexGrow: 1 }} />
        <Footer />
      </Box>
    </Box>
  );
}
