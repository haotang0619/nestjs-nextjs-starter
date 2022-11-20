import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ThemeProvider } from '@mui/material';
import { DefaultSeo } from 'next-seo';
import { QueryClient, QueryClientProvider } from 'react-query';

import { defaultOnError } from '@/query/client';
import { theme } from '@/theme';

const ErrorBoundary = dynamic(import('@/components/_app/ErrorBoundary'));
const Layout = dynamic(() => import('@/components/_app/Layout'));
const ProgressBar = dynamic(import('@/components/_app/ProgressBar'));
const ToastContainer = dynamic(import('@/components/_app/ToastContainer'));
const GlobalCSS = dynamic(import('@/theme/GlobalCSS'));

export default function App({ Component, pageProps }: AppProps) {
  // [IMPORTANT]: https://github.com/TanStack/query/discussions/4920
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: { mutations: { onError: defaultOnError } } }),
  );
  const router = useRouter();
  const routerPath = router.asPath?.split(/[?#]/)?.[0] || '';

  useEffect(() => {
    document.getElementsByTagName('main')?.[0]?.scrollTo({ top: 0 });
  }, [routerPath]);

  return (
    <ErrorBoundary>
      <DefaultSeo
        defaultTitle="NextJS Starter"
        themeColor={theme.palette.primary.main}
        titleTemplate="%s | NextJS Starter"
      />

      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalCSS />
          <ProgressBar />

          <Layout>
            <Component {...pageProps} />
          </Layout>

          <ToastContainer />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
