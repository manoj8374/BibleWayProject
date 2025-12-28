import api from '../../AxiosClient';
import type { ApiError } from '../../constants/Error';
import { TEXT_TO_SPEECH } from '../../constants/ApiUrls';
import type { AxiosError } from 'axios';

export interface TextToSpeechRequest {
  text: string;
  language: string;
}

export interface TextToSpeechResponse {
  success: boolean;
  audio: string; // base64 encoded audio data
  total_duration: number;
  message?: string;
  error?: string;
  error_code?: string;
}

export const textToSpeechService = {
  generateSpeech: async (
    request: TextToSpeechRequest
  ): Promise<TextToSpeechResponse> => {
    try {
      const response = await api.post<TextToSpeechResponse>(
        TEXT_TO_SPEECH,
        {
          text: request.text,
          language: request.language,
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError<TextToSpeechResponse>;
      if (axiosError.response && axiosError.response.data) {
        return axiosError.response.data;
      }

      const err = error as ApiError;
      return {
        success: false,
        audio: '',
        total_duration: 0,
        message: err?.message || 'Failed to generate speech.',
        error: err?.message || 'Failed to generate speech.',
        error_code: err?.error_code,
      };
    }
  },
};

