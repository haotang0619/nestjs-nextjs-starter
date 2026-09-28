'use client';

import { ReactNode, useState } from 'react';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import NextTopLoader from 'nextjs-toploader';

import Layout from '@/components/Layout';
import ToastContainer from '@/components/ToastContainer';
import { useViewportHeightVar } from '@/hooks/useViewportHeightVar';
import { defaultOnError } from '@/query/client';
import { theme } from '@/theme';

export default function Providers({ children }: { children: ReactNode }) {
  // [IMPORTANT]: https://github.com/TanStack/query/discussions/4920
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { mutations: { onError: defaultOnError } } }),
  );

  useViewportHeightVar();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextTopLoader color={theme.palette.primary.main} showSpinner={false} />

        <Layout>{children}</Layout>

        <ToastContainer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
