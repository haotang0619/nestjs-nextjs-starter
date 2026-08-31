import { useEffect } from 'react';

// Mobile browsers change the visible viewport height as their chrome shows/hides, so `100vh`
// alone is unreliable there. This mirrors it into `--vh`/`--100vh` custom properties instead.
export function useViewportHeightVar() {
  useEffect(() => {
    const handleResize = () => {
      const vph = document.documentElement.clientHeight;
      const vh = vph * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--100vh', `${vph}px`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
}
