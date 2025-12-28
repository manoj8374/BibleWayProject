import { toast, type ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
  position: 'bottom-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export const showSuccess = (message: string) => {
  toast.success(message, defaultOptions);
};

export const showError = (message: string) => {
  toast.error(message, defaultOptions);
};
