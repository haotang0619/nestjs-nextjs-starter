import { MutableRefObject, useEffect } from 'react';

export function useScrollToHash(hash: string, ref: MutableRefObject<HTMLDivElement>) {
  useEffect(() => {
    if (window.location.hash === `#${hash}`) {
      ref.current?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
    }
  }, [hash, ref]);
}
