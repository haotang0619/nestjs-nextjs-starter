import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CssBaseline, GlobalStyles } from '@mui/material';

import { colorVariables } from './colorVariables';
import { fontVariables } from './fontVariables';
import { spacingVariables } from './spacingVariables';
import { hideScrollbar } from './util';

export default function GlobalCSS() {
  const router = useRouter();
  const [isRouteChange, setIsRouteChange] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = (url: string, { shallow }: { shallow: boolean }) => {
      setIsRouteChange(!shallow);
    };
    const handleRouteChangeEnd = () => setIsRouteChange(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeEnd);
    router.events.on('routeChangeError', handleRouteChangeEnd);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeEnd);
      router.events.off('routeChangeError', handleRouteChangeEnd);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      // For mobile browsers:
      // First we get the viewport height:
      const vph = document.documentElement.clientHeight;
      // And we multiple it by 1% to get a value for a vh unit:
      const vh = vph * 0.01;
      // Then we set the value in the --vh custom property to the root of the document:
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--100vh', `${vph}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <CssBaseline />

      <GlobalStyles
        styles={{
          '*:focus': { outline: 'none' },
          ':root': { ...colorVariables, ...fontVariables, ...spacingVariables },
          body: { opacity: isRouteChange ? 0.5 : 1 },
          'body *:not(.show-scrollbar)': {
            ...hideScrollbar(),
            pointerEvents: isRouteChange ? 'none !important' : undefined,
          },
          'input:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0px 1000px var(--neutral-1) inset !important',
            backgroundColor: 'transparent !important',
            borderRadius: '12px !important',
          },
          'input[type="text"]': { border: 'none', borderColor: 'transparent' },
        }}
      />
    </>
  );
}
