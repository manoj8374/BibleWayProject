import axios from 'axios';
import { API_URL } from '../constants/baseUrl';


const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers['ngrok-skip-browser-warning'] = 'true';

  // If the data is FormData, let axios set Content-Type automatically with boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }

    const apiError = new Error(
      error.response?.data?.error ||
      error.response?.data?.data?.error ||
      error.response?.data?.message ||
      'Request failed'
    ) as any;

    apiError.status = status;
    apiError.error_code = error.response?.data?.error_code;

    return Promise.reject(apiError);
  }
);

export default api;
