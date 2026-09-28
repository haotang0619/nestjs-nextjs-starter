'use client';

import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug('🚀 ~ Error ~ error ==>', error);
  }, [error]);

  return (
    <div style={{ padding: '32px', textAlign: 'center' }}>
      <h1>{error?.message?.replace(/\.$/, '') || 'Unknown error'}</h1>
    </div>
  );
}
