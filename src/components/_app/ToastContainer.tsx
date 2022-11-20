import { useEffect } from 'react';

import toast, { Toaster, useToasterStore } from 'react-hot-toast';

export default function ToastContainer() {
  const { toasts } = useToasterStore();

  // Remove toasts with duplicate messages
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter(
        ({ message, type }, index) =>
          toasts.findIndex((t) => t.message === message && t.type === type) !== index,
      )
      .forEach((t) => toast.dismiss(t.id));
  }, [JSON.stringify(toasts)]);

  return <Toaster position="top-right" toastOptions={{ duration: 3000 }} />;
}
