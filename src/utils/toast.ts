import { toast, type ToastOptions } from 'react-toastify';

// Function to get toast position based on screen width
const getToastPosition = (): ToastOptions['position'] => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 1024 ? 'top-right' : 'bottom-right';
  }
  return 'bottom-right';
};

const getDefaultOptions = (): ToastOptions => ({
  position: getToastPosition(),
  autoClose: 5173,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
});

export const showSuccess = (message: string) => {
  toast.success(message, getDefaultOptions());
};

export const showError = (message: string) => {
  toast.error(message, getDefaultOptions());
};
