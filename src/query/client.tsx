import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const defaultOnError = (error: any) => {
  const e = error as AxiosError<any>;
  const message =
    e?.response?.data?.message || e?.message || 'Something went wrong, please try again later.';
  toast.error(Array.isArray(message) ? message[0] : message);
  return Array.isArray(message) ? message[0] : message;
};
