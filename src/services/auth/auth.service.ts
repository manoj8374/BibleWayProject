import { LOGIN, SIGNUP, GOOGLE_SIGNUP, VERIFY_EMAIL, RESEND_VERIFICATION_EMAIL, LOGOUT, FORGOT_PASSWORD, VERIFY_RESET_PASSWORD_OTP } from '../../constants/ApiUrls';
import api from '../../AxiosClient';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../config/firebase';
import type { ApiError } from '../../constants/Error';
import i18n from '../../i18n/config';

export interface UserSignupData {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
  country?: string;
  age?: number;
  preferred_language?: string;
  profile_picture_url?: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  access_token?: string;
  refresh_token?: string;
  error?: string;
  error_code?: string;
}

export interface GoogleIdResponse {
  success: boolean;
  message: string;
  token?: string;
  error_code?: string;
}

export const authService = {
  signup: async (userData: UserSignupData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(SIGNUP, userData);
      const data = response.data;
      if (data.success && data.access_token) {
        localStorage.setItem('access_token', data.access_token);
      }
      return data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.auth.unexpectedError'),
        error_code: err?.error_code
      };
    }
  },

  login: async (credentials: UserLoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(LOGIN, credentials);
      if (response.data.success && response.data.access_token) {
        localStorage.setItem('access_token', response.data.access_token);
      }

      return {
        success: true,
        message: response.data.message,
      }
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.auth.unexpectedError'),
        error_code: err?.error_code
      };
    }
  },

  getGoogleToken: async (): Promise<GoogleIdResponse> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      return {
        success: true,
        token: token,
        message: i18n.t('services.auth.receivedToken')
      };
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || "An unexpected error occurred.",
        error_code: err?.error_code || "UNKNOWN_ERROR"
      };
    }
  },

  continueWithGoogle: async (token: string, data?: { country: string; age: number; preferred_language: string }): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(GOOGLE_SIGNUP, { token, ...data });

      if (response.data.success && response.data.access_token && response.data.refresh_token) {
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
      }
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || "An unexpected error occurred.",
        error_code: err?.error_code || "UNKNOWN_ERROR",
      };
    }
  },

  verifyEmail: async (email: string, otp: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(VERIFY_EMAIL, { email, otp });
      const data = response.data;
      if (data.success && data.access_token && data.refresh_token) {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
      }
      return data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || "An unexpected error occurred.",
        error_code: err?.error_code
      };
    }
  },

  resendVerificationEmail: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(RESEND_VERIFICATION_EMAIL, { email });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || "An unexpected error occurred.",
        error_code: err?.error_code
      };
    }
  },

  logout: async (): Promise<void> => {
    try {
      // Call logout endpoint - token is automatically added by AxiosClient interceptor
      await api.post(LOGOUT);
    } catch (error: unknown) {
      // Even if API call fails, remove tokens locally
      console.error('Logout API call failed:', error);
    } finally {
      // Always remove tokens from storage regardless of API response
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  },

  forgotPassword: async (email: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(FORGOT_PASSWORD, { email });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.auth.unexpectedError'),
        error_code: err?.error_code
      };
    }
  },

  verifyResetPasswordOTP: async (email: string, otp: string, newPassword: string, confirmPassword: string): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>(VERIFY_RESET_PASSWORD_OTP, {
        email,
        otp,
        new_password: newPassword,
        confirm_password: confirmPassword
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        message: err?.message || i18n.t('services.auth.unexpectedError'),
        error_code: err?.error_code
      };
    }
  }
};
