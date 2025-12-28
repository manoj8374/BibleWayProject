import api from '../../AxiosClient';
import { GET_ALL_STICKERS } from '../../constants/ApiUrls';
import type { ApiError } from '../../constants/Error';

export interface Sticker {
  sticker_id: string;
  image_url: string;
  filename: string;
  created_at: string;
}

export interface GetStickersResponse {
  success: boolean;
  message?: string;
  data?: Sticker[];
  error?: string;
  error_code?: string;
}

export const stickerService = {
  getAllStickers: async (): Promise<GetStickersResponse> => {
    try {
      const response = await api.get<GetStickersResponse>(GET_ALL_STICKERS, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: unknown) {
      const err = error as ApiError;
      return {
        success: false,
        error: err?.message || 'Failed to retrieve stickers',
        error_code: err?.error_code || 'INTERNAL_ERROR',
      };
    }
  },
};

