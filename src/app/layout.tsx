import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { ReactNode } from 'react';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';

import Providers from '@/components/Providers';
import { theme } from '@/theme';
import { colorVariables } from '@/theme/colorVariables';
import { fontVariables } from '@/theme/fontVariables';
import { spacingVariables } from '@/theme/spacingVariables';

import './globals.css';

const rootCssVariables = { ...colorVariables, ...fontVariables, ...spacingVariables };
const rootStyle = Object.entries(rootCssVariables)
  .map(([key, value]) => `${key}:${value}`)
  .join(';');

export const metadata: Metadata = {
  description: 'NextJS Starter',
  title: { default: 'NextJS Starter', template: '%s | NextJS Starter' },
};

export const viewport: Viewport = {
  themeColor: theme.palette.primary.main,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `:root{${rootStyle};--100vh:100vh;--vh:1vh}` }} />
      </head>

      <body>
        {/* Polyfill of Object.hasOwn */}
        <Script id="has-own-polyfill" strategy="beforeInteractive">
          {`"function"!=typeof Object.hasOwn&&(Object.hasOwn=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)});`}
        </Script>

        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
