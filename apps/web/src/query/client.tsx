import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export const defaultErrorMessage = (error: any) => {
  const e = error as AxiosError<any>;
  const message =
    e?.response?.data?.message || e?.message || 'Something went wrong, please try again later.';
  return Array.isArray(message) ? message[0] : message;
};

export const defaultOnError = (error: any) => {
  const errorMessage = defaultErrorMessage(error);
  toast.error(errorMessage);
  return errorMessage;
};
